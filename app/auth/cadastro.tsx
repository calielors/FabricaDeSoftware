import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { CadastroStyles } from "../../src/styles/auth/cadastro_styles";
import { Feather } from "@expo/vector-icons";
import { TextInput as PaperInput } from "react-native-paper";
import { formatCPF, cleanCpf } from "../../src/utils/formatFunctions";
import { CadastroContext } from "../../src/contexts/CadastroContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function Cadastro() {
    const { theme } = useTheme();
    const styles = CadastroStyles(theme);
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

            const cleanCpfValue = cleanCpf(cpf);
            if (!cleanCpfValue) return;

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
                        {/* 1. Barra Superior: Botão Voltar */}
                        <View style={styles.topBar}>
                            <TouchableOpacity 
                                activeOpacity={0.7} 
                                onPress={() => router.back()}
                                style={styles.backButton}
                            >
                                <Feather name="chevron-left" size={28} color={theme.text} />
                            </TouchableOpacity>
                        </View>

                        {/* 2. Bloco Central: Cabeçalho + Todos os Inputs */}
                        <View style={styles.centerContainer}>
                            <View style={styles.header}>
                                <Text style={styles.title}>Crie sua conta</Text>
                                <Text style={styles.subtitle}>Preencha os dados abaixo</Text>
                            </View>

                            <View style={styles.formContainer}>
                                {/* Usuário */}
                                <PaperInput
                                    mode="outlined"
                                    label={<Text style={{ color: theme.placeholder }}>Usuário</Text>}
                                    value={username}
                                    onChangeText={(text) => setUsername(text.replace(/\s/g, ""))}
                                    placeholder="Escolha um nome de usuário"
                                    activeOutlineColor={theme.primary}
                                    outlineColor={theme.placeholder + "40"}
                                    style={styles.inputs}
                                    textColor={theme.text}
                                    theme={{ roundness: 16 }}
                                />

                                {/* CPF */}
                                <PaperInput
                                    mode="outlined"
                                    label={<Text style={{ color: theme.placeholder }}>CPF</Text>}
                                    value={formatCPF(cpf)}
                                    onChangeText={(text) => setCpf(text.replace(/\D/g, "").slice(0, 11))}
                                    placeholder="000.000.000-00"
                                    activeOutlineColor={theme.primary}
                                    outlineColor={theme.placeholder + "40"}
                                    style={styles.inputs}
                                    theme={{ roundness: 16 }}
                                    textColor={theme.text}
                                    keyboardType="numeric"
                                />

                                {/* Email */}
                                <PaperInput
                                    mode="outlined"
                                    label={<Text style={{ color: theme.placeholder }}>E-mail</Text>}
                                    value={email}
                                    onChangeText={(text) => setEmail(text.replace(/\s/g, "").toLowerCase())}
                                    placeholder="seu@email.com"
                                    activeOutlineColor={theme.primary}
                                    outlineColor={theme.placeholder + "40"}
                                    style={styles.inputs}
                                    theme={{ roundness: 16 }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textColor={theme.text}
                                />

                                {/* Senha */}
                                <PaperInput
                                    mode="outlined"
                                    label={<Text style={{ color: theme.placeholder }}>Senha</Text>}
                                    value={password}
                                    onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                                    placeholder="Crie uma senha forte"
                                    activeOutlineColor={theme.primary}
                                    outlineColor={theme.placeholder + "40"}
                                    style={styles.inputs}
                                    theme={{ roundness: 16 }}
                                    secureTextEntry={!passwordVisible}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    right={
                                        <PaperInput.Icon 
                                            icon={passwordVisible ? "eye" : "eye-off"} 
                                            onPress={() => setPasswordVisible(!passwordVisible)} 
                                            color={theme.placeholder}
                                        />
                                    }
                                    textColor={theme.text}
                                />

                                {/* Confirmar senha */}
                                <PaperInput
                                    mode="outlined"
                                    label={<Text style={{ color: theme.placeholder }}>Confirmação da senha</Text>}
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text.replace(/\s/g, ""))}
                                    placeholder="Repita a senha criada"
                                    activeOutlineColor={theme.primary}
                                    outlineColor={theme.placeholder + "40"}
                                    style={styles.inputs}
                                    theme={{ roundness: 16 }}
                                    secureTextEntry={!confirmPasswordVisible}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    right={
                                        <PaperInput.Icon 
                                            icon={confirmPasswordVisible ? "eye" : "eye-off"} 
                                            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
                                            color={theme.placeholder}
                                        />
                                    }
                                    textColor={theme.text}
                                />

                                {/* Botão Principal integrado logo abaixo dos inputs */}
                                <TouchableOpacity style={styles.criar} activeOpacity={0.8} onPress={validarCampos}>
                                    <Text style={styles.criar_text}>Criar conta</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* 3. Rodapé: Link para retornar ao Login */}
                        <View style={styles.footer}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace('/auth/login')}>
                                <Text style={styles.footerText}>Já tem uma conta? <Text style={styles.footerLink}>Acesse aqui</Text></Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}