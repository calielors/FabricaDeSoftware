import { Stack } from "expo-router";

export default function PerfilLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="dadosPessoais" />
            <Stack.Screen name="endereco" />
            <Stack.Screen name="sobreApp" />
            <Stack.Screen name="centralAjuda" />
        </Stack>
    );
}
