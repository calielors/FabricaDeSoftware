import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { CadastroStyles } from "../../styles/cadastro_styles";
import { COLORS } from "../../assets/colors/colors";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Top_Bar } from "../../components/top_bar";
import { TextInput as PaperInput } from "react-native-paper";
import { formatCPF } from "../../components/format_cpf";
import { CadastroContext } from "../../contexts/CadastroContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Cadastro() {
    const [username, setUsername] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const { setCadastro } = useContext(CadastroContext);
    const router = useRouter();

    const validarCampos = async () => {
        try {
            if (!username.trim() || !cpf.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
                return Alert.alert("Atenção", "Todos os campos devem ser preenchidos!");
            }

            if (username.trim().length < 5) {
                return Alert.alert("Atenção", "O usuário deve ter no mínimo 5 caracteres!");
            }

            const regexCPF = /^\d{11}$/;
            if (!regexCPF.test(cpf)) {
                return Alert.alert("Atenção", "O CPF deve conter exatamente 11 dígitos numéricos!");
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                return Alert.alert("Atenção", "Digite um e-mail válido!");
            }

            if (password !== confirmPassword) {
                setPassword("");
                setConfirmPassword("");
                return Alert.alert("Atenção", "As senhas não são iguais!");
            }

            const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!senhaForte.test(password)) {
                setPassword("");
                setConfirmPassword("");
                return Alert.alert(
                    "Atenção",
                    "A senha deve ter no mínimo 8 caracteres e conter pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caractere especial"
                );
            }

            setCadastro({ username, cpf, email, password });

            router.push("/auth/validacao");
        } catch (err) {
            console.error("Erro inesperado no cadastro:", err);
            Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={CadastroStyles.container}>
                <Top_Bar />
                <View style={CadastroStyles.cadastro_box}>

                    {/* Usuário */}
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Usuário</Text>}
                        value={username}
                        onChangeText={(text) => setUsername(text.replace(/\s/g, ""))}
                        placeholder="Digite seu usuário"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}
                    />

                    {/* CPF */}
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>CPF</Text>}
                        value={formatCPF(cpf)}
                        onChangeText={(text) => setCpf(text.replace(/\D/g, "").slice(0, 11))}
                        placeholder="Digite seu CPF"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}
                    />

                    {/* Email */}
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>E-mail</Text>}
                        value={email}
                        onChangeText={(text) => setEmail(text.replace(/\s/g, ""))}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}
                        keyboardType="email-address"
                    />

                    {/* Senha */}
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Senha</Text>}
                        value={password}
                        onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                        placeholder="Digite sua senha"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}
                        secureTextEntry={!passwordVisible}
                        autoCapitalize="none"
                        autoCorrect={false}
                        right={<PaperInput.Icon icon={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                    />

                    {/* Confirmar senha */}
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>Confirmação da senha</Text>}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text.replace(/\s/g, ""))}
                        placeholder="Digite confirme sua senha"
                        placeholderTextColor={COLORS.placeholder_text}
                        activeOutlineColor={COLORS.azul_principal}
                        style={CadastroStyles.inputs}
                        theme={{ roundness: 30 }}
                        secureTextEntry={!confirmPasswordVisible}
                        autoCapitalize="none"
                        autoCorrect={false}
                        right={<PaperInput.Icon icon={confirmPasswordVisible ? "eye" : "eye-off"} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />}
                    />

                    <TouchableOpacity style={CadastroStyles.criar} activeOpacity={0.7} onPress={validarCampos}>
                        <Text style={CadastroStyles.criar_text}>Criar conta</Text>
                    </TouchableOpacity>
                </View>

                <View style={CadastroStyles.gov_box_container}>
                    <View style={CadastroStyles.gov_box}>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 10 }} activeOpacity={0.7} onPress={() => Alert.alert("Work in progress!")}>
                            <Fontisto name="world" size={18} color={COLORS.azul_principal} />
                            <Text style={{ color: COLORS.azul_principal }}>Entrar com o gov.br </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                        <Text style={CadastroStyles.links}>Já tem uma conta? Acesse aqui!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}