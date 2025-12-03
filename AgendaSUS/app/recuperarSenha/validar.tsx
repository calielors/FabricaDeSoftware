import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Validar_Styles as style } from "../../src/styles/validar_styles";
import { Top_Bar } from "../../src/components/top_bar";
import { useRouter, useLocalSearchParams } from "expo-router";
import BarraProgresso from "../../src/components/barra_progresso";
import { supabase } from "../../src/services/supabase";

export default function Validar() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const cpf = params?.cpf as string | undefined;

  async function handleResend() {
    if (!cpf) {
      Alert.alert("Erro", "CPF não disponível para reenviar o e-mail.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-email", {
        body: { cpf, action: "reset" },
      });

      if (error) throw error;

      Alert.alert("Sucesso", "E-mail de recuperação reenviado.");
      setEmailSent(true);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível reenviar o e-mail. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
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
            Um e-mail de recuperação de senha foi enviado. Verifique sua caixa de entrada e siga o link para redefinir sua senha.
          </Text>

          <TouchableOpacity
            style={style.botao}
            onPress={handleResend}
            activeOpacity={0.7}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={style.botao_text}>
                {emailSent ? "Reenviar novamente" : "Reenviar e-mail"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={style.voltar}
            onPress={() => router.push("/recuperarSenha/recuperar")}
            activeOpacity={0.7}
          >
            <Text style={style.voltar_text}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}