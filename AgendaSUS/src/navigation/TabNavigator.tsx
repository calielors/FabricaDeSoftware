import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import Home from '../pages/home/home';
import Agendamento from '../pages/agendamento/agendamento';
import Consultas from '../pages/consultas/consultas';
import Perfil from '../pages/perfil/perfil';
import HomeStack from './HomeStack';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    console.log('[TabNavigator] mounted');
    return (
        <Tab.Navigator
            initialRouteName="Início"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Início') return <Ionicons name="home" size={size} color={color} />;
                    if (route.name === 'Consultas') return <FontAwesome name="bars" size={size} color={color} />;
                    if (route.name === 'Agendar') return <MaterialIcons name="event-available" size={size} color={color} />;
                    if (route.name === 'Perfil') return <FontAwesome5 name="user-cog" size={18} color={color} />;
                    return null;
                },
                tabBarActiveTintColor: '#1976d2',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                // Forçar a TabBar acima de overlays
                tabBarStyle: {
                    backgroundColor: '#fff',
                    elevation: 20, // Android
                    shadowOpacity: 0.2, // iOS shadow
                    zIndex: 9999,
                },
            })}
        >
            <Tab.Screen name="Início" component={HomeStack} />
            <Tab.Screen name="Consultas" component={Consultas} />
            <Tab.Screen name="Agendar" component={Agendamento} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
}
