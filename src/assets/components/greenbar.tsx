import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../assets/colors/colors";

interface GreenBar {
  etapaAtual?: number;
  totalEtapas?: number;
}

export const GreenBar = ({ etapaAtual, totalEtapas }: GreenBar) => {
  const mostrarOnda = etapaAtual !== undefined && totalEtapas !== undefined;
  const valorAlvo = mostrarOnda ? etapaAtual : 100;
  const progressoAnimado = useRef(new Animated.Value(valorAlvo)).current;

  useEffect(() => {
    Animated.timing(progressoAnimado, {
      toValue: valorAlvo,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [valorAlvo]);

  const larguraBarra = progressoAnimado.interpolate({
    inputRange: mostrarOnda ? [0, totalEtapas!] : [0, 100],
    outputRange: ["0%", mostrarOnda ? "88%" : "100%"],
  });

  const posicaoMarcador = progressoAnimado.interpolate({
    inputRange: [1, totalEtapas || 1],
    outputRange: ["15%", "82%"],
  });

  const alturaOnda = 32;
  const larguraOnda = 120;

  return (
    <>
      {/* Linha de Fundo */}
      <View style={styles.barra_fundo} />
      {/* Barra Verde Animada */}
      <Animated.View style={[styles.green_bar, { width: larguraBarra }]} />
      {/* Onda e Número */}
      {mostrarOnda && (
        <Animated.View style={[styles.container_onda, { left: posicaoMarcador }]}>
          <Svg width={larguraOnda} height={alturaOnda + 4} viewBox={`0 0 ${larguraOnda} ${alturaOnda + 4}`}>
            <Path
              d={`M 0 0 L 0 4 
                 C ${larguraOnda * 0.3} 4, ${larguraOnda * 0.35} ${alturaOnda}, ${larguraOnda * 0.5} ${alturaOnda} 
                 C ${larguraOnda * 0.65} ${alturaOnda}, ${larguraOnda * 0.7} 4, ${larguraOnda} 4
                 L ${larguraOnda} 0 Z`}
              fill={COLORS.verde}
            />
          </Svg>
          <View style={styles.numero_wrapper}>
            <Text style={styles.texto_numero}>{etapaAtual}</Text>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  barra_fundo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  green_bar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 4,
    backgroundColor: COLORS.verde,
    zIndex: 2,
  },
  container_onda: {
    position: "absolute",
    bottom: -32,
    marginLeft: -60,
    width: 120,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  numero_wrapper: {
    position: "absolute",
    top: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  texto_numero: {
    color: COLORS.branco,
    fontWeight: "bold",
    fontSize: 18,
    includeFontPadding: false,
  },
});