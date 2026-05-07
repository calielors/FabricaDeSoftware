import { Href, useRouter } from 'expo-router';
import { Gesture} from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

export function swipePage(page: string, router: ReturnType<typeof useRouter>) {
    const translateX = useSharedValue(0);
    let leftpage: Href | null = null;
    let righpage: Href | null = null;

    switch (page) {
        case 'home':
            leftpage = null;
            righpage = '/consultas' as Href | null;
            break;
        case 'consultas':
            leftpage = '/index' as Href | null;
            righpage = '/agendar' as Href | null;
            break;
        case 'agendar':
            leftpage = '/consultas' as Href | null;
            righpage = '/perfil' as Href | null;
            break;
        case 'perfil':
            leftpage = '/agendar' as Href | null;
            righpage = null;
            break;
    }


  const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
        })
        .onEnd((event) => {
            if (event.translationX < -150 && righpage) {
                // Se arrastou o suficiente para a esquerda, navega
                runOnJS(router.navigate)(righpage);
            } else if (event.translationX > 150 && leftpage) {
                // Se arrastou o suficiente para a direita, navega
                runOnJS(router.navigate)(leftpage);
            }

            // Volta a tela para o centro após soltar
            translateX.value = withTiming(0);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return { gesture, animatedStyle };
}