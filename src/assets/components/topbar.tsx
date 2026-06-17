import React from "react";
import { View, Text, Platform, StatusBar, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLORS } from "../../assets/colors/colors";
import { useTheme } from "../../contexts/ThemeContext";
import { GreenBar } from "./greenbar"; // Importe o novo componente
import {usePathname } from "expo-router";
import { useEffect } from "react";

interface TopBarProps {
  etapaAtual?: number;
  totalEtapas?: number;
}

export const Top_Bar = ({ etapaAtual, totalEtapas }: TopBarProps) => {
  const { theme } = useTheme();
  const styles = Top_Bar_Styles(theme);
  const extraTop = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  return (
    <View style={[styles.sus_agendamento, { paddingTop: extraTop }]}>
      <View style={styles.title_container}>
        <FontAwesome6 name="hospital" size={44} color={COLORS.branco} />
        <Text style={styles.title_text}>Agenda SUS</Text>
      </View>
      <GreenBar etapaAtual={etapaAtual} totalEtapas={totalEtapas} />
    </View>
  );
};

export const GerenciadorDeProgresso = () => {
  const { atualizarBarra, configBarra } = useTheme();
  const pathname = usePathname();
  useEffect(() => {
    // Extraímos a última parte da URL para o switch comparar
    // Ex: "/home/unidade" vira "unidade"
    const rotaAtual = pathname.split('/').pop() || "";

    let etapa: number | undefined;
    let total: number | undefined = 3;

    switch (rotaAtual) {
      case "unidade":
      case "recuperar":
        etapa = 1;
        break;

      case "profissionais":
      case "validar":
        etapa = 2;
        break;

      case "agendar":
      case "alterar":
        etapa = 3;
        break;

      default:
        etapa = undefined;
        total = undefined;
        break;
    }

    atualizarBarra(etapa, total);
  }, [pathname]);

  return (
    <Top_Bar 
      key={pathname} // A 'key' força a Top_Bar a se atualizar visualmente na troca de rota
      etapaAtual={configBarra.etapa} 
      totalEtapas={configBarra.total} 
    />
  );
}

const Top_Bar_Styles = (theme: any) => StyleSheet.create({
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
  });