import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "./home";
import ConsultasScreen from "../consultas/consultas";
import AgendamentoScreen from "../agendamento/agendamento";
import PerfilScreen from "../../perfil/perfil";

const Tab = createBottomTabNavigator();

export default function HomeTabsLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Início"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Início") return <Ionicons name="home" size={size} color={color} />;
          if (route.name === "Consultas") return <FontAwesome name="bars" size={size} color={color} />;
          if (route.name === "Agendar") return <MaterialIcons name="event-available" size={size} color={color} />;
          if (route.name === "Perfil") return <FontAwesome5 name="user-cog" size={18} color={color} />;
          return null;
        },
        tabBarActiveTintColor: "#1976d2",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 20,
          shadowOpacity: 0.2,
          zIndex: 9999,
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Consultas" component={ConsultasScreen} />
      <Tab.Screen name="Agendar" component={AgendamentoScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
