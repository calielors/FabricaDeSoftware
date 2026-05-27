import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Welcome_Styles } from "../../src/styles/auth/welcome_styles";
import { FontAwesome6, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useRouter } from "expo-router";

export default function Welcome() {
  const { theme } = useTheme();
  const styles = Welcome_Styles(theme);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Sistema de Glows Ambientes Identidade do App */}
      <View style={styles.glowPrimary} />
      <View style={styles.glowSecondary} />
      <View style={styles.glowAccent} />

      <SafeAreaView style={styles.safeArea}>
        
        {/* Bloco Superior: Título */}
        <View style={styles.header_box}>
          <Text style={styles.titulo}>Comece sua{"\n"}jornada</Text>
          <Text style={styles.sub_data}>Escolha como deseja acessar a plataforma</Text>
        </View>

        {/* Bloco Inferior: Contêiner que agrupa os botões mais abaixo */}
        <View style={styles.bottom_wrapper}>
          
          {/* Container de Botões de Entrada Minimalistas */}
          <View style={styles.opcoes_container}>
            
            {/* 1. Já possui acesso */}
            <TouchableOpacity
              style={styles.botao_principal}
              activeOpacity={0.7}
              onPress={() => router.push("/auth/login")}
            >
              <FontAwesome6 name="user-large" size={16} color="#FFFFFF" />
              <Text style={styles.botao_principal_texto}>Já possui acesso</Text>
            </TouchableOpacity>

            {/* 2. Conectar com o E-mail do Google */}
            <TouchableOpacity
              style={styles.botao_secundario}
              activeOpacity={0.7}
              onPress={() => alert("Login com o Google em desenvolvimento")}
            >
              <FontAwesome6 name="google" size={16} color="#EA4335" />
              <Text style={styles.botao_secundario_texto}>Conectar com o Google</Text>
            </TouchableOpacity>

            {/* 3. Entrar com o gov.br */}
            <TouchableOpacity
              style={styles.botao_secundario}
              activeOpacity={0.7}
              onPress={() => alert("Integração com gov.br em desenvolvimento")}
            >
              <FontAwesome5 name="landmark" size={16} color={theme.primary} />
              <Text style={styles.botao_secundario_texto}>Entrar com o gov.br</Text>
            </TouchableOpacity>
          </View>

          {/* Divisor minimalista "Novo por aqui?" */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Novo por aqui?</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* 4. Criar uma nova conta */}
          <View style={styles.cadastro_container}>
            <TouchableOpacity
              style={styles.botao_cadastro}
              activeOpacity={0.7}
              onPress={() => router.push("/auth/cadastro")}
            >
              <Text style={styles.botao_cadastro_texto}>Criar uma nova conta</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}