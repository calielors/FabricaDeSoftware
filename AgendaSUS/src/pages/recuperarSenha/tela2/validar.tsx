import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Validar_Styles } from "./validar_styles";
import { COLORS } from "../../../assets/colors/colors";
import { Top_Bar } from "../../../components/top_bar";
import { TextInput as PaperInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BarraProgresso from "../../../components/barra_progresso";

export default function Validar() {
  const [codigo, setCodigo] = useState("");
  const navigation: any = useNavigation();

  function handleProximo() {
    if (codigo.length !== 6) {
      Alert.alert("Atenção", "O código deve ter 6 dígitos.");
      return;
    }
    navigation.navigate("Alterar");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={Validar_Styles.container}>
        <Top_Bar />
        <BarraProgresso etapaAtual={2} totalEtapas={3} />

        <View style={Validar_Styles.box}>
          <Text style={Validar_Styles.titulo}>Verificação</Text>
          <Text style={Validar_Styles.subtitulo}>
            Insira o código de 6 dígitos enviado ao seu e-mail
          </Text>

          <Text style={Validar_Styles.label}>Código</Text>
          <PaperInput
            mode="outlined"
            value={codigo}
            onChangeText={(text) => setCodigo(text.replace(/\D/g, "").slice(0, 6))}
            placeholder="Digite o código"
            keyboardType="numeric"
            activeOutlineColor={COLORS.azul_principal}
            style={Validar_Styles.input}
            theme={{ roundness: 30 }}
          />

          <TouchableOpacity
            style={Validar_Styles.botao}
            onPress={handleProximo}
            activeOpacity={0.7}
          >
            <Text style={Validar_Styles.botao_text}>Próximo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Validar_Styles.voltar}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={Validar_Styles.voltar_text}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
