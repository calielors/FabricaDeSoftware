import React, { useState, useContext } from "react";
import { View, Text, TextInput, Platform, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { Login_Styles } from "./login_styles";
import { COLORS } from "../../assets/colors/colors";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Top_Bar } from "../../components/top_bar";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import { TextInput as PaperInput } from 'react-native-paper';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation: any = useNavigation();

    async function handleLogin() {
        try {
            await signIn(username, password);
            console.log('[Login] signIn called for', username);
            Alert.alert("Login realizado", "Você está autenticado!");
        } catch (error) {
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
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Usuário</Text>}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Digite seu usuário"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={Login_Styles.inputs}
                        theme={{ roundness: 30 }}

                    />
                    <Text style={Login_Styles.textos}>Senha </Text>
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Senha</Text>}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={Login_Styles.inputs}
                        theme={{ roundness: 30 }}
                        secureTextEntry={!passwordVisible}
                        right={
                            <PaperInput.Icon
                                icon={passwordVisible ? "eye" : "eye-off"}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                forceTextInputFocus={false}
                                style={{ alignSelf: "center", marginRight: 0 }}
                            />
                        }
                    />
                    <TouchableOpacity style={Login_Styles.acessar} onPress={handleLogin} activeOpacity={0.7}>
                        <Text style={Login_Styles.acessar_text}>Acessar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { /* implementar ação de recuperação de senha */ }} activeOpacity={0.7}>
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
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={Login_Styles.links}>Primeiro acesso? Cadastre-se aqui</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}