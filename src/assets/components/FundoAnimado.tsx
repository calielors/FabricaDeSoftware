import React, { useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Dimensions, View, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import lottieOriginalData from '../../../assets/background/cleaned_lottie.json';

const { width, height } = Dimensions.get("screen");
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const TOTAL_FRAMES = 1000;
const FRAME_START = 100;
const FRAME_END = 870;
const PROGRESS_START = FRAME_START / TOTAL_FRAMES;
const PROGRESS_END = FRAME_END / TOTAL_FRAMES;
const FATOR_LENTIDAO = 3.5;
const DURACAO_DA_INTRODUCAO = (FRAME_START / 100) * 1000 * FATOR_LENTIDAO;
const DURACAO_DO_PASSO_VAI_VEM = ((FRAME_END - FRAME_START) / 100) * 1000 * FATOR_LENTIDAO;

function hexToLottieAlpha(hex: string, alpha: number): [number, number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16) / 255,
    parseInt(h.substring(2, 4), 16) / 255,
    parseInt(h.substring(4, 6), 16) / 255,
    alpha,
  ];
}

function aplicarCores(obj: any, mapaDeNomes: Record<string, [number, number, number, number]>): any {
  if (Array.isArray(obj)) return obj.map(i => aplicarCores(i, mapaDeNomes));
  if (typeof obj !== 'object' || obj === null) return obj;

  const novo = { ...obj };

  if (novo.nm && mapaDeNomes[novo.nm]) {
    const [r, g, b, a] = mapaDeNomes[novo.nm];

    // Substitui a cor
    if (novo.c?.k !== undefined) {
      novo.c = { ...novo.c, k: [r, g, b, a] };
    }

    // Substitui a opacidade (Lottie usa 0-100)
    if (novo.o?.k !== undefined) {
      novo.o = { ...novo.o, k: a * 100 };
    }
  }

  for (const key of Object.keys(novo)) {
    if (typeof novo[key] === 'object') {
      novo[key] = aplicarCores(novo[key], mapaDeNomes);
    }
  }
  return novo;
}

export default function FundoSvgAnimado({ theme, pararEFinalizar }: { theme: any; pararEFinalizar: boolean }) {
  const animacaoProgresso = useRef(new Animated.Value(0)).current;

  const lottieComCores = useMemo(() => {
    const mapa: Record<string, [number, number, number, number]> = {
      'linhas': hexToLottieAlpha(theme?.primary || '#3e81c0', 0.5),
      'botom':  hexToLottieAlpha(theme?.success || '#4CAF50', 0.5),
      'top':    hexToLottieAlpha(theme?.danger  || '#F44336', 0.7),
    };
    return aplicarCores(lottieOriginalData, mapa);
  }, [theme]);

  useEffect(() => {
    if (pararEFinalizar) {
      animacaoProgresso.stopAnimation();
      return;
    }

    const executarLoopPingPong = () => {
      if (pararEFinalizar) return;
      Animated.timing(animacaoProgresso, {
        toValue: PROGRESS_END,
        duration: DURACAO_DO_PASSO_VAI_VEM,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && !pararEFinalizar) {
          Animated.timing(animacaoProgresso, {
            toValue: PROGRESS_START,
            duration: DURACAO_DO_PASSO_VAI_VEM,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(({ finished: finishedVolta }) => {
            if (finishedVolta && !pararEFinalizar) executarLoopPingPong();
          });
        }
      });
    };

    // Introdução: do frame 0 até PROGRESS_START, uma vez só
    Animated.timing(animacaoProgresso, {
      toValue: PROGRESS_START,
      duration: DURACAO_DA_INTRODUCAO,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !pararEFinalizar) executarLoopPingPong();
    });

    return () => animacaoProgresso.stopAnimation();
  }, [pararEFinalizar]);

  return (
    <View style={[styles.absoluteContainer, { backgroundColor: theme?.background || '#050505' }]}>
      <AnimatedLottieView
        source={lottieComCores}
        progress={animacaoProgresso}
        resizeMode="cover"
        style={styles.lottieAbsolute}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0, left: 0, width, height,
    zIndex: -1, elevation: -1,
  },
  lottieAbsolute: {
    width, height,
    position: 'absolute',
    top: 0, left: 0,
  }
});