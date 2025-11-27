import { StyleSheet } from "react-native";
import { COLORS } from "../assets/colors/colors";

export const Perfil_Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.branco
    },
    content: {
        paddingHorizontal: 10,
    },
    header: {
        marginBottom: 24
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: COLORS.preto,
        marginTop: 10,
        marginBottom: 5,
    },
    subText: {
        fontSize: 16,
        color: COLORS.placeholder_text,
        marginTop: 2
    },
    card: {
        backgroundColor: COLORS.branco,
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.placeholder_text,
    },
    cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10, color: COLORS.preto },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderColor: COLORS.verde,
    },
    menuLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    menuText: {
        fontSize: 17,
        color: COLORS.preto
    },
    sair: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.vermelho,
        padding: 11,
        borderRadius: 14,
        marginTop: 10,
        marginBottom: 20
    },
    sairText: {
        color: COLORS.branco,
        fontWeight: "600",
        fontSize: 17
    },
});
