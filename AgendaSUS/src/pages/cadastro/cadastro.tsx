import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ import adicionado
import { CadastroStyles as styles } from './cadastro_styles';
import { COLORS } from '../../assets/colors/colors';
import { supabase } from '../../services/supabase';

type Form = {
    nome: string;
    sobrenome: string;
    endereco: string;
    numero: string;
    telefone: string;
    cep: string;
    cns: string;
    rg: string;
    cpf: string;
    email: string;
    senha: string;
};

export default function Cadastro() {
    const navigation = useNavigation();
    const [form, setForm] = useState<Form>({
        nome: '', sobrenome: '', endereco: '', numero: '', telefone: '',
        cep: '', cns: '', rg: '', cpf: '', email: '', senha: ''
    });
    const [loading, setLoading] = useState(false);

    function setField<K extends keyof Form>(k: K, v: string) {
        setForm(s => ({ ...s, [k]: v }));// atualiza campo do form
    }

    async function handleSubmit() {
        if (!form.nome || !form.sobrenome || !form.cns || !form.rg || !form.cpf || !form.email || !form.senha) {
            Alert.alert('Preencha os campos obrigatórios (nome, sobrenome, CNS, RG, CPF, e-mail e senha)');
            return;
        }

        setLoading(true);

        try {
            // checa duplicados
            const { data: existsCNS } = await supabase.from('usuarios').select('id').eq('cns', form.cns).limit(1);
            if (existsCNS && (existsCNS as any).length > 0) { Alert.alert('CNS já cadastrado'); setLoading(false); return; }

            const { data: existsRG } = await supabase.from('usuarios').select('id').eq('rg', form.rg).limit(1);
            if (existsRG && (existsRG as any).length > 0) { Alert.alert('RG já cadastrado'); setLoading(false); return; }

            const { data: existsCPF } = await supabase.from('usuarios').select('id').eq('cpf', form.cpf).limit(1);
            if (existsCPF && (existsCPF as any).length > 0) { Alert.alert('CPF já cadastrado'); setLoading(false); return; }

            const { error } = await supabase.from('usuarios').insert([{ ...form }]);
            if (error) throw error;

            Alert.alert('Cadastro realizado', 'Usuário cadastrado com sucesso');

            navigation.navigate('Login' as never);
        } catch (err: any) {
            const msg = err?.message || 'Falha ao cadastrar';
            console.log('[Cadastro] erro:', msg);
            Alert.alert('Erro', msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput placeholder="Nome" value={form.nome} onChangeText={t => setField('nome', t)} style={styles.input} />
            <TextInput placeholder="Sobrenome" value={form.sobrenome} onChangeText={t => setField('sobrenome', t)} style={styles.input} />
            <TextInput placeholder="Endereço" value={form.endereco} onChangeText={t => setField('endereco', t)} style={styles.input} />
            <TextInput placeholder="Número" value={form.numero} onChangeText={t => setField('numero', t)} style={styles.input} keyboardType="numeric" />
            <TextInput placeholder="Telefone" value={form.telefone} onChangeText={t => setField('telefone', t)} style={styles.input} keyboardType="phone-pad" />
            <TextInput placeholder="CEP" value={form.cep} onChangeText={t => setField('cep', t)} style={styles.input} keyboardType="numeric" />
            <TextInput placeholder="CNS" value={form.cns} onChangeText={t => setField('cns', t)} style={styles.input} />
            <TextInput placeholder="RG" value={form.rg} onChangeText={t => setField('rg', t)} style={styles.input} />
            <TextInput placeholder="CPF" value={form.cpf} onChangeText={t => setField('cpf', t)} style={styles.input} />
            <TextInput placeholder="E-mail" value={form.email} onChangeText={t => setField('email', t)} style={styles.input} keyboardType="email-address" />
            <TextInput placeholder="Senha" value={form.senha} onChangeText={t => setField('senha', t)} style={styles.input} secureTextEntry />

            <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={loading}>
                <Text style={styles.btnText}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
