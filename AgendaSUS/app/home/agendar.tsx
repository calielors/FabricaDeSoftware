import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Agendamento_Styles } from "../../src/styles/agendamento_styles";
import { Top_Bar } from "../../src/components/top_bar";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { AuthContext } from "../../src/contexts/AuthContext";
import { criarConsulta, buscarPacientePorAuthId, combinarDataHora, buscarHorariosOcupados, buscarUnidadesSaude, UnidadeSaude } from "../../src/services/consultas";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import Modal from "react-native-modal";
import { useTheme } from "../../src/contexts/ThemeContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Configurar calendário em português
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function Agendamento() {
    const { theme } = useTheme();
    const styles = Agendamento_Styles(theme);
    const [day, setDay] = useState('');
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [unidadeSelecionada, setUnidadeSelecionada] = useState<UnidadeSaude | null>(null);
    const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);
    const [loadingHorarios, setLoadingHorarios] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [unidades, setUnidades] = useState<UnidadeSaude[]>([]);
    const [loadingUnidades, setLoadingUnidades] = useState(false);

    const { user } = useContext(AuthContext);
    const router = useRouter();
    const params = useLocalSearchParams();

    const todosHorarios = [
        '08:00', '08:30', '09:00', '09:30',
        '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30'
    ];

    useFocusEffect(
        React.useCallback(() => {
            const unidadeSelecionada = params?.unidadeSelecionada as UnidadeSaude | undefined;

            if (unidadeSelecionada) {
                // Veio unidade por parâmetro da home
                setUnidadeSelecionada(unidadeSelecionada);
            } else {
                // Não veio unidade - limpa tudo e abre modal
                setUnidadeSelecionada(null);
                setDay('');
                setSelectedTime(null);
                setHorariosDisponiveis([]);

                // Pequeno delay para garantir que a tela foi montada
                setTimeout(() => {
                    abrirModalUnidades();
                }, 100);
            }
        }, [])
    );

    useEffect(() => {
        if (day && unidadeSelecionada) {
            carregarHorariosDisponiveis();
        } else if (day) {
            setHorariosDisponiveis(todosHorarios);
        } else {
            setHorariosDisponiveis([]);
        }
    }, [day, unidadeSelecionada]);

    const carregarHorariosDisponiveis = async () => {
        if (!day) return;

        setLoadingHorarios(true);

        const horariosOcupados = await buscarHorariosOcupados(day, unidadeSelecionada?.id);

        // Filtrar horários ocupados
        let disponiveis = todosHorarios.filter(horario => !horariosOcupados.includes(horario));

        const now = new Date();
        if (day === today) {
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            disponiveis = disponiveis.filter(horario => {
                const [h, m] = horario.split(":").map(Number);
                const horarioMin = h * 60 + m;
                return horarioMin > currentMinutes;
            });
        }

        setHorariosDisponiveis(disponiveis);
        setLoadingHorarios(false);

        // Se o horário selecionado ficou indisponível, limpar
        if (selectedTime && horariosOcupados.includes(selectedTime)) {
            setSelectedTime(null);
        }
    };


    const abrirModalUnidades = async () => {
        setModalVisible(true);
        setLoadingUnidades(true);

        const { data } = await buscarUnidadesSaude();

        if (data) {
            setUnidades(data);
        } else {
            setUnidades([]);
        }

        setLoadingUnidades(false);
    };

    const selecionarUnidade = (unidade: UnidadeSaude) => {
        setUnidadeSelecionada(unidade);
        setModalVisible(false);
    };

    const fecharModalSemSelecionar = () => {
        if (!unidadeSelecionada) {
            Alert.alert(
                'Atenção',
                'Você precisa selecionar uma unidade de saúde para agendar uma consulta.',
                [
                    {
                        text: 'Selecionar',
                        onPress: () => setModalVisible(true),
                    },
                    {
                        text: 'Voltar',
                        onPress: () => router.back(),
                        style: 'cancel',
                    },
                ]
            );
        } else {
            setModalVisible(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const handleAgendarConsulta = async () => {
        if (!user) {
            Alert.alert('Erro', 'Você precisa estar logado para agendar uma consulta');
            return;
        }

        if (!unidadeSelecionada) {
            Alert.alert('Atenção', 'Por favor, selecione uma unidade de saúde', [
                {
                    text: 'Selecionar',
                    onPress: () => setModalVisible(true),
                }
            ]);
            return;
        }

        if (!day) {
            Alert.alert('Atenção', 'Por favor, selecione uma data para a consulta');
            return;
        }

        if (!selectedTime) {
            Alert.alert('Atenção', 'Por favor, selecione um horário para a consulta');
            return;
        }

        setLoading(true);

        try {
            const { data: paciente, error: erroPaciente } = await buscarPacientePorAuthId(user.id);

            if (erroPaciente || !paciente) {
                Alert.alert('Erro', 'Não foi possível encontrar seus dados de paciente. Por favor, complete seu cadastro.');
                setLoading(false);
                return;
            }

            const dataHora = combinarDataHora(day, selectedTime);

            const { error } = await criarConsulta({
                paciente_id: paciente.id,
                unidade_saude_id: unidadeSelecionada?.id,
                data_hora: dataHora,
                status: 'agendada',
            });

            if (error) {
                Alert.alert('Erro', `Não foi possível agendar a consulta. ${error.message || 'Tente novamente.'}`);
                setLoading(false);
                return;
            }

            Alert.alert(
                'Consulta Agendada!',
                `Sua consulta foi agendada com sucesso${unidadeSelecionada ? ` na ${unidadeSelecionada.nome}` : ''} para ${formatarData(day)} às ${selectedTime}.`,
                [{
                    text: 'OK',
                    onPress: () => {
                        setDay('');
                        setSelectedTime(null);
                        setUnidadeSelecionada(null);
                        router.back();
                    }
                }]
            );
        } catch (err) {
            Alert.alert('Erro', 'Ocorreu um erro inesperado. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const formatarData = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleCancelar = () => {
        setDay('');
        setSelectedTime(null);
        router.back();
    };

    return (
        <View style={styles.container}>
            <Top_Bar />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10 }}>
                <TouchableOpacity
                    onPress={() => router.push('/home')}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 10,
                        paddingVertical: 5
                    }}
                >
                    <MaterialCommunityIcons name="arrow-left" size={24} color={theme.primary} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>Agendar Consulta</Text>
            </View>
            <ScrollView
                style={{ flex: 1, width: '100%' }}
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {unidadeSelecionada && (
                    <View style={{
                        backgroundColor: theme.primary,
                        padding: 10,
                        marginHorizontal: 10,
                        marginTop: 10,
                        marginBottom: 5,
                        borderRadius: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: theme.background, fontSize: 12, fontWeight: '600' }}>
                                Unidade Selecionada:
                            </Text>
                            <Text style={{ color: theme.background, fontSize: 14, fontWeight: 'bold', marginTop: 3 }}>
                                {unidadeSelecionada.nome}
                            </Text>
                            {unidadeSelecionada.endereco && (
                                <Text style={{ color: theme.background, fontSize: 11, marginTop: 2 }}>
                                    {unidadeSelecionada.endereco}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={abrirModalUnidades}
                            style={{
                                backgroundColor: theme.background,
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ color: theme.primary, fontSize: 12, fontWeight: 'bold' }}>
                                Trocar
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Text style={{
                    color: theme.primary,
                    paddingLeft: 10,
                    fontSize: 18,
                    alignSelf: 'flex-start',
                    paddingTop: 10,
                    fontWeight: '600',
                }}>
                    Selecione a data
                </Text>

                <Calendar
                    style={styles.calendario}
                    markedDates={{
                        [today]: { marked: false, selectedColor: theme.success },
                        [day]: { selected: true, selectedColor: theme.primary }
                    }}
                    headerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomColor: theme.placeholder,
                        borderBottomWidth: 1,
                    }}
                    theme={{
                        textSectionTitleColor: theme.text,
                        monthTextColor: theme.text,
                        selectedDayBackgroundColor: theme.success,
                        todayTextColor: theme.success,
                        arrowColor: theme.primary,
                        textDayFontWeight: 'bold',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: 'bold',
                        dayTextColor: theme.text,
                        textDayFontSize: 14,
                        textMonthFontSize: 18,
                        textDayHeaderFontSize: 12,
                        calendarBackground: 'transparent',
                        textDisabledColor: theme.placeholder,
                    }}
                    disableAllTouchEventsForDisabledDays
                    enableSwipeMonths
                    onDayPress={(day) => setDay(day.dateString)}
                    minDate={today}
                    hideExtraDays
                />

                <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
                    <Text style={{
                        fontSize: 18,
                        color: theme.primary,
                        fontWeight: '600',
                        marginBottom: 10,
                    }}>
                        Horários disponíveis {day && `(${horariosDisponiveis.length})`}
                    </Text>

                    {loadingHorarios ? (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={theme.primary} />
                            <Text style={{ marginTop: 10, color: theme.text }}>
                                Carregando horários...
                            </Text>
                        </View>
                    ) : horariosDisponiveis.length === 0 && day ? (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <Text style={{ color: theme.danger, textAlign: 'center', fontWeight: '600' }}>
                                Nenhum horário disponível para esta data
                            </Text>
                            <Text style={{ color: theme.placeholder, textAlign: 'center', marginTop: 5, fontSize: 12 }}>
                                Tente outra data
                            </Text>
                        </View>
                    ) : !day ? (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <Text style={{ color: theme.placeholder, textAlign: 'center' }}>
                                Selecione uma data para ver os horários
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.horarios_box}>
                            {horariosDisponiveis.map((hora: string) => (
                                <TouchableOpacity
                                    key={hora}
                                    style={[
                                        styles.horarios,
                                        {
                                            backgroundColor: selectedTime === hora
                                                ? theme.primary
                                                : 'transparent',
                                        },
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() => setSelectedTime(hora)}
                                >
                                    <Text style={styles.horarios_texto}>{hora}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: theme.background,
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderTopWidth: 1,
                borderTopColor: theme.placeholder,
                gap: 8,
            }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleAgendarConsulta}
                    disabled={loading || !day || !selectedTime}
                >
                    <View style={{
                        backgroundColor: loading || !day || !selectedTime
                            ? theme.placeholder
                            : theme.primary,
                        width: '100%',
                        height: 45,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{ color: theme.background, fontSize: 16, fontWeight: 'bold' }}>
                            {loading ? 'Agendando...' : 'Agendar Consulta'}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleCancelar}
                    disabled={loading}
                >
                    <View style={{
                        backgroundColor: theme.background,
                        borderWidth: 1,
                        borderColor: theme.placeholder,
                        width: '100%',
                        height: 45,
                        alignItems: 'center',
                        borderRadius: 8,
                        justifyContent: 'center',
                    }}>
                        <Text style={{ color: theme.text, fontSize: 16, fontWeight: 'bold' }}>
                            Cancelar
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={modalVisible}
                onBackdropPress={fecharModalSemSelecionar}
                onBackButtonPress={fecharModalSemSelecionar}
            >
                <View style={{ backgroundColor: theme.background, padding: 20, borderRadius: 10, maxHeight: '80%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: theme.primary }}>
                        Selecione a Unidade de Saúde
                    </Text>

                    {loadingUnidades ? (
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={theme.primary} />
                            <Text style={{ marginTop: 10, color: theme.text }}>Carregando unidades...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={unidades}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        padding: 15,
                                        borderBottomWidth: 1,
                                        borderBottomColor: theme.placeholder,
                                    }}
                                    onPress={() => selecionarUnidade(item)}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text }}>
                                        {item.nome}
                                    </Text>
                                    {item.endereco && (
                                        <Text style={{ fontSize: 14, color: theme.placeholder, marginTop: 5 }}>
                                            {item.endereco}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <Text style={{ textAlign: 'center', padding: 20, color: theme.placeholder }}>
                                    Nenhuma unidade disponível
                                </Text>
                            }
                        />
                    )}

                    <TouchableOpacity
                        style={{
                            backgroundColor: theme.danger,
                            padding: 12,
                            borderRadius: 5,
                            alignItems: 'center',
                            marginTop: 15,
                        }}
                        onPress={fecharModalSemSelecionar}
                    >
                        <Text style={{ color: theme.background, fontWeight: 'bold', fontSize: 16 }}>
                            {unidadeSelecionada ? 'Fechar' : 'Voltar'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}