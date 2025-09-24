import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors/colors";

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
        width: '90%',
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'tranasparent',
    },
    calendario_dias: {
        width: '100%',
        height: 30,
    },
    calendario_texto: {
        color: COLORS.azul_principal,
        fontSize: 20,
        marginBottom: 10,
    },
    horaios_box: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 2,
    },
    horarios_titulo: {
        width: '100%',
        fontSize: 16,
        marginBottom: 10,
        color: COLORS.preto,
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
    },
    horarios_texto: {
        color: COLORS.preto,
        fontWeight: 'bold',
    },
});
