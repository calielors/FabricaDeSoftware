import { StyleSheet, Platform, Dimensions } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const Login_Styles = (theme: any) => StyleSheet.create({
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
    fontSize: 18,
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
    backgroundColor: theme.card,
    minHeight: 56,
    fontSize: 18,
  },
  forgotPasswordBox: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    marginBottom: 4,
  },
  forgotPasswordText: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    width: "100%",
    minHeight: 56,
    backgroundColor: theme.primary,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
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
    fontSize: 18,
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
    fontSize: 16,
    fontWeight: "500",
  },
  footerLink: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});