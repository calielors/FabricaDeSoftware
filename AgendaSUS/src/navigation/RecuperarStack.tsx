import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Recuperar from '../pages/recuperarSenha/tela1/recuperar';
import Validar from '../pages/recuperarSenha/tela2/validar';
import Alterar from '../pages/recuperarSenha/tela3/alterar';
const Stack = createNativeStackNavigator();

export default function RecuperarStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Recuperar" component={Recuperar}/>
            <Stack.Screen name="Validar" component={Validar}/>
            <Stack.Screen name="Alterar" component={Alterar}/>
        </Stack.Navigator>
    );
}
