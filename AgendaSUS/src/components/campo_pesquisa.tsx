import React from "react";
import { TextInput as PaperInput } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type CampoPesquisaProps = {
  label: string;
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
};

export const CampoPesquisa: React.FC<CampoPesquisaProps> = ({
  label,
  query,
  setQuery,
  placeholder = "",
}) => {

  const { theme } = useTheme();           // ✅ AGORA ESTÁ CORRETO
  const styles = getStyles(theme);        // ✅ estilos dinâmicos

  return (
    <PaperInput
      mode="outlined"
      label={label}
      value={query}
      onChangeText={setQuery}
      placeholder={placeholder}
      placeholderTextColor={theme.placeholder}
      activeOutlineColor={theme.primary}
      style={styles.busca}
      theme={{ roundness: 10 }}
      contentStyle={{ paddingHorizontal: 15 }}
      right={
        <PaperInput.Icon
          icon={() => (
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={theme.placeholder}
            />
          )}
        />
      }
    />
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    busca: {
      borderColor: theme.placeholder,
      width: "90%",
      height: 35,
      alignSelf: "center",
      backgroundColor: theme.card,
    },
  });
