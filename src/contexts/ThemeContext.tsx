import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHT_THEME, DARK_THEME } from "../assets/colors/colors";

// Interface para os dados da barra
interface ConfigBarra {
  etapa?: number;
  total?: number;
}

interface ThemeContextData {
  theme: typeof LIGHT_THEME;
  darkMode: boolean;
  toggleTheme: () => void;
  progressoGlobal: Animated.Value;
  configBarra: ConfigBarra; // Usando a interface aqui
  atualizarBarra: (etapa?: number, total?: number) => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // CORREÇÃO: Definindo explicitamente o tipo do estado para aceitar números
  const [configBarra, setConfigBarra] = useState<ConfigBarra>({ 
    etapa: undefined, 
    total: undefined 
  });

  // Instância única da animação
  const progressoGlobal = useRef(new Animated.Value(100)).current;

  const theme = darkMode ? DARK_THEME : LIGHT_THEME;

  const atualizarBarra = (etapa?: number, total?: number) => {
    // Agora o TS não reclama mais desta atribuição
    setConfigBarra({ etapa, total });
    
    const destino = (etapa !== undefined && total !== undefined) 
        ? (etapa / total) * 100 
        : 100;

    Animated.timing(progressoGlobal, {
      toValue: destino,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem("@theme:darkMode");
        if (storedTheme !== null) {
          setDarkMode(storedTheme === "true");
        }
      } catch (error) {
        console.log("Erro ao carregar tema:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTheme();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("@theme:darkMode", darkMode.toString());
    }
  }, [darkMode, loading]);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  if (loading) return null;

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        darkMode, 
        toggleTheme, 
        progressoGlobal,   
        configBarra,       
        atualizarBarra     
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}