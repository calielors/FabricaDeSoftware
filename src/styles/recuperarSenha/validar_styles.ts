import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const Validar_Styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },

  /* GLOWS AMBIENTES EM PERFEITA SINTONIA */
  glowPrimary: {
    position: "absolute",
    top: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: theme.primary,
    opacity: theme.background === COLORS.branco ? 0.07 : 0.12,
  },
  glowSecondary: {
    position: "absolute",
    top: height * 0.25,
    left: -width * 0.3,
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: theme.success,
    opacity: theme.background === COLORS.branco ? 0.04 : 0.06,
  },
  glowAccent: {
    position: "absolute",
    bottom: -height * 0.15,
    right: -width * 0.1,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: theme.primary,
    opacity: theme.background === COLORS.branco ? 0.05 : 0.09,
  },

  // Barra Superior (Voltar)
  topBar: {
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    flexDirection: 'row',
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },

  // Container Centralizado e alinhado elegantemente
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: height * 0.05, 
  },
  header_box: {
    marginBottom: 40,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -1,
  },
  sub_data: {
    fontSize: 15,
    color: theme.placeholder,
    marginTop: 12,
    fontWeight: "500",
    lineHeight: 24,
  },

  // Formulário/Botões
  formContainer: {
    width: "100%",
    gap: 14,
  },
  botao: {
    width: "100%",
    height: 54,
    backgroundColor: theme.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  botao_text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Rodapé (Footer Links)
  footerContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
    marginTop: "auto",
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  voltar_text: {
    color: theme.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
});