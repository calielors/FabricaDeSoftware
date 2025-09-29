import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors/colors";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;

export const Agendamento_Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.branco,
        alignItems: 'center',
    },
    agendamento_box: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
    },
    calendario: {
        width: SCREEN_WIDTH * 0.9, 
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'tranasparent',
    },
    calendario_texto: {
        color: COLORS.azul_principal,
        fontSize: 20,
        marginBottom: 10,
    },
    horaios_box: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 2,
    },
    horarios: {
        backgroundColor: COLORS.azul_principal,
        width: '30%',  
        flexGrow: 1,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        borderColor: COLORS.placeholder_text,
        borderWidth: 0.2,
    },
    horarios_texto: {
        color: COLORS.preto,
        fontWeight: 'bold',
    },
    scroll:{
        maxHeight: 185,
        width: '90%',
    }
});
