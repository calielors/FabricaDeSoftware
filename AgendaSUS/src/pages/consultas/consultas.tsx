import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Top_Bar } from '../../components/top_bar';
import { COLORS } from '../../assets/colors/colors';
import { Consultas_Styles as styles } from './consultas_styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { formatarData } from '@/src/components/formatar_data';

type Consulta = {
    id: string;
    unidade: string;
    especialista: string;
    date: string;
    hora: string;
    status?: string;
};

export default function Consultas() {
    const [data, setData] = useState<Consulta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<Consulta[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta | null>(null);

    // Função para abrir modal
    const abrirModalCancelar = (consulta: Consulta) => {
        setConsultaSelecionada(consulta);
        setIsVisible(true);
    };

    // Função para confirmar cancelamento
    const confirmarCancelamento = () => {
        console.log("Consulta cancelada:", consultaSelecionada?.id);
        // Aqui você pode atualizar o estado das consultas, remover ou mudar status
        setIsVisible(false);
    };

    useEffect(() => {
        const mock: Consulta[] = [
            { id: '1', unidade: 'UBS Central', especialista: 'Clínico Geral', date: '2025-10-30', hora: '08:30', status: 'Confirmada' },
            { id: '2', unidade: 'UBS São José', especialista: 'Dermatologista', date: '2025-10-31', hora: '09:00' },
            { id: '3', unidade: 'UBS Bela Vista', especialista: 'Cardiologista', date: '2025-10-27', hora: '10:15', status: 'Confirmada' },
            { id: '4', unidade: 'UBS Central', especialista: 'Fisioterapeuta', date: '2025-10-28', hora: '14:00' },
        ];
        const sorted = mock.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setTimeout(() => { setData(sorted); setLoading(false); }, 500);
    }, []);

    if (loading) return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.azul_principal} />
        </View>
    );

    if (error) return (
        <View style={styles.container}>
            <Text style={styles.error}>{error}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Top_Bar />
            <View style={styles.content}>
                <Text style={styles.header}>Consultas — Dois Vizinhos</Text>

                <FlatList
                    data={results.length > 0 ? results : data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                    const disponivel = item.status === "Confirmada";
                        return (
                            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
                                <View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.itemMeta}>Unidade: {item.unidade}</Text>
                                        <Text style={styles.itemMeta}>Especialista: {item.especialista}</Text>
                                        <Text style={styles.itemMeta}>Data: {new Date(item.date).toLocaleDateString('pt-BR')}</Text>
                                        <Text style={styles.itemMeta}>Hora: {item.hora}</Text>
                                    </View>

                                    <View style={styles.statusContainer}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialCommunityIcons
                                                name={disponivel ? "check-circle" : "progress-clock"}
                                                size={20}
                                                color={disponivel ? COLORS.verde : COLORS.laranja}
                                                style={{ marginRight: 4 }}
                                            />
                                            <Text style={[styles.statusText, { color: disponivel ? COLORS.verde : COLORS.laranja }]}>
                                                {disponivel ? "Confirmada" : "Em análise"}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            style={styles.cancelarButton}
                                            onPress={() => abrirModalCancelar(item)}
                                        >
                                            <Text style={{ color: COLORS.branco, fontWeight: '600' }}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhum medicamento encontrado</Text>
                    }
                    style={styles.listContainer}
                />

                {/* Modal de confirmação */}
                <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                            Tem certeza que deseja cancelar a consulta com {consultaSelecionada?.especialista} em {consultaSelecionada ? formatarData(consultaSelecionada.date) : ''}?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: COLORS.verde, padding: 10, borderRadius: 5, minWidth: 80, alignItems: 'center' }}
                                onPress={() => setIsVisible(false)}
                            >
                                <Text style={{ color: COLORS.branco, fontWeight: 'bold' }}>Não</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: COLORS.vermelho, padding: 10, borderRadius: 5, minWidth: 80, alignItems: 'center' }}
                                onPress={confirmarCancelamento}
                            >
                                <Text style={{ color: COLORS.branco, fontWeight: 'bold' }}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    );
}
