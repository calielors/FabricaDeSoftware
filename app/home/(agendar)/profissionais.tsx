import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../../src/contexts/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";

const tiposProfissionais = [
    { id: 1, nome: "Clínico Geral" },
    { id: 2, nome: "Dentista" },
    { id: 3, nome: "Psicólogo" },
    { id: 4, nome: "Pediatra" },
    { id: 5, nome: "Ortopedista" },
    { id: 6, nome: "Ginecologista" },
    { id: 7, nome: "Cardiologista" },
    { id: 8, nome: "Nutricionista" },
];

export default function SelecionarTipo() {
    const { theme } = useTheme();
    const params = useLocalSearchParams();

    // O valor recebido é a STRING JSON da unidade
    const unidadeSelecionada = params.unidadeSelecionada;


    const handleNext = (profissional: string) => {
        // Validação: precisa ter um profissional e a unidade (que é a string JSON)
        if (!profissional) {
            alert("Por favor, selecione um tipo de profissional.");
            return;
        }
        // Se a unidadeSelecionada não for uma string (ou for null/undefined), algo deu errado na tela anterior
        if (typeof unidadeSelecionada !== 'string') {
            alert("Erro: Dados da unidade de saúde não encontrados.");
            router.back(); // Volta para a tela anterior
            return;
        }
        router.push({
            pathname: "/home/agendar",
            params: {
                tipo: profissional,
                // Repassando a STRING JSON da unidade para a próxima tela
                unidadeSelecionada: unidadeSelecionada
            }
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <View style={{ flex: 1, padding: 20 }}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: theme.primary,
                        marginBottom: 20,
                        marginTop: 10
                    }}
                >
                    Selecione o Tipo de Profissional
                </Text>

                <FlatList
                    data={tiposProfissionais}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => handleNext(item.nome)}
                                style={{
                                    padding: 15,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.placeholder
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18, color: theme.text, fontWeight: "600", paddingVertical: 6,
                                    }}
                                >
                                    {item.nome}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />

                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        backgroundColor: theme.danger,
                        padding: 12,
                        borderRadius: 6,
                        marginTop: 20,
                        alignItems: "center"
                    }}
                >
                    <Text style={{ color: theme.background, fontWeight: "bold", fontSize: 16 }}>
                        Voltar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}