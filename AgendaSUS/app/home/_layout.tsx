import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function TabsLayout() {
   const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "index")
            return <Ionicons name="home" size={size} color={color} />;

          if (route.name === "consultas")
            return <FontAwesome name="bars" size={size} color={color} />;

          if (route.name === "agendar")
            return <MaterialIcons name="event-available" size={size} color={color} />;

          if (route.name === "(perfil)")
            return <FontAwesome5 name="user-cog" size={18} color={color} />;

          return null;
        },
        tabBarActiveTintColor: "#1976d2",
        tabBarInactiveTintColor: theme.placeholder,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          elevation: 20,
          shadowOpacity: 0.2,
          zIndex: 9999,
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Início" }} />
      <Tabs.Screen name="consultas" options={{ title: "Consultas" }} />
      <Tabs.Screen name="agendar" options={{ title: "Agendar" }} />
      <Tabs.Screen name="(perfil)" options={{ title: "Perfil" }} />
    </Tabs>
  );
}