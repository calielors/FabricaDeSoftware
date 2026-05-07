import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import React from "react";
import { buscarUnidadesSaude, UnidadeSaude } from "../../../src/services/consultas";
import { useTheme } from "../../../src/contexts/ThemeContext";
import { router } from "expo-router";
import { useQuery } from "@/src/services/useQuery";

export default function SelecionarUnidade() {
  const { theme } = useTheme();
  const { data: unidades, loading, refresh } = useQuery<UnidadeSaude[]>(buscarUnidadesSaude);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={unidades || []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}        
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={[theme.primary, theme.success]} // Cores do seu tema
            progressBackgroundColor={theme.background} // Fundo da bolinha
            tintColor={theme.primary} // Cor no iOS
          />
        }

        // TUDO que ficava fixo no topo agora entra aqui para ser "puxado" junto
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
            Selecione a Unidade de Saúde
          </Text>
        }

        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: theme.placeholder
            }}
            onPress={() => {
              router.push({
                pathname: "/home/(agendar)/profissionais",
                params: { unidadeSelecionada: JSON.stringify(item) }
              });
            }}
          >
            <Text style={{ fontSize: 16, color: theme.text, fontWeight: "600" }}>
              {item.nome}
            </Text>
            {item.endereco && (
              <Text style={{ fontSize: 13, color: theme.placeholder, marginTop: 3 }}>
                {item.endereco}
              </Text>
            )}
          </TouchableOpacity>
        )}

        // Loading centralizado igual ao que você tinha
        ListEmptyComponent={() => (
          loading && !unidades ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 }}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text style={{ color: theme.text, marginTop: 10 }}>Carregando...</Text>
            </View>
          ) : (
            <Text style={{ color: theme.placeholder, textAlign: 'center', marginTop: 20 }}>
              Nenhuma unidade encontrada.
            </Text>
          )
        )}

        // O botão de voltar fica no final da lista ou fixo fora (melhor fora)
        ListFooterComponent={<View style={{ height: 80 }} />}
      />

      {/* Botão Voltar fixo embaixo para não sumir no scroll */}
      <View style={{ padding: 20, backgroundColor: theme.background }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: theme.danger,
            padding: 12,
            borderRadius: 6,
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