import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const Validar_Styles = (theme: any) => StyleSheet.create({
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