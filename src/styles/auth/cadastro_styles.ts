import { StyleSheet, Platform, Dimensions } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const CadastroStyles = (theme: any) => StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingBottom: 24,
    },
    // Barra Superior (Voltar)
    topBar: {
        marginTop: Platform.OS === 'ios' ? 10 : 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

    backButton: {
        padding: 4,
        marginLeft: -8,
    },
    
    switchWrapper: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
    },

    // Container Centralizador
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        marginVertical: 12,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 34,
        fontWeight: "800",
        color: theme.text,
        letterSpacing: -1,
        lineHeight: 38,
    },
    subtitle: {
        fontSize: 18,
        color: theme.placeholder,
        marginTop: 6,
        fontWeight: "500",
    },

    // Formulário de Inputs
    formContainer: {
        width: "100%",
        gap: 14,
    },
    inputs: {
        width: '100%',
        backgroundColor: theme.card,
        minHeight: 56,
        fontSize: 18,
    },

    // Botão criar conta
    criar: {
        width: '100%',
        minHeight: 56,
        backgroundColor: theme.primary,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 14,
        ...Platform.select({
            ios: {
                shadowColor: theme.primary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.22,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    criar_text: {
        color: COLORS.branco,
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    // Rodapé
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingBottom: Platform.OS === 'ios' ? 12 : 20,
    },
    footerText: {
        color: theme.placeholder,
        fontSize: 16,
        fontWeight: "500",
    },
    footerLink: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: "700",
    }
});