import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../../src/assets/colors/colors";
import { Top_Bar } from "../../../src/components/top_bar";

export default function CentralAjuda() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.branco }}>
            <Top_Bar />
            <ScrollView style={{ flex: 1, padding: 16 }}>
                {/* Header com botão voltar */}
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => router.push('/home/(perfil)')} style={{ padding: 8 }}>
                        <FontAwesome5 name="arrow-left" size={20} color={COLORS.azul_principal} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: "700", color: COLORS.preto, marginLeft: 12 }}>
                        Central de Ajuda
                    </Text>
                </View>

                {/* Ícone grande */}
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                    <View style={{ 
                        backgroundColor: COLORS.azul_principal + '20', 
                        borderRadius: 60, 
                        width: 100, 
                        height: 100, 
                        justifyContent: "center", 
                        alignItems: "center",
                        marginBottom: 12
                    }}>
                        <FontAwesome5 name="question-circle" size={50} color={COLORS.azul_principal} />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: COLORS.preto, marginBottom: 4 }}>
                        Como podemos ajudar?
                    </Text>
                    <Text style={{ fontSize: 14, color: COLORS.placeholder_text, textAlign: "center" }}>
                        Confira as principais funcionalidades do aplicativo
                    </Text>
                </View>

                {/* Principais Funcionalidades */}
                <View style={{ backgroundColor: COLORS.branco, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: COLORS.placeholder_text, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: COLORS.preto, marginBottom: 16 }}>
                        Principais Funcionalidades
                    </Text>
                    
                    <View style={{ flexDirection: "row", marginBottom: 16 }}>
                        <View style={{ 
                            backgroundColor: COLORS.verde + '20', 
                            borderRadius: 8, 
                            width: 40, 
                            height: 40, 
                            justifyContent: "center", 
                            alignItems: "center",
                            marginRight: 12
                        }}>
                            <FontAwesome5 name="calendar-check" size={18} color={COLORS.verde} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.preto, marginBottom: 4 }}>
                                Agendamento de Consultas
                            </Text>
                            <Text style={{ fontSize: 14, color: COLORS.placeholder_text }}>
                                Agende suas consultas de forma rápida e prática
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 16 }}>
                        <View style={{ 
                            backgroundColor: COLORS.azul_principal + '20', 
                            borderRadius: 8, 
                            width: 40, 
                            height: 40, 
                            justifyContent: "center", 
                            alignItems: "center",
                            marginRight: 12
                        }}>
                            <FontAwesome5 name="history" size={18} color={COLORS.azul_principal} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.preto, marginBottom: 4 }}>
                                Histórico de Consultas
                            </Text>
                            <Text style={{ fontSize: 14, color: COLORS.placeholder_text }}>
                                Acesse todo seu histórico médico em um só lugar
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 16 }}>
                        <View style={{ 
                            backgroundColor: '#FF6B6B20', 
                            borderRadius: 8, 
                            width: 40, 
                            height: 40, 
                            justifyContent: "center", 
                            alignItems: "center",
                            marginRight: 12
                        }}>
                            <FontAwesome5 name="pills" size={18} color="#FF6B6B" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.preto, marginBottom: 4 }}>
                                Informações sobre Medicamentos
                            </Text>
                            <Text style={{ fontSize: 14, color: COLORS.placeholder_text }}>
                                Consulte informações sobre seus medicamentos
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ 
                            backgroundColor: '#FFB84D20', 
                            borderRadius: 8, 
                            width: 40, 
                            height: 40, 
                            justifyContent: "center", 
                            alignItems: "center",
                            marginRight: 12
                        }}>
                            <FontAwesome5 name="user-circle" size={18} color="#FFB84D" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.preto, marginBottom: 4 }}>
                                Gerenciamento de Perfil
                            </Text>
                            <Text style={{ fontSize: 14, color: COLORS.placeholder_text }}>
                                Mantenha seus dados sempre atualizados
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Perguntas Frequentes */}
                <View style={{ backgroundColor: COLORS.branco, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: COLORS.placeholder_text, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: COLORS.preto, marginBottom: 16 }}>
                        Perguntas Frequentes
                    </Text>

                    {/* FAQ Item */}
                    <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.verde }}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.preto, marginBottom: 6 }}>
                            Como faço para agendar uma consulta?
                        </Text>
                        <Text style={{ fontSize: 14, color: COLORS.placeholder_text, lineHeight: 20 }}>
                            Acesse a aba "Agendar", selecione a especialidade desejada, escolha o profissional e o horário disponível.
                        </Text>
                    </View>

                    <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.verde }}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.preto, marginBottom: 6 }}>
                            Como visualizo minhas consultas agendadas?
                        </Text>
                        <Text style={{ fontSize: 14, color: COLORS.placeholder_text, lineHeight: 20 }}>
                            Na aba "Consultas" você encontra todas as suas consultas agendadas e seu histórico.
                        </Text>
                    </View>

                    <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.verde }}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.preto, marginBottom: 6 }}>
                            Posso alterar meus dados pessoais?
                        </Text>
                        <Text style={{ fontSize: 14, color: COLORS.placeholder_text, lineHeight: 20 }}>
                            Sim! Acesse "Perfil" → "Dados Pessoais" e clique em "Editar Dados" para atualizar suas informações.
                        </Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.preto, marginBottom: 6 }}>
                            Como atualizo meu endereço?
                        </Text>
                        <Text style={{ fontSize: 14, color: COLORS.placeholder_text, lineHeight: 20 }}>
                            Vá em "Perfil" → "Endereço" e clique em "Editar Endereço" para atualizar seu endereço completo.
                        </Text>
                    </View>
                </View>

                {/* Dicas de Uso */}
                <View style={{ backgroundColor: COLORS.verde + '10', borderRadius: 12, padding: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <FontAwesome5 name="lightbulb" size={20} color={COLORS.verde} style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 18, fontWeight: "700", color: COLORS.verde }}>
                            Dicas de Uso
                        </Text>
                    </View>
                    
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 14, color: COLORS.preto, lineHeight: 22 }}>
                            • Mantenha seus dados sempre atualizados para facilitar o atendimento
                        </Text>
                    </View>
                    
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 14, color: COLORS.preto, lineHeight: 22 }}>
                            • Verifique suas consultas agendadas regularmente
                        </Text>
                    </View>
                    
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 14, color: COLORS.preto, lineHeight: 22 }}>
                            • Ative as notificações para receber lembretes de consultas
                        </Text>
                    </View>
                    
                    <View>
                        <Text style={{ fontSize: 14, color: COLORS.preto, lineHeight: 22 }}>
                            • Em caso de dúvidas, entre em contato através do "Fale Conosco"
                        </Text>
                    </View>
                </View>

                {/* Suporte */}
                <View style={{ backgroundColor: COLORS.azul_principal + '10', borderRadius: 12, padding: 20, marginBottom: 30 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <FontAwesome5 name="headset" size={20} color={COLORS.azul_principal} style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 18, fontWeight: "700", color: COLORS.azul_principal }}>
                            Precisa de Mais Ajuda?
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, color: COLORS.preto, lineHeight: 22, marginBottom: 16 }}>
                        Nossa equipe está pronta para ajudar você. Clique no botão abaixo para entrar em contato conosco.
                    </Text>
                    <TouchableOpacity 
                        onPress={() => router.push('/home/(perfil)')}
                        style={{ 
                            backgroundColor: COLORS.azul_principal, 
                            padding: 12, 
                            borderRadius: 8, 
                            flexDirection: "row", 
                            justifyContent: "center", 
                            alignItems: "center" 
                        }}
                    >
                        <FontAwesome5 name="comments" size={16} color={COLORS.branco} style={{ marginRight: 8 }} />
                        <Text style={{ color: COLORS.branco, fontSize: 15, fontWeight: "600" }}>Fale Conosco</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
