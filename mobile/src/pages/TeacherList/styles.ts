import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },

    teacherList: {
        marginTop: -40,
    },

    searchForm: {
        marginBottom: 24,
        marginHorizontal: -10,
    },

    label: {
        color: '#D4C2FF',
        fontFamily: 'Poppins_400Regular',
    },

    input: {
        backgroundColor: '#FFF',
        height: 54,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 4,
        marginBottom: 16,
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    inputBlock: {
        width: '48%',
    },

    time: {
        justifyContent: 'center',
        paddingHorizontal: 8,
    },

    timeText: {
        paddingHorizontal: 8,
        fontSize: 16,
    },

    submitButton: {
        backgroundColor: '#04D361',
        flexDirection: 'row',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },

    submitButtonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 16,
    }
});

export default styles;