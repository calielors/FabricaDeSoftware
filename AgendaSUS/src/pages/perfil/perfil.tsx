import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Top_Bar } from '../../components/top_bar';
import { COLORS } from '../../assets/colors/colors';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Perfil() {
    const { signOut } = useContext(AuthContext);

    async function handleLogout() {
        await signOut();
    }

    const usuario = {
        nome: 'Dona Maria Souza Guimarães',
        nascimento: '1956-07-12',
        endereco: 'Rua das Palmeiras, 7',
        unidade: 'UBS Central - Dois Vizinhos',
    };

    return (
        <View style={styles.container}>
            <Top_Bar />
            <View style={styles.content}>
                <Text style={styles.title}>{usuario.nome}</Text>
                <Text style={styles.field}>Nascimento: {usuario.nascimento}</Text>
                <Text style={styles.field}>Endereço: {usuario.endereco}</Text>
                <Text style={styles.field}>Unidade: {usuario.unidade}</Text>

                <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                    <Text style={styles.btnText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.branco },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 18, color: COLORS.preto },
    field: { marginTop: 8, color: COLORS.preto },
    btn: { marginTop: 20, backgroundColor: COLORS.azul_principal, padding: 10, borderRadius: 6 },
    btnText: { color: COLORS.branco },
});
