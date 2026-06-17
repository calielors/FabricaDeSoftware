import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Welcome_Styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", 
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },

  // Cabeçalho no Topo
  header_box: {
    marginTop: height * 0.06,
    marginBottom: 20,
  },

  titulo: {
    fontSize: 36,
    fontWeight: "800",
    color: theme.text,
    letterSpacing: -1,
    lineHeight: 40,
  },

  sub_data: {
    fontSize: 18,
    color: theme.placeholder,
    marginTop: 10,
    fontWeight: "500",
  },

  // Agrupador Inferior
  bottom_wrapper: {
    width: "100%",
    marginBottom: height * 0.03,
  },

  opcoes_container: {
    gap: 12,
  },

  // Botão "Já possui acesso"
  botao_principal: {
    width: "100%",
    minHeight: 56,
    backgroundColor: theme.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 12,
  },

  botao_principal_texto: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Botões Secundários (Google / Gov)
  botao_secundario: {
    width: "100%",
    minHeight: 56,
    backgroundColor: theme.card,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 12,
  },

  botao_secundario_texto: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "bold",
  },

  // Divisor entre as ações centrais e o rodapé de cadastro
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.placeholder + "20",
  },

  dividerText: {
    color: theme.placeholder,
    fontSize: 14,
    paddingHorizontal: 12,
    fontWeight: "600",
  },

  // Rodapé final de cadastro
  cadastro_container: {
    width: "100%",
  },

  botao_cadastro: {
    width: "100%",
    minHeight: 56,
    backgroundColor: theme.card,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  botao_cadastro_texto: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});