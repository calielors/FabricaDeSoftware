import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConsultasAgendadasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Consultas</Text>
      {/* Lista de Consultas agendadas */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold' },
});
