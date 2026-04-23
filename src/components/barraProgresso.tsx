import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Check } from "lucide-react-native"; // Ou use MaterialIcons do Expo
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
        const concluida = etapa < etapaAtual;
        const ativa = etapa === etapaAtual;
        const pendente = etapa > etapaAtual;

        return (
          <React.Fragment key={etapa}>
            {/* Círculo da Etapa */}
            <View style={[
              styles.circulo,
              concluida && styles.circuloConcluido,
              ativa && styles.circuloAtivo,
              pendente && styles.circuloPendente
            ]}>
              {concluida ? (
                <Check size={16} color="#fff" strokeWidth={3} />
              ) : (
                <Text style={[
                  styles.textoCirculo,
                  ativa ? { color: theme.primary } : { color: theme.placeholder }
                ]}>
                  {etapa}
                </Text>
              )}
            </View>

            {/* Linha Conectora */}
            {etapa < totalEtapas && (
              <View style={styles.containerLinha}>
                <View style={[
                  styles.linhaBase,
                  { backgroundColor: theme.placeholder + '40' } // Linha de fundo semi-transparente
                ]} />
                <View style={[
                  styles.linhaProgresso,
                  { 
                    backgroundColor: theme.primary,
                    width: concluida ? '100%' : '0%' // Preenche se a etapa passou
                  }
                ]} />
              </View>
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
    justifyContent: "center",
    marginVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  circulo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    zIndex: 2,
  },
  circuloConcluido: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  circuloAtivo: {
    backgroundColor: theme.background,
    borderColor: theme.primary,
    elevation: 4,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  circuloPendente: {
    backgroundColor: theme.background,
    borderColor: theme.placeholder + '80',
  },
  textoCirculo: {
    fontSize: 14,
    fontWeight: "bold",
  },
  containerLinha: {
    flex: 1,
    height: 4,
    justifyContent: 'center',
    marginHorizontal: -2, // Sobrepõe levemente para não haver gaps
    zIndex: 1,
  },
  linhaBase: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
  linhaProgresso: {
    height: '100%',
    borderRadius: 2,
  },
});