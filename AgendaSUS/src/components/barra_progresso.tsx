import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../assets/colors/colors";

interface BarraEtapasProps {
  etapaAtual: number; 
  totalEtapas: number;
}

export default function BarraProgresso({ etapaAtual, totalEtapas }: BarraEtapasProps) {
  return (
    <View style={estilos.container}>
      {[...Array(totalEtapas)].map((_, indice) => {
        const etapa = indice + 1;
        const ativa = etapa <= etapaAtual;

        return (
          <View key={etapa} style={estilos.etapaContainer}>
            <View
              style={[
                estilos.circulo,
                { backgroundColor: ativa ? COLORS.azul_principal : COLORS.placeholder_text },
              ]}
            >
              <Text style={estilos.textoCirculo}>{etapa}</Text>
            </View>

            {etapa < totalEtapas && (
              <View
                style={[
                  estilos.linha,
                  { backgroundColor: etapa < etapaAtual ? COLORS.azul_principal : COLORS.placeholder_text },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  etapaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circulo: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textoCirculo: {
    color: COLORS.branco,
    fontWeight: "bold",
  },
  linha: {
    width: 139,
    height: 3,
  },
});
