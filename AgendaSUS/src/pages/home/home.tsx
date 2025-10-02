import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, Maria!</Text>
      <Text style={styles.data}>Quarta-feira, 22 de fevereiro de 2023</Text>
      {/* Aqui vai seu conteúdo com consultas, serviços, etc */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold' },
  data: { fontSize: 16, marginBottom: 20 },
});
