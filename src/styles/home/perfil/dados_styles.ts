import { StyleSheet } from "react-native";

export const Dados_Styles = (theme: any) => StyleSheet.create({
    Text: {
        fontSize: 12,
        fontWeight: "600",
        color: theme.primary,
        marginBottom: 6
    },
    Input: {
        borderWidth: 1,
        borderColor: theme.success,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: theme.text
    },

    Dados: {
        backgroundColor: theme.card,
        padding: 12,
        borderRadius: 8
    },
    DadosText: {
        fontSize: 16,
         color: theme.text
    },
    Editar: {
        backgroundColor: theme.primary,
        padding: 16,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    Salvar: {
        flex: 1,
        backgroundColor: theme.success,
        padding: 16,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    Cancelar: {
        flex: 1,
        borderWidth: 2,
        borderColor: theme.danger,
        padding: 16,
        borderRadius: 10,
        alignItems: "center"
    },

})