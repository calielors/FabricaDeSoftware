import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Agendamento_Styles } from "./agendamento_styles";
import { COLORS } from "../../assets/colors/colors";
import ACOES from "../../components/acoes";
import { Top_Bar } from "../../components/top_bar";
import { Calendar } from "react-native-calendars";


export default function Agendamento() {
    {/* Dia selecionado no calendário */ }
    const [day, setDay] = useState('')
    {/* Horario selecionado */ }
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    {/*Horários disponíveis*/ }
    const horarios = [
        '08:00', '08:30', '09:00', '09:30',
        '10:00', '10:30', '11:00', '13:30', '14:00',
        '15:00', '15:30', '16:00', '16:30', '17:00',
        '17:30', '18:00', '18:30', '19:00', '19:30'

    ];
    return (
        <View style={Agendamento_Styles.container}>
            <Top_Bar />
            {/* --------------------------Calendário--------------------------*/}
            <Text style={{ color: COLORS.azul_principal, paddingLeft: 10, fontSize: 20, alignSelf: 'flex-start',paddingTop: 10}}>Selecione a data </Text>
            <Calendar style={Agendamento_Styles.calendario}
                markedDates={{
                    '2025-09-28': { marked: true, selectedColor: COLORS.azul_principal },
                    [day]: { selected: true, selectedColor: COLORS.azul_principal }
                }}
                headerStyle={{
                    backgroundColor: 'transparent',
                    borderBottomColor: COLORS.placeholder_text,
                    borderBottomWidth: 1,
                }}

                theme={{
                    textSectionTitleColor: COLORS.preto,
                    monthTextColor: COLORS.preto,
                    selectedDayBackgroundColor: COLORS.azul_principal,
                    todayTextColor: COLORS.azul_principal,
                    arrowColor: COLORS.azul_principal,
                    textDayFontWeight: 'bold',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 14,
                    calendarBackground: 'transparent',
                    textDisabledColor: COLORS.placeholder_text,

                }}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
                onDayPress={(day) => {
                    console.log(day);
                    setDay(day.dateString);
                }}

                minDate={new Date().toDateString()}
                hideExtraDays
            />
            {/*------------------------------Horários------------------------*/}
            <View style={{ position: 'absolute', bottom: 85, alignItems: 'center', width: '100%' }}>
                <Text style={{ width: '100%', fontSize: 20, paddingLeft: 10, paddingBottom: 10,fontStyle:'normal' }}>Horários disponíveis </Text>
                <ScrollView style={Agendamento_Styles.scroll}>
                    <View style={Agendamento_Styles.horaios_box}>
                        {horarios.map((hora) => (
                            <TouchableOpacity
                                key={hora}
                                style={[
                                    Agendamento_Styles.horarios,
                                    { backgroundColor: selectedTime === hora ? COLORS.azul_principal : 'transparent' }
                                ]}
                                activeOpacity={0.7}
                                onPress={() => setSelectedTime(hora)}>
                                <Text style={Agendamento_Styles.horarios_texto}>{hora}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/*--------------------------Botões Próximo e Cancelar----------------------------*/}
                <View>
                    <TouchableOpacity activeOpacity={0.7} style={{ paddingTop: 10 }}>
                        <View style={{
                            backgroundColor: COLORS.azul_principal,
                            width: 250,
                            height: 35,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ color: COLORS.branco, fontSize: 18, fontWeight: 'bold' }}>Próximo</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View style={{
                            backgroundColor: COLORS.placeholder_text,
                            width: 250,
                            height: 35,
                            alignItems: 'center',
                            borderRadius: 5,
                            justifyContent: 'center',
                        }}>
                            <Text style={{ color: COLORS.branco, fontSize: 18, fontWeight: 'bold' }}>Cancelar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ACOES />
        </View>
    );
}