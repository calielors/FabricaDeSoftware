import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Fontisto, FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from "../../assets/colors/colors";
import { StyleSheet } from "react-native";


export const Top_Bar = () => {
    return (
<View style={Top_Bar_Styles.sus_agendamento}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <FontAwesome6 name="hospital" size={50} color={COLORS.branco} />
                    <Text style={{ color: COLORS.branco, fontSize: 30, }}>SUS Agendamento </Text>
                </View>

                <View style={{ backgroundColor: '#28a745', width: '100%', height: 5, alignSelf: 'stretch', marginTop: 'auto' }} />
            </View>
    );
}

 const Top_Bar_Styles = StyleSheet.create({
sus_agendamento:{
            backgroundColor: COLORS.azul_principal,
            width: '100%',
            height: '15%',
            position: 'absolute',
            top: 0,
            alignItems: 'center',
            paddingTop: 60,
      },
});
