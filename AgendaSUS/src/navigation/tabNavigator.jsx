import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import Login from "../screens/HomeScreen";
import Consultas from "../screens/ConsultasScreen";
import Agendamento from "../screens/AgendamentoScreen";
import Perfil from "../screens/PerfilScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === "Início") iconName = "home";
                        else if (route.name === "Consultas") iconName = "calendar";
                        else if (route.name === "Agendar") iconName = "add-circle";
                        else if (route.name === "Perfil") iconName = "person";

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#0072BB",
                    tabBarInactiveTintColor: "gray",
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Início" component={Login} />
                <Tab.Screen name="Consultas" component={Consultas} />
                <Tab.Screen name="Agendar" component={Agendamento} />
                <Tab.Screen name="Perfil" component={Perfil} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
