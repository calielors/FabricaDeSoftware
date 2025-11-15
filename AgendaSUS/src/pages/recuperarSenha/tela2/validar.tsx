import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Validar_Styles as style} from "./validar_styles";
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
      <View style={style.container}>
        <Top_Bar />
        <BarraProgresso etapaAtual={2} totalEtapas={3} />

        <View style={style.box}>
          <Text style={style.titulo}>Verificação</Text>
          <Text style={style.subtitulo}>
            Insira o código de 6 dígitos enviado ao seu e-mail
          </Text>

          <Text style={style.label}>Código</Text>
          <PaperInput
            mode="outlined"
            value={codigo}
            onChangeText={(text) => setCodigo(text.replace(/\D/g, "").slice(0, 6))}
            placeholder="Digite o código"
            keyboardType="numeric"
            activeOutlineColor={COLORS.azul_principal}
            style={style.input}
            theme={{ roundness: 30 }}
          />

          <TouchableOpacity
            style={style.botao}
            onPress={handleProximo}
            activeOpacity={0.7}
          >
            <Text style={style.botao_text}>Próximo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.voltar}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={style.voltar_text}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
