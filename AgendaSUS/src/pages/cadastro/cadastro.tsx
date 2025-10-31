import React, { useState } from "react";
import { View, Text, Platform, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { CadastroStyles } from "./cadastro_styles";
import { COLORS } from "../../assets/colors/colors";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Top_Bar } from "../../components/top_bar";
import { useNavigation } from '@react-navigation/native';
import { TextInput as PaperInput } from 'react-native-paper';
import { formatCPF } from "../../components/format_cpf";

export default function Cadastro() {
    {/* Estados para os campos de entrada */ }
    const [username, setUsername] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    {/* Estados para visibilidade das senhas */ }
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    {/* Navegação */ }
    const navigation: any = useNavigation();

    const validarCampos = () => {
        // Todos os campos preenchidos
        if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert("Atenção", "Todos os campos devem ser preenchidos!");
            return false;
        }

        // Usuário com ao menos 5 caracteres
        if (username.trim().length < 5) {
            Alert.alert("Atenção", "O usuário deve ter pelo menos 5 caracteres!");
            return false;
        }
        //CPF com 11 dígitos numéricos
        const regexCPF = /^\d{11}$/;
        if (!regexCPF.test(cpf)) {
            Alert.alert("Atenção", "O CPF deve conter exatamente 11 dígitos numéricos!");
            return false;
        }

        // E-mail válido
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            Alert.alert("Atenção", "Digite um e-mail válido!");
            return false;
        }

        // Senhas iguais
        if (password !== confirmPassword) {
            Alert.alert("Atenção", "As senhas não são iguais!");
            setPassword("");
            setConfirmPassword("");
            return false;
        }

        // Senha forte
        const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!senhaForte.test(password)) {
            Alert.alert(
                "Atenção",
                "A senha deve ter no mínimo 8 caracteres e conter pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caractere especial"
            );
            setPassword("");
            setConfirmPassword("");
            return false;
        }
        alert("Cadastro realizado com sucesso!");
        navigation.navigate('Login');
        return true; // tudo certo
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <View style={CadastroStyles.container}>
                <Top_Bar />
                <View style={CadastroStyles.cadastro_box}>
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Usuário</Text>}
                        value={username}
                        onChangeText={(text) => setUsername(text.replace(/\s/g, ''))}
                        placeholder="Digite seu usuário"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}
                    />
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>CPF</Text>}
                        value={formatCPF(cpf)}
                        onChangeText={(text) => {
                            // remove tudo que não é dígito e limita a 11 chars
                            const onlyDigits = text.replace(/\D/g, '').slice(0, 11);
                            setCpf(onlyDigits);
                        }}
                        placeholder="Digite seu CPF"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}
                    />
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>E-mail</Text>}
                        value={email}
                        onChangeText={(text) => setEmail(text.replace(/\s/g, ''))}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}

                    />
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Senha</Text>}
                        value={password}
                        onChangeText={(text) => setPassword(text.replace(/\s/g, ''))}
                        placeholder="Digite sua senha"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
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
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Confirmação da senha</Text>}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text.replace(/\s/g, ''))}
                        placeholder="Digite confirme sua senha"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}
                        secureTextEntry={!confirmPasswordVisible}
                        right={
                            <PaperInput.Icon
                                icon={confirmPasswordVisible ? "eye" : "eye-off"}
                                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                forceTextInputFocus={false}
                                style={{ alignSelf: "center", marginRight: 0 }}
                            />
                        }
                    />
                    <TouchableOpacity style={CadastroStyles.criar} activeOpacity={0.7} onPress={validarCampos}>
                        <Text style={CadastroStyles.criar_text}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
                <View style={CadastroStyles.gov_box_container}>
                    <View style={CadastroStyles.gov_box}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} activeOpacity={0.7}>
                            <Fontisto name="world" size={18} color={COLORS.azul_principal} />
                            <Text style={{ color: COLORS.azul_principal }}>Entrar com o gov.br </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
                        <Text style={CadastroStyles.links}>Já tem uma conta? Acesse aqui!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}