import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from '../pages/cadastro/cadastro/cadastro';
import Validacao from '../pages/cadastro/validação/validacao';
import { CadastroProvider } from '../pages/cadastro/CadastroContext';

const Stack = createNativeStackNavigator();

export default function CadastroStack() {
    return (
        <CadastroProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Validacao" component={Validacao} />
            </Stack.Navigator>
        </CadastroProvider>
    );
}
