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
    status?: string;
    data_hora: string;
    especialidade?: string;
    unidade_saude?: string;
};

/**
 * Busca o paciente associado ao usuário autenticado
 */
export async function buscarPacientePorAuthId(authUserId: string): Promise<{ data: Paciente | null; error: any }> {
    try {
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
    } catch (err) {
        return { data: null, error: err };
    }
}

/**
 * Cria um novo agendamento de consulta no banco de dados
 */
export async function criarConsulta(consulta: Omit<Consulta, 'id'>): Promise<{ data: Consulta | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('consulta')
            .insert({
                paciente_id: consulta.paciente_id,
                profissional_id: consulta.profissional_id || null,
                status: consulta.status || 'agendada',
                data_hora: consulta.data_hora,
            })
            .select()
            .single();

        if (error) {
            return { data: null, error };
        }

        return { data, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
}

/**
 * Busca todas as consultas de um paciente
 */
export async function buscarConsultasPaciente(pacienteId: number): Promise<{ data: Consulta[] | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('consulta')
            .select('*')
            .eq('paciente_id', pacienteId)
            .order('data_hora', { ascending: true });

        if (error) {
            return { data: null, error };
        }

        return { data, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
}

/**
 * Cancela uma consulta existente
 */
export async function cancelarConsulta(consultaId: number): Promise<{ data: Consulta | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('consulta')
            .update({ status: 'cancelada' })
            .eq('id', consultaId)
            .select()
            .single();

        if (error) {
            return { data: null, error };
        }

        return { data, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
}

/**
 * Verifica se já existe uma consulta para um determinado horário
 */
export async function verificarHorarioDisponivel(dataHora: string): Promise<boolean> {
    try {
        const { data: consultas, error } = await supabase
            .from('consulta')
            .select('id')
            .eq('data_hora', dataHora)
            .neq('status', 'cancelada');

        if (error) {
            return false;
        }

        return !consultas || consultas.length === 0;
    } catch (err) {
        return false;
    }
}

/**
 * Função auxiliar para combinar data e horário em formato ISO
 */
export function combinarDataHora(data: string, horario: string): string {
    return `${data}T${horario}:00`;
}
