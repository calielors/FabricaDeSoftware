import { supabase } from './supabase';

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
    data_hora: string; // formato ISO: "2025-11-09T14:30:00"
};


 // Busca o paciente associado ao usuário autenticado
 
export async function buscarPacientePorAuthId(authUserId: string): Promise<{ data: Paciente | null; error: any }> {
    try {
        console.log('[buscarPacientePorAuthId] Buscando paciente para auth_user_id:', authUserId);
        
        // Primeiro, tenta buscar com maybeSingle (não falha se não encontrar)
        const { data, error } = await supabase
            .from('paciente')
            .select('*')
            .eq('auth_user_id', authUserId)
            .maybeSingle();

        if (error) {
            console.error('[buscarPacientePorAuthId] Erro ao buscar paciente:', error);
            return { data: null, error };
        }

        if (!data) {
            console.warn('[buscarPacientePorAuthId] Nenhum paciente encontrado para este usuário');
            console.warn('[buscarPacientePorAuthId] auth_user_id buscado:', authUserId);
            
            // Debug adicional: busca todos os pacientes (primeiros 3) para comparar
            const { data: debugPacientes } = await supabase
                .from('paciente')
                .select('id, nome, email, auth_user_id')
                .limit(3);
            
            console.log('[buscarPacientePorAuthId] Pacientes no banco (amostra):');
            console.log(debugPacientes);
            
            return { 
                data: null, 
                error: { 
                    message: 'Nenhum paciente vinculado a este usuário. Por favor, complete seu cadastro.',
                    code: 'PACIENTE_NAO_ENCONTRADO'
                } 
            };
        }

        console.log('[buscarPacientePorAuthId] Paciente encontrado:', { id: data.id, nome: data.nome });
        return { data, error: null };
    } catch (err) {
        console.error('[buscarPacientePorAuthId] Erro inesperado:', err);
        return { data: null, error: err };
    }
}


 // Cria um novo agendamento de consulta no banco de dados
 
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
            console.error('[criarConsulta] Erro ao criar consulta:', error);
            return { data: null, error };
        }

        console.log('[criarConsulta] Consulta criada com sucesso:', data);
        return { data, error: null };
    } catch (err) {
        console.error('[criarConsulta] Erro inesperado:', err);
        return { data: null, error: err };
    }
}


 // Busca todas as consultas de um paciente
 
export async function buscarConsultasPaciente(pacienteId: number): Promise<{ data: Consulta[] | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('consulta')
            .select('*')
            .eq('paciente_id', pacienteId)
            .order('data_hora', { ascending: true });

        if (error) {
            console.error('[buscarConsultasPaciente] Erro ao buscar consultas:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (err) {
        console.error('[buscarConsultasPaciente] Erro inesperado:', err);
        return { data: null, error: err };
    }
}


 // Cancela uma consulta existente
 
export async function cancelarConsulta(consultaId: number): Promise<{ data: Consulta | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('consulta')
            .update({ status: 'cancelada' })
            .eq('id', consultaId)
            .select()
            .single();

        if (error) {
            console.error('[cancelarConsulta] Erro ao cancelar consulta:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (err) {
        console.error('[cancelarConsulta] Erro inesperado:', err);
        return { data: null, error: err };
    }
}

/**
 * Verifica se já existe uma consulta para um determinado horário
 * @param dataHora - Data e hora no formato ISO (ex: "2025-11-09T14:30:00")
 */
export async function verificarHorarioDisponivel(dataHora: string): Promise<boolean> {
    try {
        const { data: consultas, error } = await supabase
            .from('consulta')
            .select('id')
            .eq('data_hora', dataHora)
            .neq('status', 'cancelada');

        if (error) {
            console.error('[verificarHorarioDisponivel] Erro ao verificar horário:', error);
            return false;
        }

        return !consultas || consultas.length === 0;
    } catch (err) {
        console.error('[verificarHorarioDisponivel] Erro inesperado:', err);
        return false;
    }
}

/**
 * Função auxiliar para combinar data e horário em formato ISO
 * @param data - Data no formato "YYYY-MM-DD"
 * @param horario - Horário no formato "HH:MM"
 * @returns Data/hora no formato ISO "YYYY-MM-DDTHH:MM:00"
 */
export function combinarDataHora(data: string, horario: string): string {
    return `${data}T${horario}:00`;
}
