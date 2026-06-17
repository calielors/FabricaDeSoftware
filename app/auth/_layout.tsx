import { Stack } from "expo-router";
import React from "react";
import { CadastroProvider } from "../../src/contexts/CadastroContext";

export default function AuthLayout() {
  return (
    <CadastroProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade", 
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="validacao" />
      </Stack>
    </CadastroProvider>
  );
}