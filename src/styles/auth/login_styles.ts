import { StyleSheet, Platform, Dimensions } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const Login_Styles = (theme: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingBottom: 24,
  },

  /* COMPOSIÇÃO DE GLOWS AMBIENTES (BLUR BLOBS)
     Calibrado: Nem apagado demais, nem escuro demais.
  */
  glowPrimary: {
    position: "absolute",
    top: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: theme.primary,
    // Reduzido para 0.10: fica sutil, mas ainda visível no fundo branco
    opacity: theme.background === COLORS.branco ? 0.12 : 0.08, 
  },
  glowSecondary: {
    position: "absolute",
    top: height * 0.25,
    left: -width * 0.3,
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: theme.success,
    // Reduzido para 0.08: o verde fica bem discreto e limpo
    opacity: theme.background === COLORS.branco ? 0.09 : 0.05,
  },
  glowAccent: {
    position: "absolute",
    bottom: -height * 0.15,
    right: -width * 0.1,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: theme.primary,
    // Reduzido para 0.09: traz leveza para a base da tela
    opacity: theme.background === COLORS.branco ? 0.15 : 0.07,
  },
  // Barra Superior (Voltar)
  topBar: {
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    flexDirection: 'row',
  },
  backButton: {
    padding: 4,
    marginLeft: -8,
  },

  // Conteúdo Centralizado
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 16,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -1,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: theme.placeholder,
    marginTop: 8,
    fontWeight: "500",
  },

  // Formulário + Botão Principal
  formContainer: {
    width: "100%",
    gap: 16,
  },
  input: {
    width: "100%",
    backgroundColor: theme.card, // Adapta-se ao branco/cinza ou ao dark_card automaticamente
    height: 56,
    fontSize: 16,
  },
  forgotPasswordBox: {
    alignSelf: "flex-end",
    paddingVertical: 4,
    marginBottom: 4,
  },
  forgotPasswordText: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: theme.primary,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
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
  primaryButtonText: {
    color: COLORS.branco,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Rodapé
  footer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 12 : 16,
  },
  footerText: {
    color: theme.placeholder,
    fontSize: 15,
    fontWeight: "500",
  },
  footerLink: {
    color: theme.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});