import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from '../pages/perfil/perfil';
import Recuperar from '../pages/recuperarSenha/tela1/recuperar';
import AuthStack from './AuthStack';
import RecuperarStack from './RecuperarStack';

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="RecuperarStack" component={RecuperarStack} />
        </Stack.Navigator>
    );
}
