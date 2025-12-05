import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../assets/colors/colors";
import { useTheme } from "../contexts/ThemeContext";

interface BarraEtapasProps {
  etapaAtual: number; 
  totalEtapas: number;
}

export default function BarraProgresso({ etapaAtual, totalEtapas }: BarraEtapasProps) {
  const { theme } = useTheme();
  const styles = estilos(theme);
  return (
    <View style={styles.container}>
      {[...Array(totalEtapas)].map((_, indice) => {
        const etapa = indice + 1;
        const ativa = etapa <= etapaAtual;

        return (
          <View key={etapa} style={styles.etapaContainer}>
            <View
              style={[
                styles.circulo,
                { backgroundColor: ativa ? theme.primary : theme.placeholder },
              ]}
            >
              <Text style={styles.textoCirculo}>{etapa}</Text>
            </View>

            {etapa < totalEtapas && (
              <View
                style={[
                  styles.linha,
                  { backgroundColor: etapa < etapaAtual ? theme.primary : theme.placeholder },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const estilos = (theme: any) => StyleSheet.create({
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
    color: theme.background,
    fontWeight: "bold",
  },
  linha: {
    width: 139,
    height: 3,
  },
});
