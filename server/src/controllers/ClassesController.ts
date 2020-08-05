import { Request, Response } from 'express';
import convertsHoursToMinutes from "../utils/convertsHoursToMinutes";
import db from "../database/connection";

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
};

export default class ClassesController {
    async index(request: Request, response: Response) {
        const filters = request.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if (!week_day || !subject || !time) {
            return response.status(400).json({
                error: 'Missing filters to search for classes',
            });
        }

        const timeInMinutes = convertsHoursToMinutes(time);

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedules.*')
                    .from('class_schedules')
                    .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedules`.`week_day` = ??', [ Number(week_day) ])
                    .whereRaw('`class_schedules`.`from` <= ??', [ timeInMinutes ])
                    .whereRaw('`class_schedules`.`to` > ??', [ timeInMinutes ]);
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select([ 'classes.*', 'users.*' ]);

        return response.json(classes);
    }

    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const trx = await db.transaction();

        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const user_id = insertedUsersIds[ 0 ];

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });

            const class_id = insertedClassesIds[ 0 ];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertsHoursToMinutes(scheduleItem.from),
                    to: convertsHoursToMinutes(scheduleItem.to),
                    class_id,
                };
            });

            await trx('class_schedules').insert(classSchedule);

            await trx.commit();

            return response.status(201).send();

        } catch (err) {
            console.log(err);

            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating a new class',
            });
        }
    }
}