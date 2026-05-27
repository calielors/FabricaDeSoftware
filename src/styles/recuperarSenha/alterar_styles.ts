import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const Alterar_Styles = (theme: any) => StyleSheet.create({
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

  // Container Centralizado e empurrado levemente para baixo
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: height * 0.1, // Empurra suavemente para cima do teclado
  },
  header_box: {
    marginBottom: 30,
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
    marginTop: 8,
    fontWeight: "500",
    lineHeight: 22,
  },

  // Formulário
  formContainer: {
    width: "100%",
    gap: 14,
  },
  input: {
    width: "100%",
    backgroundColor: theme.card, // Segue o fundo dos serviços da Home
    height: 56,
    fontSize: 16,
  },
  botao: {
    width: "100%",
    height: 54,
    backgroundColor: theme.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  botao_text: {
    color: "#FFFFFF", // Garante contraste
    fontSize: 16,
    fontWeight: "bold",
  },
});