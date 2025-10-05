import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Top_Bar } from '../../components/top_bar';
import { COLORS } from '../../assets/colors/colors';
import { ConsultasStyles as styles } from './consultas_styles';

type Consulta = {
    id: string;
    title: string;
    date: string;
};

export default function Consultas() {
    const [data, setData] = useState<Consulta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const mock: Consulta[] = [
            { id: '1', title: 'Consulta médica - Dr. Silva', date: '2025-10-10 09:00 — Dois Vizinhos' },
            { id: '2', title: 'Vacinação - Unidade Básica', date: '2025-10-12 14:30 — Dois Vizinhos' },
            { id: '3', title: 'Retorno - Cardiologia', date: '2025-11-01 11:00 — Dois Vizinhos' },
        ];
        let mounted = true;
        setTimeout(() => {
            if (mounted) {
                setData(mock);
                setLoading(false);
            }
        }, 700);
        return () => { mounted = false; };
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
            <Text style={styles.header}>Consultas — Dois Vizinhos</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemMeta}>{item.date}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>Nenhuma consulta encontrada</Text>}
            />
        </View>
    );
}

