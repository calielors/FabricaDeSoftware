import React, { useState } from "react";
import {
    View,
    Text,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Recuperar_Styles } from "./recuperar_styles";
import { COLORS } from "../../../assets/colors/colors";
import { Top_Bar } from "../../../components/top_bar";
import { TextInput as PaperInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BarraProgresso from "../../../components/barra_progresso";
import { formatCPF } from "../../../components/format_cpf";
import { goBack } from "expo-router/build/global-state/routing";

export default function Recuperar() {
    const [cpf, setCpf] = useState("");
    const navigation: any = useNavigation();

    function handleProximo() {
        const cleanCpf = cpf.replace(/\D/g, "");
        if (!cpf || cleanCpf.length !== 11) {
            Alert.alert("Atenção", "Digite um CPF válido com 11 dígitos.");
            return;
        }
        navigation.navigate("Validar");
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <View style={Recuperar_Styles.container}>
                <Top_Bar />
                <BarraProgresso etapaAtual={1} totalEtapas={3} />

                <View style={Recuperar_Styles.box}>
                    <Text style={Recuperar_Styles.titulo}>Recuperação de Senha</Text>
                    <Text style={Recuperar_Styles.subtitulo}>
                        Digite seu CPF para receber um código de verificação
                    </Text>

                    <Text style={Recuperar_Styles.label}>CPF</Text>
                    <PaperInput
                        mode="outlined"
                        label={<Text style={{ color: COLORS.placeholder_text }}>CPF</Text>}
                        value={formatCPF(cpf)}
                        onChangeText={(text) => setCpf(text.replace(/\D/g, '').slice(0, 11))}
                        placeholder="Digite seu CPF"
                        keyboardType="numeric"
                        activeOutlineColor={COLORS.azul_principal}
                        style={Recuperar_Styles.input}
                        theme={{ roundness: 30 }}
                    />

                    <TouchableOpacity
                        style={Recuperar_Styles.botao}
                        onPress={handleProximo}
                        activeOpacity={0.7}
                    >
                        <Text style={Recuperar_Styles.botao_text}>Próximo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}
                    >
                        <Text style={Recuperar_Styles.link}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
