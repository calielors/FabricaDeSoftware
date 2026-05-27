import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Validacao_Styles } from "../../src/styles/auth/validacao_styles";
import { TextInput as PaperInput } from "react-native-paper";
import { CadastroContext } from "../../src/contexts/CadastroContext";
import { supabase } from "../../src/services/supabase";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Validacao() {
  const { theme } = useTheme();
  const styles = Validacao_Styles(theme);
  const [codigo, setCodigo] = useState("");
  const { cadastro, clearCadastro } = useContext(CadastroContext);
  const router = useRouter();

  if (!cadastro) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.text }}>Carregando...</Text>
      </View>
    );
  }

  const { username, cpf, email, password } = cadastro;

  function showError(message: string) {
    console.error("[Validacao] showError:", message);
    Alert.alert("Atenção", message);
  }

  async function handleProximo() {
    if (codigo.length !== 6) return showError("O código deve ter 6 dígitos.");
    if (codigo !== "123456") return showError("O código informado está incorreto. Use 123456 para teste.");

    try {
      const { data, error } = await supabase.functions.invoke("register-paciente", {
        body: { nome: username, cpf, email, senha: password },
      });

      if (error || data?.error) return showError(error?.message || data?.error || "Falha ao registrar usuário.");

      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            router.replace("/auth/login");
            clearCadastro();
          },
        },
      ]);
    } catch (err: any) {
      console.error("[Validacao] handleProximo catch error:", err);
      if (err?.message?.includes("fetch")) return showError("Falha de conexão. Verifique sua internet.");
      return showError("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      {/* Sistema de Glows Ambientes Identidade do App */}
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
            {/* Barra Superior: Botão Voltar clássico */}
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
                <Text style={styles.titulo}>Verificação</Text>
                <Text style={styles.sub_data}>
                  Insira o código de 6 dígitos enviado para o e-mail:{"\n"}
                  <Text style={{ fontWeight: "700", color: theme.text }}>{email}</Text>
                </Text>
              </View>

              <View style={styles.formContainer}>
                {/* Input de Código Padronizado (Material Design Limpo) */}
                <PaperInput
                  mode="outlined"
                  label={<Text style={{ color: theme.placeholder }}>Código de Verificação</Text>}
                  value={codigo}
                  onChangeText={(text) => setCodigo(text.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  keyboardType="numeric"
                  textColor={theme.text}
                  activeOutlineColor={theme.primary}
                  outlineColor={theme.placeholder + "40"}
                  style={styles.input}
                  theme={{ roundness: 10 }}
                />

                {/* Botão Concluir Sólido */}
                <TouchableOpacity
                  style={styles.botao}
                  onPress={handleProximo}
                  activeOpacity={0.7}
                >
                  <Text style={styles.botao_text}>Concluir</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Links de Ações Secundárias na base do Layout */}
            <View style={styles.footerContainer}>
              <TouchableOpacity 
                style={styles.linkButton} 
                activeOpacity={0.7}
                onPress={() => Alert.alert("E-mail reenviado", "Um novo código foi enviado para " + email)}
              >
                <Text style={styles.linkText}>Reenviar o e-mail</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkButton} 
                activeOpacity={0.7}
                onPress={() => router.back()}
              >
                <Text style={styles.linkText}>Alterar e-mail</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}