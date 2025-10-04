import React from 'react';
import { COLORS } from '../assets/colors/colors';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function Acoes() {
  const [ativo, setAtivo] = React.useState(0); // Estado para controlar qual ícone está ativo

  return (
    <View style={Acoes_Styles.acoes_box}>
      <TouchableOpacity style={Acoes_Styles.acoes_icons} onPress={() => setAtivo(0)}>
        <View style={{ alignItems: 'center' }}>
          <FontAwesome6 name="user" size={24} color={ativo === 0 ? 'black' : COLORS.placeholder_text} />
          <Text style={Acoes_Styles.texto_icons}>Login</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={Acoes_Styles.acoes_icons} onPress={() => setAtivo(1)}>
        <View style={{ alignItems: 'center' }}>
          <Entypo name="home" size={24} color={ativo === 1 ? 'black' : COLORS.placeholder_text} />
          <Text style={Acoes_Styles.texto_icons}>Início</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={Acoes_Styles.acoes_icons} onPress={() => setAtivo(2)}>
        <View style={{ alignItems: 'center' }}>
          <AntDesign name="bars" size={24} color={ativo === 2 ? 'black' : COLORS.placeholder_text} />
          <Text style={Acoes_Styles.texto_icons}>Consultas</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={Acoes_Styles.acoes_icons} onPress={() => setAtivo(3)}>
        <View style={{ alignItems: 'center' }}>
          <FontAwesome6 name="calendar-plus" size={24} color={ativo === 3 ? 'black' : COLORS.placeholder_text} />
          <Text style={Acoes_Styles.texto_icons}>Agendar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Acoes_Styles = StyleSheet.create({
  acoes_box: {
    width: '100%',
    height: 80,
    borderTopColor: COLORS.placeholder_text,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  acoes_icons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto_icons: {
    fontSize: 12,
  },
});
