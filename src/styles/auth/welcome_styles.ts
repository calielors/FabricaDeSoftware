import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("window");

export const Welcome_Styles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "space-between", // Empurra o header para o topo e o wrapper de botões para a base
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
  // Cabeçalho no Topo
  header_box: {
    marginTop: height * 0.06, // Dá uma folga elegante do entalhe/barra de status
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
    fontSize: 15,
    color: theme.placeholder,
    marginTop: 8,
    fontWeight: "500",
  },

  // Agrupador Inferior (Garante o posicionamento mais abaixo)
  bottom_wrapper: {
    width: "100%",
    marginBottom: height * 0.03, // Ajusta perfeitamente acima da navegação de gestos do sistema
  },

  opcoes_container: {
    gap: 12,
  },

  // Botão "Já possui acesso"
  botao_principal: {
    width: "100%",
    height: 54,
    backgroundColor: theme.primary,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  botao_principal_texto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Botões Secundários (Google / Gov)
  botao_secundario: {
    width: "100%",
    height: 54,
    backgroundColor: theme.card,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  botao_secundario_texto: {
    color: theme.text,
    fontSize: 15,
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
    fontSize: 13,
    paddingHorizontal: 12,
    fontWeight: "600",
  },

  // Rodapé final de cadastro
  cadastro_container: {
    width: "100%",
  },

  botao_cadastro: {
    width: "100%",
    height: 54,
    backgroundColor: theme.card,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  botao_cadastro_texto: {
    color: theme.text,
    fontSize: 15,
    fontWeight: "bold",
  },
});