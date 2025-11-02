import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Top_Bar } from "../../components/top_bar";
import { COLORS } from "../../assets/colors/colors";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Perfil_Styles } from "./perfil_styles";
import { AuthContext } from "../../contexts/AuthContext";

export default function Perfil() {
    const { signOut, user } = useContext(AuthContext);

    const [notificacoes, setNotificacoes] = useState(true);
    const [temaEscuro, setTemaEscuro] = useState(false);

    async function handleLogout() {
        await signOut();
    }

    return (
        <View style={[Perfil_Styles.container, { backgroundColor: COLORS.branco }]}>
            <Top_Bar />
            <ScrollView contentContainerStyle={Perfil_Styles.content}>
                {/* Cabeçalho */}
                <View style={Perfil_Styles.header}>
                    <Text style={Perfil_Styles.title}>{user?.nome || "Usuário"}</Text>
                    {user?.nascimento && (
                        <Text style={Perfil_Styles.subText}>
                            Nascimento: {new Date(user.nascimento).toLocaleDateString('pt-BR')}
                        </Text>
                    )}
                    {user?.unidade && (
                        <Text style={Perfil_Styles.subText}>Unidade: {user.unidade}</Text>
                    )}
                </View>

                {/* Informações Pessoais */}
                <Card titulo="Informações Pessoais">
                    <TouchableOpacity style={Perfil_Styles.menuItem} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="user" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Dados Pessoais</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={Perfil_Styles.menuItem} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="map-marker-alt" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Endereço</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[Perfil_Styles.menuItem, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="phone" size={19} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Contato</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                    </TouchableOpacity>
                </Card>

                {/* Preferências */}
                <Card titulo="Preferências">
                    <TouchableOpacity style={Perfil_Styles.menuItem} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="language" size={19} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Idioma</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: COLORS.placeholder_text, marginRight: 6 }}>Português</Text>
                            <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                        </View>
                    </TouchableOpacity>

                    <View style={Perfil_Styles.menuItem}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="bell" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Notificações</Text>
                        </View>
                        <Switch
                            value={notificacoes}
                            onValueChange={setNotificacoes}
                            trackColor={{ true: COLORS.azul_principal }}
                        />
                    </View>

                    <View style={[Perfil_Styles.menuItem, { borderBottomWidth: 0 }]}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="moon" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Tema Escuro</Text>
                        </View>
                        <Switch
                            value={temaEscuro}
                            onValueChange={setTemaEscuro}
                            trackColor={{ true: COLORS.azul_principal }}
                        />
                    </View>
                </Card>

                {/* Segurança */}
                <Card titulo="Segurança">
                    <TouchableOpacity style={Perfil_Styles.menuItem} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="lock" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Alterar Senha</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[Perfil_Styles.menuItem, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="shield-alt" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Privacidade</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                    </TouchableOpacity>
                </Card>

                {/* Ajuda e Suporte */}
                <Card titulo="Ajuda e Suporte">
                    <TouchableOpacity style={Perfil_Styles.menuItem} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="question-circle" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Central de Ajuda</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={Perfil_Styles.menuItem} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="comments" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Fale Conosco</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[Perfil_Styles.menuItem, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
                        <View style={Perfil_Styles.menuLeft}>
                            <FontAwesome5 name="info-circle" size={20} color={COLORS.azul_principal} />
                            <Text style={Perfil_Styles.menuText}>Sobre o Aplicativo</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={COLORS.placeholder_text} />
                    </TouchableOpacity>
                </Card>

                {/* Botão Sair */}
                <TouchableOpacity style={Perfil_Styles.sair} onPress={handleLogout}>
                    <MaterialCommunityIcons name="logout" size={22} color={COLORS.branco} style={{ marginRight: 8 }} />
                    <Text style={Perfil_Styles.sairText}>Sair da conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

function Card({ titulo, children }: { titulo: string; children: React.ReactNode }) {
    return (
        <View style={Perfil_Styles.card}>
            <Text style={Perfil_Styles.cardTitle}>{titulo}</Text>
            {children}
        </View>
    );
}