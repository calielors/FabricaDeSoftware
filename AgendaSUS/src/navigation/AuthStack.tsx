import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/login/login';
import CadastroStack from './CadastroStack';
import RecuperarStack from './RecuperarStack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CadastroStack" component={CadastroStack} />
            <Stack.Screen name="Recuperar" component={RecuperarStack}/>
        </Stack.Navigator>
    );
}
