import { supabase } from './supabase';

// Tipos
export type Paciente = {
    id: number;
    nome: string;
    nome_social?: string;
    cpf?: string;
    genero?: string;
    telefone?: string;
    endereco?: string;
    cartao_sus?: string;
    data_nascimento?: string;
    email?: string;
    auth_user_id?: string;
};

export type Consulta = {
    id?: number;
    paciente_id: number;
    profissional_id?: number;
    unidade_saude_id?: number;
    status?: string;
    data_hora: string;
    especialidade?: string;
    unidade_saude?: string | { id: number; nome: string; endereco?: string };
};

export type UnidadeSaude = {
    id: number;
    nome: string;
    endereco?: string;
    telefone?: string;
};

/**
 * Busca o paciente associado ao usuário autenticado
 */
export async function buscarPacientePorAuthId(authUserId: string): Promise<{ data: Paciente | null; error: any }> {
    const { data, error } = await supabase
        .from('paciente')
        .select('*')
        .eq('auth_user_id', authUserId)
        .maybeSingle();

    if (error) {
        return { data: null, error };
    }

    if (!data) {
        return { 
            data: null, 
            error: { 
                message: 'Nenhum paciente vinculado a este usuário. Por favor, complete seu cadastro.',
                code: 'PACIENTE_NAO_ENCONTRADO'
            } 
        };
    }

    return { data, error: null };
}

/**
 * Busca todas as unidades de saúde cadastradas
 */
export async function buscarUnidadesSaude(): Promise<{ data: UnidadeSaude[] | null; error: any }> {
    const { data, error } = await supabase
        .from('unidade_saude')
        .select('*')
        .order('nome', { ascending: true });

    return { data, error };
}

/**
 * Cria um novo agendamento de consulta no banco de dados
 */
export async function criarConsulta(consulta: Omit<Consulta, 'id'>): Promise<{ data: Consulta | null; error: any }> {
    const { data, error } = await supabase
        .from('consulta')
        .insert({
            paciente_id: consulta.paciente_id,
            profissional_id: consulta.profissional_id || null,
            unidade_saude_id: consulta.unidade_saude_id || null,
            status: consulta.status || 'agendada',
            data_hora: consulta.data_hora,
        })
        .select()
        .single();

    return { data, error };
}

/**
 * Busca todas as consultas de um paciente com dados da unidade de saúde
 */
export async function buscarConsultasPaciente(pacienteId: number): Promise<{ data: Consulta[] | null; error: any }> {
    const { data, error } = await supabase
        .from('consulta')
        .select(`
            *,
            unidade_saude:unidade_saude_id (
                id,
                nome,
                endereco
            )
        `)
        .eq('paciente_id', pacienteId)
        .order('data_hora', { ascending: true });

    return { data, error };
}

/**
 * Cancela uma consulta existente
 */
export async function cancelarConsulta(consultaId: number): Promise<{ data: Consulta | null; error: any }> {
    const { data, error } = await supabase
        .from('consulta')
        .update({ status: 'cancelada' })
        .eq('id', consultaId)
        .select()
        .single();

    return { data, error };
}

/**
 * Busca horários ocupados para uma data e unidade específicas
 */
export async function buscarHorariosOcupados(data: string, unidadeId?: number): Promise<string[]> {
    const inicioDia = `${data}T00:00:00`;
    const fimDia = `${data}T23:59:59`;

    const query = supabase
        .from('consulta')
        .select('data_hora')
        .gte('data_hora', inicioDia)
        .lte('data_hora', fimDia)
        .neq('status', 'cancelada');

    if (unidadeId) {
        query.eq('unidade_saude_id', unidadeId);
    }

    const { data: consultas, error } = await query;

    if (error || !consultas) {
        return [];
    }

    return consultas.map(c => {
        const dataHora = new Date(c.data_hora);
        return dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    });
}

/**
 * Função auxiliar para combinar data e horário em formato ISO
 */
export function combinarDataHora(data: string, horario: string): string {
    return `${data}T${horario}:00`;
}
