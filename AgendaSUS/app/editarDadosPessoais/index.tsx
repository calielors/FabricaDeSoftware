import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../../src/contexts/AuthContext";
import { COLORS } from "../../src/assets/colors/colors";
import { useRouter } from "expo-router";

export default function EditarDadosPessoais() {
    const { user, updateUser } = useContext(AuthContext);
    const router = useRouter();

    const [nome, setNome] = useState(user?.nome || "");
    const [cpf, setCpf] = useState(user?.cpf || "");
    const [nascimento, setNascimento] = useState(user?.nascimento || "");
    const [unidade, setUnidade] = useState(user?.unidade || "");

    async function salvar() {
        await updateUser({
            nome,
            cpf,
            nascimento,
            unidade,
        });

        router.back();
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.azul_principal }}>
                Editar Dados Pessoais
            </Text>

            <Campo titulo="Nome" value={nome} setValue={setNome} />
            <Campo titulo="CPF" value={cpf} setValue={setCpf} keyboardType="numeric" />
            <Campo titulo="Nascimento (AAAA-MM-DD)" value={nascimento} setValue={setNascimento} />
            <Campo titulo="Unidade" value={unidade} setValue={setUnidade} />

            <BotaoSalvar onPress={salvar} />
        </ScrollView>
    );
}

function Campo({ titulo, value, setValue, keyboardType }: any) {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{titulo}</Text>
            <TextInput
                value={value}
                onChangeText={setValue}
                style={{
                    borderWidth: 1,
                    borderColor: COLORS.cinza_claro,
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 16,
                }}
                keyboardType={keyboardType || "default"}
            />
        </View>
    );
}

function BotaoSalvar({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: COLORS.azul_principal,
                padding: 14,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 30,
            }}
        >
            <Text style={{ color: COLORS.branco, fontSize: 18 }}>Salvar</Text>
        </TouchableOpacity>
    );
}
