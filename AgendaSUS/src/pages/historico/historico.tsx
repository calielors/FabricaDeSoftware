import React, { useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../assets/colors/colors';
import { Historico_Styles } from './historico_styles';

const Tab = createMaterialTopTabNavigator();

function useFadeIn() {
    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [opacity]);
    return opacity;
}

function Consultas() {
    const opacity = useFadeIn();
    return (
        <Animated.View style={[Historico_Styles.tabContainer, { opacity }]}>
            <View style={Historico_Styles.eventRow}>
                <Text style={Historico_Styles.eventText}>Consulta 1: 01/01/2023 - Médico: Dr. Silva</Text>
                <Text style={Historico_Styles.badgePresent}>Compareceu</Text>
            </View>
            <View style={Historico_Styles.eventRow}>
                <Text style={Historico_Styles.eventText}>Consulta 2: 15/02/2023 - Médico: Dra. Souza</Text>
                <Text style={Historico_Styles.badgeAbsent}>Não compareceu</Text>
            </View>
            <View style={Historico_Styles.eventRow}>
                <Text style={Historico_Styles.eventText}>Consulta 3: 10/03/2023 - Médico: Dr. Oliveira</Text>
                <Text style={Historico_Styles.badgePresent}>Compareceu</Text>
            </View>
            <View style={Historico_Styles.eventRow}>
                <Text style={Historico_Styles.eventText}>Consulta 4: 05/04/2023 - Médico: Dr. Pereira</Text>
                <Text style={Historico_Styles.badgePresent}>Compareceu</Text>
            </View>
            <View style={Historico_Styles.eventRow}>
                <Text style={Historico_Styles.eventText}>Consulta 5: 20/05/2023 - Médico: Dra. Fernandes</Text>
                <Text style={Historico_Styles.badgeAbsent}>Não compareceu</Text>
            </View>
        </Animated.View>
    );
}

function Vacinas() {
    const opacity = useFadeIn();
    return (
        <Animated.View style={[Historico_Styles.tabContainer, { opacity }]}>
            <Text style={Historico_Styles.eventText}>Vacina 1: 05/01/2023 - Vacina: Influenza</Text>
            <Text style={Historico_Styles.eventText}>Vacina 2: 20/02/2023 - Vacina: Hepatite B</Text>
            <Text style={Historico_Styles.eventText}>Vacina 3: 15/03/2023 - Vacina: Tétano</Text>
        </Animated.View>
    );
}

export default function Historico() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.azul_principal,
                tabBarInactiveTintColor: COLORS.placeholder_text,
                tabBarIndicatorStyle: Historico_Styles.tabIndicator,
                tabBarStyle: Historico_Styles.tabBar,
                swipeEnabled: true,
            }}
        >
            <Tab.Screen name="Consultas" component={Consultas} />
            <Tab.Screen name="Vacinas" component={Vacinas} />
        </Tab.Navigator>
    );
}