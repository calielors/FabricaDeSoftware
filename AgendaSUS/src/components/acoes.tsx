import React from 'react';
import { COLORS } from '../assets/colors/colors';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function Acoes() {
    const [ativo, setAtivo] = React.useState(0);
    return (
        <View style={Acoes_Styles.container}>
            <View style={Acoes_Styles.acoes_box}>
                <View><TouchableOpacity style={Acoes_Styles.acoes_icons} onPress={() => setAtivo(0)}> <FontAwesome6 name="user" size={24} color={ativo === 0 ? 'black' : COLORS.placeholder_text} /> <Text style={Acoes_Styles.texto_icons}>Login </Text></TouchableOpacity></View>
                <View><TouchableOpacity style={Acoes_Styles.acoes_icons} onPress={() => setAtivo(1)}> <Entypo name="home" size={24} color={ativo === 1 ? 'black' : COLORS.placeholder_text} /> <Text style={Acoes_Styles.texto_icons}>Início </Text></TouchableOpacity></View>
                <View><TouchableOpacity style={Acoes_Styles.acoes_icons} onPress={() => setAtivo(2)}> <AntDesign name="bars" size={24} color={ativo === 2 ? 'black' : COLORS.placeholder_text} /> <Text style={Acoes_Styles.texto_icons}>Consultas </Text></TouchableOpacity></View>
                <View><TouchableOpacity style={Acoes_Styles.acoes_icons} onPress={() => setAtivo(3)}> <FontAwesome6 name="calendar-plus" size={24} color={ativo === 3 ? 'black' : COLORS.placeholder_text} /> <Text style={Acoes_Styles.texto_icons}>Agendar </Text></TouchableOpacity></View>

            </View>
        </View>
    ); <FontAwesome6 name="calendar-plus" size={24} color="black" />
}
const Acoes_Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
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
    }
});

