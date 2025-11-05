import React, { useState, useContext } from "react";
import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Alterar_Styles as styles } from "./alterar_styles";
import { COLORS } from "../../../assets/colors/colors";
import { Top_Bar } from "../../../components/top_bar";
import { TextInput as PaperInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BarraProgresso from "../../../components/barra_progresso";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Alterar() {
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const navigation: any = useNavigation();
    const { logged } = useContext(AuthContext);

    async function validarCampos() {
        if (!senha.trim() || !confirmar.trim()) {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        if (senha !== confirmar) {
            Alert.alert("Atenção", "As senhas não são iguais!");
            setConfirmar("");
            return;
        }

        const senhaForte =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!senhaForte.test(senha)) {
            Alert.alert(
                "Atenção",
                "A senha deve ter no mínimo 8 caracteres e conter pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caractere especial"
            );
            return;
        }

        Alert.alert("Sucesso", "Senha redefinida com sucesso!");

        // ✅ valida login via contexto
        if (logged) {
            navigation.getParent()?.navigate("Perfil");
        } else {
            navigation.navigate("Login");
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <View style={styles.container}>
                <Top_Bar />
                <BarraProgresso etapaAtual={3} totalEtapas={3} />

                <View style={styles.box}>
                    <Text style={styles.titulo}>Nova Senha</Text>
                    <Text style={styles.subtitulo}>
                        Crie uma nova senha segura para sua conta
                    </Text>

                    <Text style={styles.label}>Senha</Text>
                    <PaperInput
                        mode="outlined"
                        value={senha}
                        onChangeText={setSenha}
                        placeholder="Digite sua nova senha"
                        secureTextEntry={!mostrarSenha}
                        activeOutlineColor={COLORS.azul_principal}
                        style={styles.input}
                        theme={{ roundness: 30 }}
                        right={
                            <PaperInput.Icon
                                icon={mostrarSenha ? "eye" : "eye-off"}
                                onPress={() => setMostrarSenha(!mostrarSenha)}
                            />
                        }
                    />

                    <Text style={styles.label}>Confirmar senha</Text>
                    <PaperInput
                        mode="outlined"
                        value={confirmar}
                        onChangeText={setConfirmar}
                        placeholder="Repita sua senha"
                        secureTextEntry={!mostrarConfirmar}
                        activeOutlineColor={COLORS.azul_principal}
                        style={styles.input}
                        theme={{ roundness: 30 }}
                        right={
                            <PaperInput.Icon
                                icon={mostrarConfirmar ? "eye" : "eye-off"}
                                onPress={() => setMostrarConfirmar(!mostrarConfirmar)}
                            />
                        }
                    />

                    <TouchableOpacity
                        style={styles.botao}
                        onPress={validarCampos}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.botao_text}>Finalizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.voltar}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.voltar_text}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
