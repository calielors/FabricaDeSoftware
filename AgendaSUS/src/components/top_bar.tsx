import React from "react";
import { View, Text, Platform, StatusBar } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS } from "../assets/colors/colors";
import { StyleSheet } from "react-native";

//usar SafeAreaView se necessário?
export const Top_Bar = () => {
    const extraTop = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
    return (
        <View style={[Top_Bar_Styles.sus_agendamento, { paddingTop: extraTop }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <FontAwesome6 name="hospital" size={44} color={COLORS.branco} />
                <Text style={{ color: COLORS.branco, fontSize: 22, fontWeight: '700' }}>SUS Agendamento</Text>
            </View>

            <View style={{ backgroundColor: '#28a745', width: '100%', height: 4, alignSelf: 'stretch', marginTop: 8 }} />
        </View>
    );
}

const Top_Bar_Styles = StyleSheet.create({
    sus_agendamento: {
        backgroundColor: COLORS.azul_principal,
        width: '100%',
        minHeight: 88,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
});
