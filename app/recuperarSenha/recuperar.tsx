import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView } from "react-native";
import { Recuperar_Styles } from "../../src/styles/recuperarSenha/recuperar_styles";
import { TextInput as PaperInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { formatCPF } from "../../src/utils/formatFunctions";
import { supabase } from "../../src/services/supabase";
import { useTheme } from "../../src/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Recuperar() {
  const { theme } = useTheme();
  const styles = Recuperar_Styles(theme);
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleProximo() {
    const cleanCpf = cpf.replace(/\D/g, "");
    if (!cpf || cleanCpf.length !== 11) {
      Alert.alert("Atenção", "Digite um CPF válido com 11 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-email", {
        body: { cpf: cleanCpf, action: "reset" },
      });

      if (error) {
        console.error("Erro ao chamar função:", error);
        Alert.alert("Erro", "Não foi possível enviar o e-mail. Tente novamente mais tarde.");
      } else {
        Alert.alert(
          "Sucesso",
          "Um e-mail de recuperação foi enviado para o usuário com esse CPF, se existir.",
          [
            {
              text: "OK",
              onPress: () =>
                router.push({
                  pathname: "/recuperarSenha/validar",
                  params: { cpf: cleanCpf },
                }),
            },
          ]
        );
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
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
                <Text style={styles.titulo}>Recuperação{"\n"}de Senha</Text>
                <Text style={styles.sub_data}>
                  Digite seu CPF abaixo. Enviaremos um código de verificação para o e-mail cadastrado.
                </Text>
              </View>

              <View style={styles.formContainer}>
                {/* Input de CPF */}
                <PaperInput
                  mode="outlined"
                  label={<Text style={{ color: theme.placeholder }}>CPF</Text>}
                  value={formatCPF(cpf)}
                  onChangeText={(text) => setCpf(text.replace(/\D/g, '').slice(0, 11))}
                  placeholder="000.000.000-00"
                  keyboardType="numeric"
                  activeOutlineColor={theme.success}
                  outlineColor={theme.placeholder + "40"}
                  textColor={theme.text}
                  style={styles.input}
                  theme={{ roundness: 10 }}
                />

                {/* Botão Próximo Sólido */}
                <TouchableOpacity
                  style={styles.botao}
                  onPress={handleProximo}
                  activeOpacity={0.7}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.botao_text}>Próximo</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}