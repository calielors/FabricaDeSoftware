import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Login_Styles } from "../../src/styles/auth/login_styles";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../src/contexts/AuthContext";
import { TextInput as PaperInput } from "react-native-paper";
import { formatCPF, cleanCpf } from "../../src/utils/formatFunctions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useRouter } from "expo-router";

export default function Login() {
  const { theme } = useTheme();
  const styles = Login_Styles(theme);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  // Função de atalho para desenvolvimento
  function testeUser() {
    setCpf("12345678900");
    setPassword("ABC123!@#ab");
  }

  async function handleLogin() {
    if (!cpf || !password) {
      Alert.alert("Atenção", "Preencha CPF e senha!");
      return;
    }

    const cleanCpfValue = cleanCpf(cpf);
    if (!cleanCpfValue) return;  

    try {
      await signIn(cleanCpfValue, password);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Erro ao entrar", error.message || "CPF ou senha incorretos.");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Sistema de Glows Ambientes Baseados nas suas Cores Reais */}
      <View style={styles.glowPrimary} />
      <View style={styles.glowSecondary} />
      <View style={styles.glowAccent} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Barra Superior */}
            <View style={styles.topBar}>
              <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Feather name="chevron-left" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>

            {/* Conteúdo Centralizado */}
            <View style={styles.centerContainer}>
              <View style={styles.header}>
                {/* Atalho escondido: activeOpacity 1 faz com que o texto não pisque ao clicar */}
                <TouchableOpacity activeOpacity={1} onPress={testeUser}>
                  <Text style={styles.title}>Bem-vindo{"\n"}de volta</Text>
                </TouchableOpacity>
                <Text style={styles.subtitle}>Faça login para acessar sua conta</Text>
              </View>

              <View style={styles.formContainer}>
                <PaperInput
                  mode="outlined"
                  label={<Text style={{ color: theme.placeholder }}>CPF</Text>}
                  value={formatCPF(cpf)}
                  onChangeText={(text) => setCpf(text.replace(/\D/g, "").slice(0, 11))}
                  placeholder="000.000.000-00"
                  keyboardType="numeric"
                  textColor={theme.text}
                  activeOutlineColor={theme.success}
                  outlineColor={theme.placeholder + "40"}
                  style={styles.input}
                  theme={{ roundness: 16 }}
                />

                <PaperInput
                  mode="outlined"
                  label={<Text style={{ color: theme.placeholder }}>Senha</Text>}
                  value={password}
                  onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                  placeholder="Digite sua senha"
                  activeOutlineColor={theme.success}
                  outlineColor={theme.placeholder + "40"}
                  style={styles.input}
                  textColor={theme.text}
                  theme={{ roundness: 16 }}
                  secureTextEntry={!passwordVisible}
                  right={
                    <PaperInput.Icon
                      icon={passwordVisible ? "eye" : "eye-off"}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      color={theme.placeholder}
                    />
                  }
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push("/recuperarSenha/recuperar")}
                  style={styles.forgotPasswordBox}
                >
                  <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Rodapé */}
            <View style={styles.footer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.replace("/auth/cadastro")}
              >
                <Text style={styles.footerText}>Ainda não tem uma conta? <Text style={styles.footerLink}>Cadastre-se</Text></Text>
                
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}