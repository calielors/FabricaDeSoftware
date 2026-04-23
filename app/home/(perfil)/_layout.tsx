import { Stack } from "expo-router";

export default function ServicosLayout() {
    return (
        <Stack screenOptions={{headerShown: false, animation: "ios_from_right",  }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="dadosPessoais" />
            <Stack.Screen name="endereco" />
            <Stack.Screen name="sobreApp" />
            <Stack.Screen name="centralAjuda" />
        </Stack>
    );
}
