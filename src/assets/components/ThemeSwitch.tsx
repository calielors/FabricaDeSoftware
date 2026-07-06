import React, { useRef, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '../../contexts/ThemeContext';

const switchAnimation = require('../../../assets/background/themes.json');

export default function ThemeSwitch() {
  const { darkMode, toggleTheme } = useTheme();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (darkMode) {
      animationRef.current?.play(15, 15);
    } else {
      animationRef.current?.play(0, 0);
    }
  }, []);

  const handlePress = () => {
    if (darkMode) {
      animationRef.current?.play(15, 0); 
    } else {
      animationRef.current?.play(0, 15);
    }
    toggleTheme();
  };

  // 1. Definição das cores dinâmicas para o efeito de vidro
  const backgroundColor = darkMode 
    ? 'rgba(255, 255, 255, 0.08)' // Névoa branca bem suave para o modo escuro
    : 'rgba(0, 0, 0, 0.03)';       // Sombra acinzentada quase imperceptível para o modo claro

  const borderColor = darkMode
    ? 'rgba(255, 255, 255, 0.18)'  // Borda branca fina que brilha no escuro
    : 'rgba(0, 0, 0, 0.08)';       // Borda escura bem delicada para o claro

const iconColor = darkMode ? '#FFFFFF' : "#FFC107";

  return (
    // 2. Injetando o fundo e a borda dinâmicos no array de estilos
    <Pressable 
      onPress={handlePress} 
      style={[styles.button, { backgroundColor, borderColor }]}
    >
      <LottieView
        ref={animationRef}
        source={switchAnimation}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        colorFilters={[
          { keypath: "Sun Outlines/Stroke 1", color: iconColor },
          { keypath: "Sunny Outlines/Stroke 1", color: iconColor },
          { keypath: "**.*.Stroke 1", color: iconColor },
          { keypath: "**.Stroke 1", color: iconColor }
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1, // 3. Ativa a borda fina estrutural do botão
  },
  lottie: {
    width: '70%',  // 4. Reduzido levemente de 100% para 70% para o ícone respirar dentro do círculo
    height: '70%',
  },
});