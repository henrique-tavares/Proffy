import React, { useState } from 'react';
import { View, ScrollView, Text, Picker, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import api from '../../services/api';

function TeacherList() {

  const [ isFiltersVisible, setIsFiltersVisible ] = useState(false);
  const [ isTimePickerVisible, setIsTimePickerVisible ] = useState(false);

  const [ subject, setSubject ] = useState('');
  const [ week_day, setWeekDay ] = useState('');
  const [ time, setTime ] = useState('');

  const [ favorites, setFavorites ] = useState<number[]>([]);
  const [ teachers, setTeachers ] = useState([]);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  function handleToggleTimePickerVisible() {
    setIsTimePickerVisible(!isTimePickerVisible);
  }

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });

        setFavorites(favoritedTeachersIds)
      }
    });
  }

  function handleTimePickerConfirm(date: Date) {
    let hours = date.getHours().toString();
    hours = (Number(hours) < 10) ? `0${hours}` : hours;

    let minutes = date.getMinutes().toString();
    minutes = (Number(minutes) < 10) ? `0${minutes}` : minutes;

    setTime(`${hours}:${minutes}`);

    handleToggleTimePickerVisible();
  }

  async function handleFiltersSubmit() {
    if (!subject || !week_day || !time) {
      return;
    }

    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);

    handleToggleFiltersVisible();
  }

  return (
    <View style={ styles.container }>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton>
            <Feather
              name="filter"
              size={ 24 }
              color={ isFiltersVisible ? "#04D361" : "#FFF" }
              onPress={ handleToggleFiltersVisible }
            />
          </BorderlessButton>
        }
      >
        { isFiltersVisible && (
          <View style={ styles.searchForm }>
            <Text style={ styles.label }>Matéria</Text>
            <TouchableOpacity activeOpacity={ 1 } style={ styles.input }>
              <Picker selectedValue={ subject } onValueChange={ itemvalue => { setSubject(itemvalue) } }>
                <Picker.Item value="" label="Qual a matéria?" color="#c1bccc" />
                <Picker.Item value="Artes" label="Artes" color="#32264D" />
                <Picker.Item value="Biologia" label="Biologia" color="#32264D" />
                <Picker.Item value="Educação Física" label="Educação Física" color="#32264D" />
                <Picker.Item value="Espanhol" label="Espanhol" color="#32264D" />
                <Picker.Item value="Filosofia" label="Filosofia" color="#32264D" />
                <Picker.Item value="Física" label="Física" color="#32264D" />
                <Picker.Item value="Geografia" label="Geografia" color="#32264D" />
                <Picker.Item value="História" label="História" color="#32264D" />
                <Picker.Item value="Inglês" label="Inglês" color="#32264D" />
                <Picker.Item value="Matemática" label="Matemática" color="#32264D" />
                <Picker.Item value="Português" label="Português" color="#32264D" />
                <Picker.Item value="Química" label="Química" color="#32264D" />
                <Picker.Item value="Sociologia" label="Sociologia" color="#32264D" />
              </Picker>
            </TouchableOpacity>

            <View style={ styles.inputGroup }>
              <View style={ styles.inputBlock }>
                <Text style={ styles.label }>Dia da Semana</Text>
                <TouchableOpacity activeOpacity={ 1 } style={ styles.input }>
                  <Picker
                    selectedValue={ week_day }
                    onValueChange={ itemvalue => { setWeekDay(itemvalue) } }
                  >
                    <Picker.Item value="" label="Qual o dia?" color="#c1bccc" />
                    <Picker.Item value="0" label="Domingo" color="#32264D" />
                    <Picker.Item value="1" label="Segunda-feira" color="#32264D" />
                    <Picker.Item value="2" label="Terça-feira" color="#32264D" />
                    <Picker.Item value="3" label="Quarta-feira" color="#32264D" />
                    <Picker.Item value="4" label="Quinta-feira" color="#32264D" />
                    <Picker.Item value="5" label="Sexta-feira" color="#32264D" />
                    <Picker.Item value="6" label="Sábado" color="#32264D" />
                  </Picker>
                </TouchableOpacity>
              </View>

              <View style={ styles.inputBlock }>
                <Text style={ styles.label }>Horário</Text>
                <RectButton
                  style={ [ styles.input, styles.time ] }
                  onPress={ handleToggleTimePickerVisible }
                >
                  { time
                    ? <Text style={ [ styles.timeText, { color: "#32264D" } ] }>{ time }</Text>
                    : <Text style={ [ styles.timeText, { color: "#c1bccc" } ] }>Qual o horário?</Text>
                  }
                  { isTimePickerVisible && (
                    <DateTimePickerModal
                      isVisible={ isTimePickerVisible }
                      mode="time"
                      is24Hour={ true }
                      onConfirm={ handleTimePickerConfirm }
                      onCancel={ handleToggleTimePickerVisible }
                    />
                  ) }
                </RectButton>
              </View>
            </View>

            <RectButton style={ styles.submitButton } onPress={ handleFiltersSubmit }>
              <Text style={ styles.submitButtonText }>Buscar</Text>
            </RectButton>
          </View>
        ) }
      </PageHeader>

      <ScrollView
        style={ styles.teacherList }
        contentContainerStyle={ {
          paddingHorizontal: 16,
          paddingBottom: 16
        } }
      >
        { teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={ teacher.id }
              teacher={ teacher }
              favorited={ favorites.includes(teacher.id) }
            />
          );
        }) }
      </ScrollView>
    </View>
  );
}

export default TeacherList;