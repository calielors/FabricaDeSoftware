import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../../assets/colors/colors';
import { Top_Bar } from '../../components/top_bar';
import { MedicamentosStyles as styles } from './medicamentos_styles';

type Medicamento = { id: string; name: string; info: string };

export default function Medicamentos() {
    const [data, setData] = useState<Medicamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Medicamento[]>([]);

    useEffect(() => {
        const mock: Medicamento[] = [
            { id: '1', name: 'Dipirona', info: 'Analgésico / Dois Vizinhos' },
            { id: '2', name: 'Paracetamol', info: 'Analgésico/antipirético' },
            { id: '3', name: 'Amoxicilina', info: 'Antibiótico' },
        ];
        setTimeout(() => { setData(mock); setLoading(false); }, 500);
    }, []);

    useEffect(() => {
        if (!query) return setResults([]);
        const q = query.toLowerCase();
        setResults(data.filter(d => d.name.toLowerCase().includes(q)));
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

            {/* Top 3 mais procurados - centralizados */}
            <View style={styles.popularContainer}>
                {data.slice(0, 3).map(item => (
                    <TouchableOpacity key={item.id} style={styles.popularItem} activeOpacity={0.8} onPress={() => setQuery(item.name)}>
                        <Text style={styles.popularText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Buscar medicamentos"
                    value={query}
                    onChangeText={setQuery}
                    style={styles.searchInput}
                    accessibilityLabel="Campo de busca de medicamentos"
                />
            </View>

            {/* Resultados */}
            <View style={styles.resultsContainer}>
                {results.length === 0 ? (
                    <Text style={{ textAlign: 'center', color: COLORS.placeholder_text }}>Digite para buscar medicamentos</Text>
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Medicamento ${item.name}`} style={styles.item} activeOpacity={0.8}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemInfo}>{item.info}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </View>
    );
}
