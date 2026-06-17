import { Stack } from "expo-router";
import React from "react";

export default function RecuperarLayout() {
  return (
    <Stack screenOptions={{ headerShown: false,  contentStyle: { backgroundColor: "transparent" }, animation: "fade" }}>
      <Stack.Screen name="recuperar" />
      <Stack.Screen name="validar" />
      <Stack.Screen name="alterar" />
    </Stack>
  );
}