import React, { useState } from "react";
import { View, Text, TextInput, Button, Platform, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Login_Styles } from "./login_styles";
import { COLORS } from "../../assets/colors/colors";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Top_Bar } from "../../components/top_bar";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} 
        >
        <View style={Login_Styles.container}>
            <Top_Bar />
            <View style={Login_Styles.login_box}>
                <Text style={Login_Styles.textos}>CPF </Text>
                <TextInput style={Login_Styles.inputs} placeholder="Digite seu CPF" placeholderTextColor={COLORS.placeholder_text} />
                <Text style={Login_Styles.textos}>Senha </Text>
                <TextInput style={Login_Styles.inputs} placeholder="Digite sua senha" placeholderTextColor={COLORS.placeholder_text} />
                <TouchableOpacity style={Login_Styles.acessar} onPress={() => { /* ação do botão */ }} activeOpacity={0.7}>
                    <Text style={Login_Styles.acessar_text}>Acessar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* ação para recuperar senha */ }} activeOpacity={0.7}>
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
                    <Text style={Login_Styles.links}>Primeiro acesso? Cadastre-se aqui</Text>
                </TouchableOpacity>
            </View>
            
        </View>
        </KeyboardAvoidingView>
    );
}