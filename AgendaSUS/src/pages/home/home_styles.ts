import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors/colors";

export const Home_Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.branco,
    },

    header_box: {
        marginTop: 10,
        // paddingHorizontal removido daqui, pois agora está no wrapper
    },

    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        color: COLORS.preto,
    },

    data: {
        fontSize: 14,
        marginTop: 2,
    },

    consulta_box: {
        backgroundColor: COLORS.cinza_claro,
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        // margem horizontal removida, pois o wrapper cuida disso
    },

    consulta_header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },

    consulta_titulo: {
        fontSize: 16,
        color: COLORS.preto,
        fontWeight: "bold",
    },

    consulta_data: {
        color: COLORS.azul_principal,
        fontWeight: "bold",
    },

    consulta_info: {
        color: COLORS.preto,
    },

    consulta_local: {
        color: COLORS.placeholder_text,
        marginBottom: 8,
    },

    consulta_status: {
        backgroundColor: COLORS.verde,
        alignSelf: "flex-start",
        paddingHorizontal: 18,
        paddingVertical: 3,
        borderRadius: 6,
    },

    consulta_status_text: {
        color: COLORS.branco,
        fontWeight: "bold",
        fontSize: 13,
    },

    servicos_titulo: {
        fontSize: 20,
        marginTop: 5,
        color: COLORS.preto,
    },

    servicos_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: 10,
        paddingBottom: 100, // espaço pro ACOES
    },

    servico_item: {
        width: "48%",
        backgroundColor: COLORS.branco,
        borderWidth: 1,
        borderColor: COLORS.placeholder_text,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        marginVertical: 4,
    },

    servico_text: {
        color: COLORS.preto,
        fontSize: 14,
        marginTop: 8,
        textAlign: "center",
    },
});
