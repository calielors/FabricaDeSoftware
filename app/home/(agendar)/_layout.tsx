import { Stack, useSegments } from "expo-router";
import { View } from "react-native";
import { Top_Bar } from "../../../src/components/topbar";
import BarraProgresso from "../../../src/components/barraProgresso";
import { useTheme } from "../../../src/contexts/ThemeContext";

export default function AgendarLayout() {
    
    return (
        <Stack screenOptions = {{
            headerShown: false,
                gestureEnabled: true,
                    gestureDirection: "horizontal",
                    animation: "ios_from_right", 
            }}>
            <Stack.Screen name="unidade" />
            <Stack.Screen name="profissionais" />
            <Stack.Screen name="agendar" />
        </Stack >
    );
}
