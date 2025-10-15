import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/login/login';
import Cadastro from '../pages/cadastro/cadastro';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
    );
}
