import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView } from "react-native";
import { Validar_Styles } from "../../src/styles/recuperarSenha/validar_styles";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../../src/services/supabase";
import { useTheme } from "../../src/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Validar() {
  const { theme } = useTheme();
  const styles = Validar_Styles(theme);
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
    <View style={styles.container}>
      {/* Sistema de Glows Ambientes */}
      <View style={styles.glowPrimary} />
      <View style={styles.glowSecondary} />
      <View style={styles.glowAccent} />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Barra Superior: Botão Voltar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Feather name="chevron-left" size={28} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Conteúdo Central/Inferior */}
          <View style={styles.centerContainer}>
            <View style={styles.header_box}>
              <Text style={styles.titulo}>Verifique seu{"\n"}E-mail</Text>
              <Text style={styles.sub_data}>
                Um link de recuperação de senha foi enviado. Verifique sua caixa de entrada ou spam e siga as instruções para redefinir sua senha.
              </Text>
            </View>

            <View style={styles.formContainer}>
              {/* Botão Principal */}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => {
                  /* handleResend(); */
                  router.push("/recuperarSenha/alterar"); // Mantido seu fluxo de teste
                }}
                activeOpacity={0.7}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.botao_text}>
                    {emailSent ? "Reenviar novamente" : "Reenviar e-mail"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Rodapé - Link adicional para voltar */}
          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              style={styles.linkButton}
            >
              <Text style={styles.voltar_text}>Tentar outro CPF</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}