import { Stack, useSegments } from "expo-router";

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
