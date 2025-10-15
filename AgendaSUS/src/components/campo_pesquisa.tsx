import React from "react";
import { TextInput as PaperInput } from "react-native-paper";
import { COLORS } from "../assets/colors/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";

type CampoPesquisaProps = {
  label: string;
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string; // placeholder opcional
};

export const CampoPesquisa: React.FC<CampoPesquisaProps> = ({
  label,
  query,
  setQuery,
  placeholder = "", // valor padrão vazio
}) => {
  return (
    <PaperInput
      mode="outlined"
      label={label}
      value={query}
      onChangeText={setQuery}
      placeholder={placeholder} 
      placeholderTextColor={COLORS.placeholder_text}
      activeOutlineColor={COLORS.azul_principal}
      style={styles.busca}
      theme={{ roundness: 10 }}
      contentStyle={{ paddingHorizontal: 15 }} 
      right={
        <PaperInput.Icon
          icon={() => (
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={COLORS.placeholder_text}
            />
          )}
        />
      }
    />
  );
};
const styles = StyleSheet.create({
    busca: {
        borderColor: COLORS.placeholder_text,
        width: '90%',
        height: 35,
        alignSelf: 'center',
        backgroundColor: COLORS.cinza_claro,
    },
});