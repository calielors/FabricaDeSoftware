import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Top_Bar } from '../../components/top_bar';
import { COLORS } from '../../assets/colors/colors';
import { Historico_Styles as styles } from './historico_styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Consulta = {
    id: string;
    unidade: string;
    especialista: string;
    date: string;
    hora: string;
    status: 'Realizada' | 'Faltou' | 'Cancelada';
};

export default function Consultas() {
    const [data, setData] = useState<Consulta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mock: Consulta[] = [
            { id: '1', unidade: 'UBS Central', especialista: 'Clínico Geral', date: '2025-10-30', hora: '08:30', status: 'Realizada' },
            { id: '2', unidade: 'UBS São José', especialista: 'Dermatologista', date: '2025-10-31', hora: '09:00', status: 'Realizada' },
            { id: '3', unidade: 'UBS Bela Vista', especialista: 'Cardiologista', date: '2025-10-27', hora: '10:15', status: 'Faltou' },
            { id: '4', unidade: 'UBS Central', especialista: 'Fisioterapeuta', date: '2025-10-28', hora: '14:00', status:'Cancelada' },
        ];
        const sorted = mock.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setTimeout(() => { setData(sorted); setLoading(false); }, 500);
    }, []);

    if (loading) return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.azul_principal} />
        </View>
    );

    const getStatusProps = (status: Consulta['status']) => {
        switch (status) {
            case 'Realizada': return { icon: 'check-circle', color: COLORS.verde };
            case 'Faltou': return { icon: 'close-circle', color: COLORS.laranja };
            case 'Cancelada': return { icon: 'cancel', color: COLORS.vermelho };
        }
    };

    return (
        <View style={styles.container}>
            <Top_Bar />
            <View style={styles.content}>
                <Text style={styles.header}>Histórico</Text>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const statusProps = getStatusProps(item.status);
                        return (
                            <TouchableOpacity
                                style={styles.item}
                                activeOpacity={0.8}
                                onPress={() => console.log('Consulta clicada:', item.id)}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemMeta}>Unidade: {item.unidade}</Text>
                                    <Text style={styles.itemMeta}>Especialista: {item.especialista}</Text>
                                    <Text style={styles.itemMeta}>Data: {new Date(item.date).toLocaleDateString('pt-BR')}</Text>
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
                            </TouchableOpacity>
                        );
                    }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhuma consulta encontrada</Text>
                    }
                    style={styles.listContainer}
                />
            </View>
        </View>
    );
}
