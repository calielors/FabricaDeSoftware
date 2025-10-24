import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Home_Styles } from "./home_styles";
import { COLORS } from "../../assets/colors/colors";
import { Top_Bar } from "../../components/top_bar";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



interface Consulta {
    data: string;
    hora: string;
    especialidade: string;
    local: string;
    status: string;
}

import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation: any = useNavigation();

    {/* Alterar valores aqui*/ }
    const [nome, setNome] = useState("Maria");
    const [dataAtual, setDataAtual] = useState(() => {
        const hoje = new Date();
        const dataFormatada = hoje.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    });


    const [consulta, setConsulta] = useState<Consulta>({
        data: "22/02/2023",
        hora: "14:00H",
        especialidade: "Clínico Geral",
        local: "UBS Jardim das Flores",
        status: "Confirmada",
    });

    return (
        <View style={Home_Styles.container}>
            <Top_Bar />
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                {/* Saudação */}
                <View style={Home_Styles.header_box}>
                    <Text style={Home_Styles.titulo}>Olá, {nome}!</Text>
                    <Text style={Home_Styles.data}>{dataAtual}</Text>
                </View>

                {/* Próxima consulta */}
                {consulta && consulta.data && consulta.hora && consulta.especialidade && consulta.local && consulta.status && (
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
