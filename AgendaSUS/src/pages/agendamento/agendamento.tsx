import { View, Text, TouchableOpacity } from "react-native";
import { Agendamento_Styles } from "./agendamento_styles";
import { COLORS } from "../../assets/colors/colors";
import ACOES from "../../components/acoes";
import React from "react";
import { Top_Bar } from "../../components/top_bar";
import { Calendar } from "react-native-calendars";
import { SafeAreaView, Image, StyleSheet } from 'react-native';

export default function Agendamento() {
    return (
        <View style={Agendamento_Styles.container}>
            <Top_Bar />
            <Text style={{ color: COLORS.azul_principal, fontSize: 20, alignSelf: 'flex-start' }}>Selecione a data </Text>
            <Calendar style={Agendamento_Styles.calendario}
                theme={{
                    selectedDayBackgroundColor: COLORS.azul_principal,
                    todayTextColor: COLORS.azul_principal,
                    arrowColor: COLORS.azul_principal,
                    textDayFontWeight: 'bold',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 14
                }}
                enableSwipeMonths={true}
                onPress={console.log}

            />

            <View style={Agendamento_Styles.horaios_box}>
                <Text style={{ width: '100%' }}>Horários disponíveis</Text>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>08:00 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>08:30 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>09:00 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>09:30 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>10:00 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>10:30 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>11:00 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>13:30 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Agendamento_Styles.horarios} activeOpacity={0.7}>
                    <Text style={Agendamento_Styles.horarios_texto}>14:00 </Text>
                </TouchableOpacity>
            </View>
            <Image
                source={{ uri: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDNtOWhhZHBycWYxcjJtamwza2ltbGJ3cWc4aWdrMTBnbDdiaDJ2ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XzqEFZ06NSFgXaut2g/giphy.gif' }}
                style={{ width: '100%', height: 180, marginTop: 20 }}
                resizeMode="contain"
            />
            <ACOES />
        </View>
    );
}