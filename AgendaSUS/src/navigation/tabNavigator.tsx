import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

import Login from "../pages/home/home";
import Consultas from "../pages/consultas/consultas";
import Agendamento from "../pages//agendamento/agendamento";
import Perfil from "../pages/perfil/perfil";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === "Login") iconName = "login";
                        if (route.name === "Início") iconName = "home";
                        else if (route.name === "Consultas") iconName = "calendar";
                        else if (route.name === "Agendar") iconName = "add-circle";
                        else if (route.name === "Perfil") iconName = "person";

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#0072BB",
                    tabBarInactiveTintColor: "gray",
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Início" component={Home} />
                <Tab.Screen name="Consultas" component={Consultas} />
                <Tab.Screen name="Agendar" component={Agendamento} />
                <Tab.Screen name="Perfil" component={Perfil} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
