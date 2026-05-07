import React from "react";
import { View, Text, Platform, StatusBar, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { COLORS } from "../../assets/colors/colors";
import { useTheme } from "../../contexts/ThemeContext";
import { GreenBar } from "./greenbar"; // Importe o novo componente

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
        <Text style={styles.title_text}>SUS Agendamento</Text>
      </View>
      <GreenBar etapaAtual={etapaAtual} totalEtapas={totalEtapas} />
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
  });