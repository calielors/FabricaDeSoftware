import { Stack } from "expo-router";
import React from "react";

export default function RecuperarLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="recuperar" />
      <Stack.Screen name="validar" />
      <Stack.Screen name="alterar" />
    </Stack>
  );
}