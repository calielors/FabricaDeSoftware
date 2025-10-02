import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Top_Bar } from "../../components/top_bar";

export default function Consultas() {
  return (
    <View style={styles.container}>
        <Top_Bar/>
      <View style={styles.card}>
        <Text style={styles.titulo}>Resumo da Consulta</Text>

        <Text style={styles.label}>
          <Text style={styles.bold}>Especialista: </Text>Clínico Geral
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Unidade: </Text>UBS Jardim das Flores
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Endereço: </Text>Rua das Flores, 123
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Data: </Text>22/02/2023
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Horário: </Text>14:00h
        </Text>
      </View>

      {/* Botões */}
      <TouchableOpacity style={styles.botaoConfirmar}>
        <Text style={styles.textoBotaoConfirmar}>Confirmar Agendamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0073cf',
  },
  linhaVerde: {
    height: 4,
    backgroundColor: '#3ac267',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 2,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0073cf',
    marginBottom: 15,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  botaoConfirmar: {
    backgroundColor: '#3ac267',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBotaoConfirmar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoVoltar: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoVoltar: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
