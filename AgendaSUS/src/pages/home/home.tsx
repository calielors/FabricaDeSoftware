import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Home_Styles } from "./home_styles";
import { COLORS } from "../../assets/colors/colors";
import { Top_Bar } from "../../components/top_bar";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import { buscarPacientePorAuthId, buscarConsultasPaciente } from '../../services/consultas';

interface Consulta {
    data: string;
    hora: string;
    especialidade?: string;
    local?: string;
    status: string;
}

export default function Home() {
    const navigation: any = useNavigation();
    const { user } = useContext(AuthContext);

    const dataAtual = (() => {
        const hoje = new Date();
        const dataFormatada = hoje.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    })();

    const [consulta, setConsulta] = useState<Consulta | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            carregarProximaConsulta();
        }, [user])
    );

    const carregarProximaConsulta = async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        try {
            const { data: paciente } = await buscarPacientePorAuthId(user.id);
            
            if (!paciente) {
                setLoading(false);
                return;
            }

            const { data: consultas } = await buscarConsultasPaciente(paciente.id);
            
            if (consultas && consultas.length > 0) {
                const agora = new Date();
                
                const proximaConsulta = consultas
                    .filter(c => {
                        const dataConsulta = new Date(c.data_hora);
                        return dataConsulta >= agora && c.status === 'agendada';
                    })
                    .sort((a, b) => {
                        return new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime();
                    })[0];

                if (proximaConsulta) {
                    const [dataParte, horaParte] = proximaConsulta.data_hora.split('T');
                    const [ano, mes, dia] = dataParte.split('-');
                    const dataFormatada = `${dia}/${mes}/${ano}`;
                    
                    const dataHora = new Date(proximaConsulta.data_hora);
                    const hora = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    
                    // Busca o nome da unidade do objeto retornado pelo JOIN
                    let nomeUnidade = 'UBS';
                    if (proximaConsulta.unidade_saude && typeof proximaConsulta.unidade_saude === 'object') {
                        nomeUnidade = proximaConsulta.unidade_saude.nome;
                    } else if (typeof proximaConsulta.unidade_saude === 'string') {
                        nomeUnidade = proximaConsulta.unidade_saude;
                    }
                    
                    setConsulta({
                        data: dataFormatada,
                        hora: hora + 'H',
                        especialidade: proximaConsulta.especialidade || 'Consulta Médica',
                        local: nomeUnidade,
                        status: proximaConsulta.status === 'agendada' ? 'Confirmada' : proximaConsulta.status || 'Agendada',
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={Home_Styles.container}>
            <Top_Bar />
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                {/* Saudação */}
                <View style={Home_Styles.header_box}>
                    <Text style={Home_Styles.titulo}>Olá, {user?.nome || "Usuário"}!</Text>
                    <Text style={Home_Styles.data}>{dataAtual}</Text>
                </View>

                {/* Próxima consulta */}
                {loading ? (
                    <View style={Home_Styles.consulta_box}>
                        <ActivityIndicator size="large" color={COLORS.azul_principal} />
                        <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.preto }}>
                            Carregando consultas...
                        </Text>
                    </View>
                ) : consulta ? (
                    <View style={Home_Styles.consulta_box}>
                        <View style={Home_Styles.consulta_header}>
                            <Text style={Home_Styles.consulta_titulo}>Sua próxima consulta</Text>
                            <Ionicons name="notifications-outline" size={18} color={COLORS.preto} />
                        </View>

                        <Text style={Home_Styles.consulta_data}>
                            {consulta.data} ÀS {consulta.hora}
                        </Text>
                        <Text style={Home_Styles.consulta_info}>{consulta.especialidade}</Text>
                        <Text style={Home_Styles.consulta_local}>{consulta.local}</Text>

                        <View
                            style={[
                                Home_Styles.consulta_status,
                                {
                                    backgroundColor:
                                        consulta.status === "Confirmada"
                                            ? COLORS.verde
                                            : COLORS.placeholder_text,
                                },
                            ]}
                        >
                            <Text style={Home_Styles.consulta_status_text}>{consulta.status}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={Home_Styles.consulta_box}>
                        <Text style={Home_Styles.consulta_titulo}>Nenhuma consulta agendada</Text>
                        <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.placeholder_text }}>
                            Você não tem consultas futuras. Agende uma nova consulta!
                        </Text>
                    </View>
                )}

                {/* Serviços */}
                <Text style={Home_Styles.servicos_titulo}>Serviços</Text>

                <View style={Home_Styles.servicos_container}>
                    <TouchableOpacity style={Home_Styles.servico_item} activeOpacity={0.7} onPress={() => navigation.navigate('Agendar')}>
                        <FontAwesome6 name="calendar-plus" size={30} color={COLORS.azul_principal} />
                        <Text style={Home_Styles.servico_text}>Agendar consulta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Home_Styles.servico_item} activeOpacity={0.7} onPress={() => navigation.navigate('Consultas')}>
                        <AntDesign name="bars" size={30} color={COLORS.azul_principal} />
                        <Text style={Home_Styles.servico_text}>Minhas consultas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Home_Styles.servico_item} activeOpacity={0.7} onPress={() => navigation.navigate('Medicamentos')}>
                        <FontAwesome5 name="pills" size={30} color={COLORS.azul_principal} />
                        <Text style={Home_Styles.servico_text}>Medicamentos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Home_Styles.servico_item} activeOpacity={0.7} onPress={() => navigation.navigate('Historico')}>
                        <FontAwesome5 name="file-medical" size={30} color={COLORS.azul_principal} />
                        <Text style={Home_Styles.servico_text}>Meu histórico</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}