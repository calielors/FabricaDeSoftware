import React, { useState, useContext } from "react";
import { View, Text, Platform, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { Login_Styles } from "./login_styles";
import { COLORS } from "../../assets/colors/colors";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Top_Bar } from "../../components/top_bar";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import { TextInput as PaperInput } from 'react-native-paper';
import { formatCPF } from "../../components/format_cpf";

export default function Login() {
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { signIn } = useContext(AuthContext);
    const navigation: any = useNavigation();

    async function handleLogin() {
        if (!cpf || !password) {
            Alert.alert("Atenção", "Preencha CPF e senha!");
            return;
        }

        const cleanCpf = cpf.replace(/\D/g, '');
        if (cleanCpf.length !== 11) {
            Alert.alert("Atenção", "CPF inválido! Deve conter 11 dígitos.");
            return;
        }

        try {
            await signIn(cleanCpf, password); // 👈 now just pass CPF
            Alert.alert("Login realizado", "Você está autenticado!");
        } catch (error: any) {
            console.error("Login failed:", error);
            Alert.alert("Login inválido", error.message || "CPF ou senha incorretos.");
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

                    {/* CPF */}
                    <Text style={Login_Styles.textos}>CPF</Text>
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>CPF</Text>}
                        value={formatCPF(cpf)}
                        onChangeText={(text) => setCpf(text.replace(/\D/g, '').slice(0, 11))}
                        placeholder="Digite seu CPF"
                        keyboardType="numeric"
                        activeOutlineColor={COLORS.azul_principal}
                        style={Login_Styles.inputs}
                        theme={{ roundness: 30 }}
                    />

                    {/* Senha */}
                    <Text style={Login_Styles.textos}>Senha</Text>
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Senha</Text>}
                        value={password}
                        onChangeText={(text) => setPassword(text.replace(/\s/g, ''))}
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

                    {/* Login Button */}
                    <TouchableOpacity style={Login_Styles.acessar} onPress={handleLogin} activeOpacity={0.7}>
                        <Text style={Login_Styles.acessar_text}>Acessar</Text>
                    </TouchableOpacity>

                    {/* Forgot password */}
                    <TouchableOpacity onPress={() => navigation.navigate('Recuperar')} activeOpacity={0.7}>
                        <Text style={Login_Styles.links}>Esqueci minha senha </Text>
                    </TouchableOpacity>
                </View>

                {/* gov.br login & navigation to register */}
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