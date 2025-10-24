import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Agendamento_Styles } from "./agendamento_styles";
import { COLORS } from "../../assets/colors/colors";
import { Top_Bar } from "../../components/top_bar";
import { Calendar } from "react-native-calendars";

export default function Agendamento() {
    const [day, setDay] = useState('');
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const horarios = [
        '08:00', '08:30', '09:00', '09:30',
        '10:00', '10:30', '11:00', '13:30', '14:00',
        '15:00', '15:30', '16:00', '16:30', '17:00',
        '17:30', '18:00', '18:30', '19:00', '19:30'
    ];

    const today = new Date().toISOString().split('T')[0];

    return (
        <View style={Agendamento_Styles.container}>
            <Top_Bar />

            {/* --------------------------Calendário--------------------------*/}
            <Text
                style={{
                    color: COLORS.azul_principal,
                    paddingLeft: 10,
                    fontSize: 20,
                    alignSelf: 'flex-start',
                    paddingTop: 10
                }}
            >
                Selecione a data
            </Text>

            <Calendar
                style={Agendamento_Styles.calendario}
                markedDates={{
                    [today]: { marked: false, selectedColor: COLORS.verde },
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
                    selectedDayBackgroundColor: COLORS.verde,
                    todayTextColor: COLORS.verde,
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
                disableAllTouchEventsForDisabledDays
                enableSwipeMonths
                onDayPress={(day) => setDay(day.dateString)}
                minDate={new Date().toDateString()}
                hideExtraDays
            />

            {/* -----------------------Horários----------------------- */}
            <View
                style={{
                    position: 'absolute',
                    top: 500,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Text
                    style={{
                        width: '100%',
                        fontSize: 20,
                        paddingLeft: 10,
                        paddingBottom: 10,
                        fontStyle: 'normal',
                    }}
                >
                    Horários disponíveis
                </Text>

                <ScrollView style={[Agendamento_Styles.scroll, { maxHeight: 180 }]}>
                    <View style={Agendamento_Styles.horarios_box}>
                        {horarios.map((hora) => (
                            <TouchableOpacity
                                key={hora}
                                style={[
                                    Agendamento_Styles.horarios,
                                    {
                                        backgroundColor:
                                            selectedTime === hora ? COLORS.azul_principal : 'transparent',
                                    },
                                ]}
                                activeOpacity={0.7}
                                onPress={() => setSelectedTime(hora)}
                            >
                                <Text style={Agendamento_Styles.horarios_texto}>{hora}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* --------------------Botões-------------------- */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    alignItems: 'center',
                    gap: 5,
                }}
            >
                <TouchableOpacity activeOpacity={0.7}>
                    <View
                        style={{
                            backgroundColor: COLORS.azul_principal,
                            width: 250,
                            height: 40,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: COLORS.branco, fontSize: 18, fontWeight: 'bold' }}>
                            Próximo
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7}>
                    <View
                        style={{
                            backgroundColor: COLORS.placeholder_text,
                            width: 250,
                            height: 40,
                            alignItems: 'center',
                            borderRadius: 5,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: COLORS.branco, fontSize: 18, fontWeight: 'bold' }}>
                            Cancelar
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
