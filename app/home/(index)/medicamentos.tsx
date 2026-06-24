import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput as PaperInput } from "react-native-paper";
import { Medicamentos_Styles } from '../../../src/styles/home/servicos/medicamentos_styles';
import { buscarMedicamentosApi } from '../../../src/services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../../src/contexts/ThemeContext';
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useQuery } from '@/src/services/useQuery';
import { cacheManager } from '@/src/services/cache';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type Medicamento = {
  id: string;
  name: string;
  dose_mg: string;
  dose_num: string;
  quantidade?: number;
  hospital: string;
};

export default function Medicamentos() {
  const { theme } = useTheme();
  const styles = Medicamentos_Styles(theme);
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'unidade' | 'dosagem'>('unidade');

  const [buscaUnidadeFiltro, setBuscaUnidadeFiltro] = useState('');

  const [unidadeTemp, setUnidadeTemp] = useState<string | null>(null);
  const [dosagemTemp, setDosagemTemp] = useState<string | null>(null);
  const [unidadeAplicada, setUnidadeAplicada] = useState<string | null>(null);
  const [dosagemAplicada, setDosagemAplicada] = useState<string | null>(null);

  const [results, setResults] = useState<Medicamento[]>([]);

  // === BUSCA COM USEQUERY (CACHE + API) ===
  const { data: fetchedData, loading, error, refresh } = useQuery<Medicamento[]>(async () => {
    try {
      const { data: medicamentosData, error: medicError } = await buscarMedicamentosApi();

      if (medicError) return { data: [], error: 'Erro ao carregar medicamentos' };

      if (medicamentosData) {
        const medicamentosArray = (medicamentosData || []) as any[];
        const mappedData: Medicamento[] = medicamentosArray.map((item: any, index: number) => ({
          id: `${item.id_medicamento}-${index}`,
          name: item.medicamento?.nome || item.nome || 'Desconhecido',
          dose_mg: `${item.medicamento?.dose_mg || item.dose_mg || 0}mg`,
          dose_num: `${item.medicamento?.dose_mg || item.dose_mg || 0}mg`,
          quantidade: item.unidades_disponiveis,
          hospital: item.unidade_saude?.nome || item.hospital || 'Desconhecido',
        }));
        return { data: mappedData, error: null };
      }
      
      return { data: [], error: null };
    } catch (err: any) {
      return { data: [], error: 'Erro inesperado ao buscar dados.' };
    }
  }, [], 'medicamentos-lista', undefined);

  const medicamentos = fetchedData || [];
  const unidadesDisponiveis = Array.from(new Set(medicamentos.map(item => item.hospital)));
  const dosagensDisponiveis = Array.from(new Set(medicamentos.map(item => item.dose_num))).sort();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const temCache = cacheManager.get('medicamentos-lista');
      if (!temCache) {
        refresh();
      }
    }, [])
  );

  useEffect(() => {
    let filtrados = medicamentos;

    if (unidadeAplicada) {
      filtrados = filtrados.filter(item => item.hospital === unidadeAplicada);
    }

    if (dosagemAplicada) {
      filtrados = filtrados.filter(item => item.dose_num === dosagemAplicada);
    }

    if (query) {
      const qNormalizado = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      filtrados = filtrados.filter(d => {
        const nomeNormalizado = d.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return nomeNormalizado.includes(qNormalizado);
      });
      setResults(filtrados);
    } else {
      setResults(filtrados);
    }
  }, [query, unidadeAplicada, dosagemAplicada, medicamentos]);

  const maisBuscados = medicamentos.slice(0, 3);
  const exibirResultados = query || unidadeAplicada || dosagemAplicada;
  const dadosParaExibir = exibirResultados ? results : maisBuscados;

  const unidadesFiltradasNoModal = unidadesDisponiveis.filter(u => {
    const uNorm = u.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const buscaNorm = buscaUnidadeFiltro.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return uNorm.includes(buscaNorm);
  });

  const abrirFiltroNaAba = (aba: 'unidade' | 'dosagem') => {
    setUnidadeTemp(unidadeAplicada);
    setDosagemTemp(dosagemAplicada);
    setBuscaUnidadeFiltro('');
    setAbaAtiva(aba);
    setIsModalVisible(true);
  };

  const aplicarFiltros = () => {
    setUnidadeAplicada(unidadeTemp);
    setDosagemAplicada(dosagemTemp);
    setIsModalVisible(false);
  };

  const limparFiltros = () => {
    setUnidadeTemp(null);
    setDosagemTemp(null);
    setUnidadeAplicada(null);
    setDosagemAplicada(null);
    setBuscaUnidadeFiltro('');
    setIsModalVisible(false);
  };

  const renderMedicamentoCard = (item: Medicamento) => {
    const disponivel = item.quantidade && item.quantidade > 0;
    return (
      <View style={styles.content}>
        <TouchableOpacity accessibilityRole="button" style={styles.item} activeOpacity={0.8}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 4 }}>
            <Text style={styles.itemName}>{item.name} - {item.dose_mg}</Text>
            <View style={styles.statusContainer}>
              <Text style={[styles.statusText, { color: disponivel ? theme.success : theme.warning }]}>
                {disponivel ? "Disponível" : "Indisponível"}
              </Text>
              <MaterialCommunityIcons
                name={disponivel ? "check-circle" : "close-circle"}
                size={18}
                color={disponivel ? theme.success : theme.warning}
                style={{ marginLeft: 4 }}
              />
            </View>
            <Text style={styles.unidadeName}>Unidade: {item.hospital}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]} edges={['bottom']}>
      <FlatList
        data={!loading && !error ? dadosParaExibir : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        refreshControl={
            <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[theme.primary, theme.success]}
                progressBackgroundColor={theme.background}
                tintColor={theme.primary}
            />
        }
        ListHeaderComponent={
          <>
            {/* 1. Header (Igual ao Histórico) */}
            <View style={styles.content}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                  <TouchableOpacity
                      onPress={() => router.back()}
                      style={{ marginRight: 10, padding: 5, marginTop: 16 }}
                  >
                      <FontAwesome5 name="arrow-left" size={20} color={theme.primary} />
                  </TouchableOpacity>
                  <Text style={[styles.header, { marginTop: 16 }]}>Medicamentos</Text>
              </View>
            </View>

            {/* 2. Barra de Busca */}
            <View style={{ paddingHorizontal: '4%', marginBottom: 12 }}>
              <PaperInput
                mode="outlined"
                label="Buscar medicamento"
                value={query}
                onChangeText={setQuery}
                placeholder="Ex: Amoxicilina, Dipirona..."
                placeholderTextColor={theme.placeholder}
                activeOutlineColor={theme.primary}
                style={styles.buscaNativaDestacada}
                outlineStyle={{ borderRadius: 6, borderWidth: 1 }}
                textColor={theme.text}
                contentStyle={{ paddingHorizontal: 15, fontSize: 16 }}
                theme={{ colors: { text: theme.text } }}
                left={<PaperInput.Icon icon={() => <MaterialCommunityIcons name="magnify" size={22} color={theme.placeholder} />} />}
              />
            </View>

            {/* 3. Barra de Filtros */}
            <View style={styles.containerBarraFiltro}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollFiltro}
                contentContainerStyle={styles.scrollContentFiltro}
              >
                <TouchableOpacity style={styles.botaoFiltroScroll} onPress={() => abrirFiltroNaAba('unidade')} activeOpacity={0.7}>
                  <Text style={[unidadeAplicada !== null ? styles.textFiltroMLAtivo : styles.textFiltroML]}>
                    {unidadeAplicada ? `UBS: ${unidadeAplicada} ▾` : 'Unidade de Saúde ▾'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.divisorScroll} />

                <TouchableOpacity style={styles.botaoFiltroScroll} onPress={() => abrirFiltroNaAba('dosagem')} activeOpacity={0.7}>
                  <Text style={[dosagemAplicada !== null ? styles.textFiltroMLAtivo : styles.textFiltroML]}>
                    {dosagemAplicada ? `Dose: ${dosagemAplicada} ▾` : 'Dosagem (mg) ▾'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>

              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.background }}>
                <View style={styles.divisorEstatico} />
                <TouchableOpacity style={styles.botaoFiltroEstatico} onPress={() => abrirFiltroNaAba('unidade')} activeOpacity={0.7}>
                  <MaterialCommunityIcons name="tune" size={16} color={(unidadeAplicada || dosagemAplicada) ? theme.primary : theme.text} style={{ marginRight: 6 }} />
                  <Text style={[(unidadeAplicada || dosagemAplicada) ? styles.textFiltroMLAtivo : styles.textFiltroML]}>Filtros</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 4. Loading e Erro */}
            {loading && !isRefreshing && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <ActivityIndicator size="large" color={theme.primary} />
                    <Text style={{ marginTop: 10, color: theme.text, opacity: 0.6 }}>Carregando medicamentos...</Text>
                </View>
            )}

            {error && !loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ color: theme.danger, fontSize: 16 }}>{error}</Text>
                </View>
            )}

            {/* 5. Título dos Destaques (Apenas se não estiver buscando/filtrando) */}
            {!loading && !error && !exibirResultados && medicamentos.length > 0 && (
              <Text style={[styles.header, { fontSize: 16, textAlign: 'left', marginHorizontal: 15, marginBottom: 15, marginTop: 5 }]}>
                Destaques
              </Text>
            )}
          </>
        }
        renderItem={({ item }) => renderMedicamentoCard(item)}
        ListEmptyComponent={
            (!loading && !error) ? <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text> : null
        }
      />

      {/* MODAL DE FILTROS (Mantido fora da FlatList) */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{ margin: 0, justifyContent: 'flex-end' }}
        animationIn="slideInUp"
        useNativeDriver
      >
        <View style={{ backgroundColor: theme.background, padding: 24, borderTopLeftRadius: 16, borderTopRightRadius: 16, height: SCREEN_HEIGHT * 0.70 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: theme.text }}>Filtros</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <MaterialCommunityIcons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Abas Superiores Clean */}
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: theme.placeholder + '30', marginBottom: 20 }}>
            <TouchableOpacity
              style={[{ paddingBottom: 12, flex: 1, alignItems: 'center' }, abaAtiva === 'unidade' && { borderBottomWidth: 2, borderBottomColor: theme.primary }]}
              onPress={() => setAbaAtiva('unidade')}
            >
              <Text style={{ fontSize: 15, fontWeight: abaAtiva === 'unidade' ? '700' : '500', color: abaAtiva === 'unidade' ? theme.primary : theme.placeholder }}>Unidades</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{ paddingBottom: 12, flex: 1, alignItems: 'center' }, abaAtiva === 'dosagem' && { borderBottomWidth: 2, borderBottomColor: theme.primary }]}
              onPress={() => setAbaAtiva('dosagem')}
            >
              <Text style={{ fontSize: 15, fontWeight: abaAtiva === 'dosagem' ? '700' : '500', color: abaAtiva === 'dosagem' ? theme.primary : theme.placeholder }}>Dosagens</Text>
            </TouchableOpacity>
          </View>

          {/* Área de Conteúdo Flexível */}
          <View style={{ flex: 1, marginBottom: 15 }}>

            {abaAtiva === 'unidade' && (
              <FlatList
                data={unidadesFiltradasNoModal}
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <PaperInput
                    mode="outlined"
                    placeholder="Pesquisar unidade..."
                    value={buscaUnidadeFiltro}
                    onChangeText={setBuscaUnidadeFiltro}
                    placeholderTextColor={theme.placeholder}
                    activeOutlineColor={theme.primary}
                    textColor={theme.text}
                    style={{ height: 44, marginBottom: 15, backgroundColor: theme.card }}
                    outlineStyle={{ borderRadius: 6, borderWidth: 1 }}
                    theme={{ colors: { text: theme.text } }}
                    left={<PaperInput.Icon icon={() => <MaterialCommunityIcons name="magnify" size={20} color={theme.placeholder} />} />}
                  />
                }
                renderItem={({ item: u }) => {
                  const itemSelecionado = unidadeTemp === u;
                  return (
                    <TouchableOpacity
                      style={styles.opcaoFiltroLinhaCustom}
                      onPress={() => setUnidadeTemp(itemSelecionado ? null : u)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.textOpcaoLinhaCustom, itemSelecionado && { color: theme.primary, fontWeight: '700' }]}>
                        {u}
                      </Text>
                      {itemSelecionado && (
                        <MaterialCommunityIcons name="check" size={20} color={theme.primary} />
                      )}
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={
                  <Text style={{ textAlign: 'center', color: theme.placeholder, marginTop: 20 }}>
                    Nenhuma unidade encontrada.
                  </Text>
                }
              />
            )}

            {abaAtiva === 'dosagem' && (
              <FlatList
                data={dosagensDisponiveis}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: d }) => {
                  const itemSelecionado = dosagemTemp === d;
                  return (
                    <TouchableOpacity
                      style={styles.opcaoFiltroLinhaCustom}
                      onPress={() => setDosagemTemp(itemSelecionado ? null : d)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.textOpcaoLinhaCustom, itemSelecionado && { color: theme.primary, fontWeight: '700' }]}>
                        {d}
                      </Text>
                      {itemSelecionado && (
                        <MaterialCommunityIcons name="check" size={20} color={theme.primary} />
                      )}
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={
                  <Text style={{ textAlign: 'center', color: theme.placeholder, marginTop: 20 }}>
                    Nenhuma dosagem encontrada.
                  </Text>
                }
              />
            )}

          </View>

          {/* Botões de Ação */}
          <View style={{ flexDirection: 'row', gap: 12, borderTopWidth: 1, borderColor: theme.placeholder + '20', paddingTop: 20 }}>
            <TouchableOpacity
              style={{ flex: 1, paddingVertical: 14, borderRadius: 6, borderWidth: 1, borderColor: theme.placeholder + '50', alignItems: 'center' }}
              onPress={limparFiltros}
              activeOpacity={0.8}
            >
              <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16 }}>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, paddingVertical: 14, borderRadius: 6, backgroundColor: theme.primary, alignItems: 'center' }}
              onPress={aplicarFiltros}
              activeOpacity={0.8}
            >
              <Text style={{ color: theme.text, fontWeight: '700', fontSize: 16 }}>Aplicar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

    </SafeAreaView>
  );
}