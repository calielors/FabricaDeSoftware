import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../../src/contexts/AuthContext";
import { COLORS } from "../../src/assets/colors/colors";
import { useRouter } from "expo-router";

export default function EditarContato() {
    const { user, updateUser } = useContext(AuthContext);
    const router = useRouter();

    const [email, setEmail] = useState(user?.email || "");
    const [telefone, setTelefone] = useState("");

    async function salvar() {
        await updateUser({
            email,
            telefone,
        });

        router.back();
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.azul_principal }}>
                Editar Contato
            </Text>

            <Campo titulo="E-mail" value={email} setValue={setEmail} />
            <Campo titulo="Telefone" value={telefone} setValue={setTelefone} keyboardType="phone-pad" />

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
