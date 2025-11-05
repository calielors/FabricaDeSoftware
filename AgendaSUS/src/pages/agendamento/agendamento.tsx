import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Agendamento_Styles } from "./agendamento_styles";
import { COLORS } from "../../assets/colors/colors";
import { Top_Bar } from "../../components/top_bar";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { formatarData } from "@/src/components/formatar_data";

export default function Agendamento() {
    const [day, setDay] = useState('');
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [erro, setErro] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const horarios = [
        '08:00', '08:30', '09:00', '09:30',
        '10:00', '10:30', '11:00', '13:30', '14:00',
        '15:00', '15:30', '16:00', '16:30', '17:00',
        '17:30', '18:00', '18:30', '19:00', '19:30'
    ];

    const abrirModalCancelar = () => {
        if (day && selectedTime) {
            setIsVisible(true);
            setErro(false);
        } else {
            setErro(true); 
        }
    };

    const botaoAtivo = day !== '' && selectedTime !== null;

    return (
        <View style={Agendamento_Styles.container}>
            <Top_Bar />

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
                onDayPress={(day) => setDay(day.dateString)}
                minDate={new Date().toDateString()}
                hideExtraDays
            />

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

            {/* Mensagem de erro em vermelho */}
            {erro && (
                <Text
                    style={{
                        color: COLORS.vermelho,
                        marginTop: 10,
                        textAlign: "center",
                        position: "absolute",
                        bottom: 100,
                        width: "100%",
                    }}
                >
                    Selecione uma data e um horário antes de continuar.
                </Text>
            )}

            {/* Botões */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    alignItems: 'center',
                    gap: 5,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={abrirModalCancelar}
                >
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
                            backgroundColor: COLORS.vermelho_claro,
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

            <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                        Tem certeza que deseja confirmar a consulta para o dia {formatarData(day)} : {selectedTime}?
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: COLORS.vermelho, padding: 10, borderRadius: 5, minWidth: 80, alignItems: 'center' }}
                            onPress={() => setIsVisible(false)}
                        >
                            <Text style={{ color: COLORS.branco, fontWeight: 'bold' }}>Não</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: COLORS.verde, padding: 10, borderRadius: 5, minWidth: 80, alignItems: 'center' }}
                        >
                            <Text style={{ color: COLORS.branco, fontWeight: 'bold' }}>Sim</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
