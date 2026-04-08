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
          <React.Fragment key={etapa}>
            <View
              style={[styles.circulo,{ backgroundColor: ativa ? theme.primary : theme.placeholder }]}>
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
          </React.Fragment>
        );
      })}
    </View>
  );
}

const estilos = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center'
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
    flex: 1,
    height: 3,
  },
});
