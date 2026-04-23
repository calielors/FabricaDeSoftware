import { Stack } from "expo-router";

export default function ServicosLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="historico" />
            <Stack.Screen name="medicamentos" />
        </Stack>
    );
}
