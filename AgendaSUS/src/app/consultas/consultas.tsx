import React, { useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Top_Bar } from '../../components/top_bar';
import { COLORS } from '../../assets/colors/colors';
import { Consultas_Styles as styles } from '../../styles/consultas_styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { AuthContext } from '../../contexts/AuthContext';
import { buscarPacientePorAuthId, buscarConsultasPaciente, cancelarConsulta } from '../../services/consultas';
import { useFocusEffect } from '@react-navigation/native';

type Consulta = {
    id: number;
    unidade: string;
    especialista: string;
    date: string;
    hora: string;
};

const formatarData = (dateString: string) => {
    const [ano, mes, dia] = dateString.split('-');
    return `${dia}/${mes}/${ano}`;
};

export default function Consultas() {
    const [data, setData] = useState<Consulta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta | null>(null);
    const [cancelando, setCancelando] = useState(false);

    const { user } = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {
            carregarConsultas();
        }, [user])
    );

    const carregarConsultas = async () => {
        if (!user) {
            setError('Usuário não autenticado');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const { data: paciente, error: erroPaciente } = await buscarPacientePorAuthId(user.id);
            
            if (erroPaciente || !paciente) {
                setError('Não foi possível encontrar seus dados de paciente');
                setLoading(false);
                return;
            }

            const { data: consultas, error: erroConsultas } = await buscarConsultasPaciente(paciente.id);
            
            if (erroConsultas) {
                setError('Erro ao carregar consultas');
                setLoading(false);
                return;
            }

            if (consultas) {
                const agora = new Date();
                
                const consultasFuturas = consultas
                    .filter(c => {
                        const dataConsulta = new Date(c.data_hora);
                        return dataConsulta >= agora && c.status !== 'cancelada';
                    })
                    .map(c => {
                        const [dataParte] = c.data_hora.split('T');
                        
                        const dataHora = new Date(c.data_hora);
                        const hora = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                        
                        // Busca o nome da unidade do objeto retornado pelo JOIN
                        let nomeUnidade = 'UBS';
                        if (c.unidade_saude && typeof c.unidade_saude === 'object') {
                            nomeUnidade = c.unidade_saude.nome;
                        } else if (typeof c.unidade_saude === 'string') {
                            nomeUnidade = c.unidade_saude;
                        }
                        
                        return {
                            id: c.id!,
                            unidade: nomeUnidade,
                            especialista: c.especialidade || 'Consulta Médica',
                            date: dataParte,
                            hora: hora,
                        };
                    })
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                setData(consultasFuturas);
            }
        } finally {
            setLoading(false);
        }
    };

    const abrirModalCancelar = (consulta: Consulta) => {
        setConsultaSelecionada(consulta);
        setIsVisible(true);
    };

    const confirmarCancelamento = async () => {
        if (!consultaSelecionada) return;

        setCancelando(true);

        try {
            const { error } = await cancelarConsulta(consultaSelecionada.id);

            if (error) {
                Alert.alert('Erro', `Não foi possível cancelar a consulta. ${error.message || 'Tente novamente.'}`);
            } else {
                Alert.alert('Sucesso', 'Consulta cancelada com sucesso!');
                setIsVisible(false);
                carregarConsultas();
            }
        } catch (err) {
            Alert.alert('Erro', 'Ocorreu um erro ao cancelar a consulta.');
        } finally {
            setCancelando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Top_Bar />
            <View style={styles.content}>
                <Text style={styles.header}>Consultas — Dois Vizinhos</Text>

                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={COLORS.azul_principal} />
                        <Text style={{ marginTop: 10, color: COLORS.preto, opacity: 0.6 }}>
                            Carregando consultas...
                        </Text>
                    </View>
                ) : error ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemMeta}>Unidade: {item.unidade}</Text>
                                    <Text style={styles.itemMeta}>Especialista: {item.especialista}</Text>
                                    <Text style={styles.itemMeta}>Data: {formatarData(item.date)}</Text>
                                    <Text style={styles.itemMeta}>Hora: {item.hora}</Text>
                                </View>

                                <View style={styles.statusContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialCommunityIcons
                                            name="check-circle"
                                            size={20}
                                            color={COLORS.verde}
                                            style={{ marginRight: 4 }}
                                        />
                                        <Text style={[styles.statusText, { color: COLORS.verde }]}>
                                            Confirmada
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.cancelarButton}
                                        onPress={() => abrirModalCancelar(item)}
                                    >
                                        <Text style={{ color: COLORS.branco, fontWeight: '600' }}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>Nenhuma consulta agendada</Text>
                        }
                        style={styles.listContainer}
                    />
                )}                
                
                <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                            Tem certeza que deseja cancelar a consulta com {consultaSelecionada?.especialista} em {consultaSelecionada ? formatarData(consultaSelecionada.date) : ''}?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: COLORS.vermelho, padding: 10, borderRadius: 5, minWidth: 80, alignItems: 'center' }}
                                onPress={() => setIsVisible(false)}
                                disabled={cancelando}
                            >
                                <Text style={{ color: COLORS.branco, fontWeight: 'bold' }}>Não</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: COLORS.verde, padding: 10, borderRadius: 5, minWidth: 80, alignItems: 'center' }}
                                onPress={confirmarCancelamento}
                                disabled={cancelando}
                            >
                                {cancelando ? (
                                    <ActivityIndicator size="small" color={COLORS.branco} />
                                ) : (
                                    <Text style={{ color: COLORS.branco, fontWeight: 'bold' }}>Sim</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
