import React, { useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Top_Bar } from '../../src/components/top_bar';
import { COLORS } from '../../src/assets/colors/colors';
import { Historico_Styles as styles } from '../../src/styles/historico_styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../src/contexts/AuthContext';
import { buscarPacientePorAuthId, buscarConsultasPaciente } from '../../src/services/consultas';
import { useFocusEffect } from '@react-navigation/native';

type Consulta = {
    id: number;
    unidade: string;
    especialista: string;
    date: string;
    hora: string;
    status: 'Realizada' | 'Faltou' | 'Cancelada';
};

const formatarData = (dateString: string) => {
    const [ano, mes, dia] = dateString.split('-');
    return `${dia}/${mes}/${ano}`;
};

export default function Historico() {
    const [data, setData] = useState<Consulta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { user } = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {
            carregarHistorico();
        }, [user])
    );

    const carregarHistorico = async () => {
        if (!user) {
            setError('Usuário não autenticado');
            setLoading(false);
            return;
        }

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
            setError('Erro ao carregar histórico');
            setLoading(false);
            return;
        }

        if (consultas) {
            const agora = new Date();
            
            const consultasHistorico = consultas
                .filter(c => {
                    const dataConsulta = new Date(c.data_hora);
                    return dataConsulta < agora || c.status === 'cancelada';
                })
                .map(c => {
                    const [dataParte] = c.data_hora.split('T');
                    const dataHora = new Date(c.data_hora);
                    const hora = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    
                    let nomeUnidade = 'UBS';
                    if (c.unidade_saude && typeof c.unidade_saude === 'object') {
                        nomeUnidade = c.unidade_saude.nome;
                    } else if (typeof c.unidade_saude === 'string') {
                        nomeUnidade = c.unidade_saude;
                    }

                    let statusUI: 'Realizada' | 'Faltou' | 'Cancelada' = 'Realizada';
                    if (c.status === 'cancelada') {
                        statusUI = 'Cancelada';
                    } else if (c.status === 'faltou') {
                        statusUI = 'Faltou';
                    }
                    
                    return {
                        id: c.id!,
                        unidade: nomeUnidade,
                        especialista: c.especialidade || 'Consulta Médica',
                        date: dataParte,
                        hora: hora,
                        status: statusUI,
                    };
                })
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setData(consultasHistorico);
        }
        
        setLoading(false);
    };

    const getStatusProps = (status: Consulta['status']) => {
        switch (status) {
            case 'Realizada': return { icon: 'check-circle', color: COLORS.verde };
            case 'Faltou': return { icon: 'close-circle', color: COLORS.laranja };
            case 'Cancelada': return { icon: 'cancel', color: COLORS.vermelho };
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Top_Bar />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.azul_principal} />
                    <Text style={{ marginTop: 10, color: COLORS.preto, opacity: 0.6 }}>
                        Carregando histórico...
                    </Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Top_Bar />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLORS.vermelho, fontSize: 16 }}>{error}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Top_Bar />
            <View style={styles.content}>
                <Text style={styles.header}>Histórico</Text>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const statusProps = getStatusProps(item.status);
                        return (
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
                                            name={statusProps.icon as any}
                                            size={20}
                                            color={statusProps.color}
                                            style={{ marginRight: 4 }}
                                        />
                                        <Text style={[styles.statusText, { color: statusProps.color }]}>
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhuma consulta no histórico</Text>
                    }
                    style={styles.listContainer}
                />
            </View>
        </View>
    );
}
