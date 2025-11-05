import { StyleSheet } from "react-native";
import { COLORS } from "../../../assets/colors/colors";

export const Alterar_Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.branco,
  },
  box: {
    width: "90%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cinza_claro,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.placeholder_text,
    marginTop: "auto",
    marginBottom: "auto",
    gap: 15,
    transform: [{ translateY: -70 }],
  },
  titulo: {
    color: COLORS.azul_principal,
    fontSize: 20,
    fontWeight: "900",
  },
  subtitulo: {
    fontSize: 14,
    color: COLORS.placeholder_text,
    textAlign: "center",
    marginHorizontal: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontSize: 16,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#ebeaea",
    borderRadius: 30,
    paddingLeft: 20,
  },
  botao: {
    width: "90%",
    height: 50,
    backgroundColor: COLORS.azul_principal,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  botao_text: {
    color: COLORS.branco,
    fontSize: 18,
    fontWeight: "bold",
  },
  voltar: {
    marginTop: 10,
  },
  voltar_text: {
    color: COLORS.azul_principal,
    fontWeight: "bold",
  },
});
