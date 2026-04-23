import React, { useEffect, useRef } from "react";
import { View, Text, Platform, StatusBar, StyleSheet, Animated } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../assets/colors/colors";
import { useTheme } from "../contexts/ThemeContext";

interface TopBarProps {
  etapaAtual?: number;
  totalEtapas?: number;
}

export const Top_Bar = ({ etapaAtual, totalEtapas }: TopBarProps) => {
    const { theme } = useTheme();
    const styles = Top_Bar_Styles(theme);
    const extraTop = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

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

    // LARGURA DA BARRA:
    const larguraBarra = progressoAnimado.interpolate({
        inputRange: mostrarOnda ? [0, totalEtapas!] : [0, 100],
        outputRange: ["0%", mostrarOnda ? "88%" : "100%"]
    });

    // POSIÇÃO DA ONDA:
    // Começa em 15% (mais à esquerda) e vai até 82% (espaço no final).
    const posicaoMarcador = progressoAnimado.interpolate({
        inputRange: [1, totalEtapas || 1],
        outputRange: ["15%", "82%"] 
    });

    const alturaOnda = 32; 
    const larguraOnda = 120;

    return (
        <View style={[styles.sus_agendamento, { paddingTop: extraTop }]}>
            <View style={styles.title_container}>
                <FontAwesome6 name="hospital" size={44} color={COLORS.branco} />
                <Text style={styles.title_text}>SUS Agendamento</Text>
            </View>

            <View style={styles.barra_fundo} />

            <Animated.View style={[styles.green_bar, { width: larguraBarra }]} />

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
        </View>
    );
};

const Top_Bar_Styles = (theme: any) =>
    StyleSheet.create({
        sus_agendamento: {
            backgroundColor: theme.primary,
            width: "100%",
            minHeight: 88,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "visible", 
            zIndex: 99,
        },
        title_container: {
            flexDirection: "row",
            alignItems: "center",
            transform: [{ translateY: -10 }],
            gap: 10,
        },
        title_text: {
            color: COLORS.branco,
            fontSize: 22,
            fontWeight: "700",
        },
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
            position: 'absolute',
            top: 10, 
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        texto_numero: {
            color: COLORS.branco,
            fontWeight: "bold",
            fontSize: 18,
            includeFontPadding: false,
        }
    });