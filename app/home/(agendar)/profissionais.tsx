import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import React from "react";
import { useTheme } from "../../../src/contexts/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { buscarProfissionaisPorUnidadeApi } from "../../../src/services/api";
import { useQuery } from "@/src/services/useQuery";
import { COLORS } from "@/src/assets/colors/colors";

export default function SelecionarTipo() {
    const { theme } = useTheme();
    const params = useLocalSearchParams();

    const unidadeOriginal = params.unidadeSelecionada as string;
    const unidadeObj = unidadeOriginal ? JSON.parse(unidadeOriginal) : null;

    const { data: profissionais, loading, refresh } = useQuery(
        () => buscarProfissionaisPorUnidadeApi(unidadeObj?.id),
        [unidadeObj?.id]
    );
    const especialidadesUnicas = profissionais 
        ? (profissionais as any[]).filter((prof: any, index: number, self: any[]) => 
            index === self.findIndex((t: any) => t.especialidade === prof.especialidade)
          )
        : [];

    const handleNext = (profissional: any) => {
        if (!unidadeOriginal) {
            alert("Erro: Dados da unidade de saúde não encontrados.");
            router.back();
            return;
        }

        router.push({
            pathname: "/home/agendar",
            params: {
                tipo: profissional.especialidade || "Consulta",
                profissionalID: profissional.id,
                unidadeSelecionada: unidadeOriginal
            }
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <FlatList
                data={especialidadesUnicas}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ flexGrow: 1, padding: 20 }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refresh}
                        colors={[theme.primary]}
                        tintColor={theme.primary}
                        progressBackgroundColor={theme.background}
                    />
                }

                ListHeaderComponent={
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: theme.primary,
                            marginBottom: 20,
                            marginTop: 10
                        }}
                    >
                        Selecione o Profissional
                    </Text>
                }

                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleNext(item)}
                        style={{
                            padding: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.placeholder
                        }}
                    >
                        <Text style={{ fontSize: 18, color: theme.text, fontWeight: "600" }}>
                            {item.especialidade}
                        </Text>
                    </TouchableOpacity>
                )}

                ListEmptyComponent={() => (
                    loading && !profissionais ? (
                        <View style={{ marginTop: 50, alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={theme.primary} />
                            <Text style={{ color: theme.text, marginTop: 10 }}>Buscando profissionais...</Text>
                        </View>
                    ) : (
                        <Text style={{ textAlign: 'center', color: theme.placeholder, marginTop: 30 }}>
                            Nenhum profissional disponível nesta unidade.
                        </Text>
                    )
                )}
            />

            {/* Botão Voltar fixo no rodapé para facilidade de navegação */}
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: theme.placeholder }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        backgroundColor: theme.danger,
                        padding: 12,
                        borderRadius: 6,
                        alignItems: "center"
                    }}
                >
                    <Text style={{ color: COLORS.branco, fontWeight: "bold", fontSize: 16 }}>
                        Voltar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}