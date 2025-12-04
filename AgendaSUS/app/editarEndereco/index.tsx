import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../../src/contexts/AuthContext";
import { COLORS } from "../../src/assets/colors/colors";
import { useRouter } from "expo-router";

export default function EditarEndereco() {
    const { user, updateUser } = useContext(AuthContext);
    const router = useRouter();

    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");

    async function salvar() {
        await updateUser({
            endereco: { rua, numero, bairro, cidade, estado, cep }
        });

        router.back();
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.azul_principal }}>
                Editar Endereço
            </Text>

            <Campo titulo="Rua" value={rua} setValue={setRua} />
            <Campo titulo="Número" value={numero} setValue={setNumero} keyboardType="numeric" />
            <Campo titulo="Bairro" value={bairro} setValue={setBairro} />
            <Campo titulo="Cidade" value={cidade} setValue={setCidade} />
            <Campo titulo="Estado" value={estado} setValue={setEstado} />
            <Campo titulo="CEP" value={cep} setValue={setCep} keyboardType="numeric" />

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
