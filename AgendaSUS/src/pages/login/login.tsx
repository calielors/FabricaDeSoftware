import React, { useState, useContext } from "react";
import { View, Text, TextInput, Platform, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { Login_Styles } from "./login_styles";
import { COLORS } from "../../assets/colors/colors";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Top_Bar } from "../../components/top_bar";
import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useContext(AuthContext);

    // Usuário teste para desenvolvimento. Remover em produção.
    const TEST_USER = {
        username: "teste",
        password: "teste"
    };

    async function handleLogin() {
        if (username === TEST_USER.username && password === TEST_USER.password) {
            await signIn(username);
            console.log('[Login] signIn called for', username);
            Alert.alert("Login realizado", "Você está autenticado!");
        } else {
            Alert.alert("Login inválido", "Usuário ou senha incorretos.");
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <View style={Login_Styles.container}>
                <Top_Bar />
                <View style={Login_Styles.login_box}>
                    <Text style={Login_Styles.textos}>Usuário </Text>
                    <TextInput
                        style={Login_Styles.inputs}
                        placeholder="Digite seu usuário"
                        placeholderTextColor={COLORS.placeholder_text}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <Text style={Login_Styles.textos}>Senha </Text>
                    <TextInput
                        style={Login_Styles.inputs}
                        placeholder="Digite sua senha"
                        placeholderTextColor={COLORS.placeholder_text}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={Login_Styles.acessar} onPress={handleLogin} activeOpacity={0.7}>
                        <Text style={Login_Styles.acessar_text}>Acessar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { /* implementar ação de recuperação de senha futuramente */ }} activeOpacity={0.7}>
                        <Text style={Login_Styles.links}>Esqueci minha senha </Text>
                    </TouchableOpacity>
                </View>
                <View style={Login_Styles.gov_box_container}>
                    <View style={Login_Styles.gov_box}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} activeOpacity={0.7}>
                            <Fontisto name="world" size={18} color={COLORS.azul_principal} />
                            <Text style={{ color: COLORS.azul_principal }}>Entrar com o gov.br </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                        {/* implementar cadastro de usuário futuramente */}
                        <Text style={Login_Styles.links}>Primeiro acesso? Cadastre-se aqui</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}