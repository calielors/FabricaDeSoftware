import { Stack, useSegments } from "expo-router";

export default function AgendarLayout() {

    return (
        <Stack screenOptions={{
            headerShown: false,
            animation: "slide_from_bottom",
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="historico" />
            <Stack.Screen name="medicamentos" />
        </Stack >
    );
}
