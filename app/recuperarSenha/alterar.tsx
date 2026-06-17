import React, { useState, useContext, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView } from "react-native";
import { Alterar_Styles } from "../../src/styles/recuperarSenha/alterar_styles";
import { TextInput as PaperInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { supabase } from "../../src/services/supabase";
import { AuthContext } from "../../src/contexts/AuthContext";
import { useTheme } from "../../src/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";

export default function Alterar() {
  const { theme } = useTheme();
  const styles = Alterar_Styles(theme);
  const router = useRouter();
  const { logged } = useContext(AuthContext);
  
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(true);

  /* Bloqueado para testar a tela de alteração de senha sem precisar do fluxo completo de recuperação. 
   useEffect(() => { 
     const initPasswordRecovery = async () => { 
       try { 
         const initialUrl = await Linking.getInitialURL(); 

         if (!initialUrl) { 
           Alert.alert("Erro", "Link de recuperação inválido ou expirado."); 
           router.replace("/auth/login"); 
           return; 
         } 
         const url = initialUrl.includes("#") ? initialUrl.replace("#", "?") : initialUrl; 
         const parsed = Linking.parse(url); 

         const access_token = parsed.queryParams?.access_token as string; 
         const refresh_token = parsed.queryParams?.refresh_token as string; 

         if (!access_token || !refresh_token) { 
           console.error("[ERROR] Tokens missing in link", parsed.queryParams); 
           Alert.alert("Erro", "Link de recuperação inválido ou expirado."); 
           router.replace("/auth/login"); 
           return; 
         } 

         const { error } = await supabase.auth.setSession({ access_token, refresh_token }); 

         if (error) { 
           console.error("[ERROR] Failed to set session:", error); 
           Alert.alert("Erro", "Não foi possível validar o link de recuperação."); 
           router.replace("/auth/login"); 
           return; 
         } 

         setReady(true); 
       } catch (err) { 
         console.error("[ERROR] initPasswordRecovery failed:", err); 
         Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente."); 
         router.replace("/auth/login"); 
       } finally { 
         setLoading(false); 
       } 
     }; 

     void initPasswordRecovery(); 
   }, []); 
 */

  const validarCampos = async () => {
    if (!senha.trim() || !confirmar.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (senha !== confirmar) {
      Alert.alert("Atenção", "As senhas não são iguais!");
      setConfirmar("");
      return;
    }

    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!senhaForte.test(senha)) {
      Alert.alert(
        "Atenção",
        "A senha deve ter no mínimo 8 caracteres e conter pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caractere especial"
      );
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({ password: senha });

      if (error) {
        console.error("[ERROR] Failed to update password:", error);
        Alert.alert("Erro", "Não foi possível redefinir a senha. Tente novamente.");
        return;
      }

      Alert.alert("Sucesso", "Senha redefinida com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            if (logged) {
              router.replace("/home/(perfil)");
            } else {
              router.replace("/auth/login");
            }
          }
        }
      ]);
    } catch (err) {
      console.error("[ERROR] Unexpected error during password update:", err);
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.sub_data}>Verificando link de recuperação de senha...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
                <Text style={styles.titulo}>Nova Senha</Text>
                <Text style={styles.sub_data}>
                  Crie uma nova senha segura para proteger o seu acesso à plataforma.
                </Text>
              </View>

              <View style={styles.formContainer}>
                {/* Input de Senha */}
                <PaperInput
                  mode="outlined"
                  label={<Text style={{ color: theme.placeholder }}>Nova senha</Text>}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  activeOutlineColor={theme.success}
                  outlineColor={theme.placeholder + "40"}
                  textColor={theme.text}
                  style={styles.input}
                  theme={{ roundness: 10 }}
                  right={
                    <PaperInput.Icon
                      icon={mostrarSenha ? "eye" : "eye-off"}
                      onPress={() => setMostrarSenha(!mostrarSenha)}
                      color={theme.placeholder}
                    />
                  }
                />

                {/* Input de Confirmação */}
                <PaperInput
                  mode="outlined"
                  label={<Text style={{ color: theme.placeholder }}>Confirmar senha</Text>}
                  value={confirmar}
                  onChangeText={setConfirmar}
                  secureTextEntry={!mostrarConfirmar}
                  activeOutlineColor={theme.success}
                  outlineColor={theme.placeholder + "40"}
                  textColor={theme.text}
                  style={styles.input}
                  theme={{ roundness: 10 }}
                  right={
                    <PaperInput.Icon
                      icon={mostrarConfirmar ? "eye" : "eye-off"}
                      onPress={() => setMostrarConfirmar(!mostrarConfirmar)}
                      color={theme.placeholder}
                    />
                  }
                />

                {/* Botão Finalizar Sólido */}
                <TouchableOpacity
                  style={styles.botao}
                  onPress={validarCampos}
                  activeOpacity={0.7}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.botao_text}>Finalizar</Text>
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