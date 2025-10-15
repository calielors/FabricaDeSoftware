import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../../assets/colors/colors';
import { Top_Bar } from '../../components/top_bar';
import { Medicamentos_Styles as styles } from './medicamentos_styles';
import { CampoPesquisa } from '../../components/campo_pesquisa';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Medicamento = { id: string; name: string; info: string;quntidade?: number };

export default function Medicamentos() {
    const [data, setData] = useState<Medicamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Medicamento[]>([]);

    useEffect(() => {
        const mock: Medicamento[] = [
            { id: '1', name: 'Dipirona', info: 'Analgésico / Dois Vizinhos', quntidade: 20 },
            { id: '2', name: 'Paracetamol', info: 'Analgésico/antipirético', quntidade: 0 },
            { id: '3', name: 'Amoxicilina', info: 'Antibiótico', quntidade: 10 },
            { id: '4', name: 'Amoxicilina', info: 'Antibiótico', quntidade: 10 },
            { id: '5', name: 'Amoxicilina', info: 'Antibiótico', quntidade: 10 },
            { id: '6', name: 'Amoxicilina', info: 'Antibiótico', quntidade: 10 },
            { id: '7', name: 'Amoxicilina', info: 'Antibiótico', quntidade: 10 },
            { id: '8', name: 'Amoxicilina', info: 'Antibiótico', quntidade: 0 },
        ];
        setTimeout(() => { setData(mock); setLoading(false); }, 500);
    }, []);

    useEffect(() => {
        if (!query) return setResults([]);
        const q = query.toLowerCase();
        setResults(data.filter(d => d.name.toLowerCase().startsWith(q)));
    }, [query, data]);

    if (loading) return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.azul_principal} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Top_Bar />
            <Text style={styles.title}>Medicamentos</Text>

            {/* Search */}
            <CampoPesquisa
                label="Buscar Medicamento"
                query={query}
                setQuery={setQuery}
                placeholder="Digite o nome do medicamento"
            />


            {/* Resultados */}
            <FlatList
                data={results.length > 0 ? results : data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                const disponivel = item.quntidade && item.quntidade > 0;
                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityLabel={`Medicamento ${item.name}`}
                            style={styles.item}
                            activeOpacity={0.8}
                        >
                            <View style={styles.itemRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemInfo}>{item.info}</Text>
                                </View>

                                <View style={styles.statusContainer}>
                                    <MaterialCommunityIcons
                                        name={disponivel ? "check-circle" : "close-circle"}
                                        size={20}
                                        color={disponivel ? COLORS.verde : COLORS.laranja}
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text style={[styles.statusText, { color: disponivel ? COLORS.verde : COLORS.laranja }]}>
                                        {disponivel ? "Disponível" : "Indisponível"}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum medicamento encontrado</Text>
                }
                style={styles.resultsContainer}
            />
        </View>
    );
}
