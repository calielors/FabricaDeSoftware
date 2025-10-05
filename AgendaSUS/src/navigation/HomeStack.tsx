import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/home/home';
import Medicamentos from '../pages/medicamentos/medicamentos';
import Historico from '../pages/historico/historico';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={Home} />
            <Stack.Screen name="Medicamentos" component={Medicamentos} />
            <Stack.Screen name="Historico" component={Historico} />
        </Stack.Navigator>
    );
}
