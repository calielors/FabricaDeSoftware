import { StyleSheet, Dimensions, Platform } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const Validacao_Styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    justifyContent: "space-between",
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
    marginVertical: 20,
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
    color: theme.text,
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
    backgroundColor: theme.card, // Removido aquele cinza fixo antigo, agora usa o theme.card limpo igual aos outros
    height: 56,
    fontSize: 16,
  },
  botao: {
    width: "100%",
    height: 54,
    backgroundColor: theme.primary,
    borderRadius: 10, // Arredondamento padrão da sua Home
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  botao_text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Container de rodapé para os links de suporte
  footerContainer: {
    width: "100%",
    alignItems: "center",
    gap: 16,
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
    marginTop: "auto",
  },
  linkButton: {
    paddingVertical: 4,
  },
  linkText: {
    color: theme.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
});