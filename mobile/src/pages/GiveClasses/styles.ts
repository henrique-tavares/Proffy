import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 30,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 180,
    },

    description: {
        fontFamily: 'Poppins_400Regular',
        color: '#D4C2FF',
        fontSize: 16,
        lineHeight: 26,
        marginTop: 24,
        maxWidth: 240,
    },

    okButton: {
        backgroundColor: '#04D361',
        marginVertical: 40,
        height: 58,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    okButtonText: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        color: '#FFF',
    }
});

export default styles;