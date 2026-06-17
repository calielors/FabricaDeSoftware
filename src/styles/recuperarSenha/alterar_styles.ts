import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const Alterar_Styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
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