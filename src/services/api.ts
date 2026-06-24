import { supabase, SUPABASE_URL } from './supabase';
import { cacheManager } from './cache';

/**
 * Camada de API centralizada para chamadas via Edge Functions
 * Substitui chamadas diretas ao Supabase por fetch HTTP
 */

// ===========================
// TIPOS
// ===========================

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

type ApiResponse<T> = {
  data: T | null;
  error: any;
};

/**
 * Recupera o token de acesso atual do usuário
 */
async function getAccessToken(): Promise<string | null> {
  const session = await supabase.auth.getSession();
  return session.data?.session?.access_token || null;
}

/**
 * Faz uma chamada genérica à uma Edge Function
 */
async function callEdgeFunction<T>(
  functionName: string,
  payload: any,
  timeout: number = 15000
): Promise<ApiResponse<T>> {
  try {
    const token = await getAccessToken();
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const url = `${SUPABASE_URL}/functions/v1/${functionName}`;

    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[callEdgeFunction] ${functionName} falhou:`, response.status, errorData?.error);
      return {
        data: null,
        error: {
          message: errorData.error || 'Erro ao processar requisição',
          status: response.status,
        },
      };
    }

    const result = await response.json();
    
    if (result.error) {
      return { data: null, error: { message: result.error } };
    }

    return { data: result.data as T, error: null };
  } catch (error: any) {
    console.error(`[callEdgeFunction] Exceção em ${functionName}:`, error.message);
    if (error.name === 'AbortError') {
      return {
        data: null,
        error: { message: 'Tempo limite de conexão excedido. Verifique sua internet' },
      };
    }
    return {
      data: null,
      error: { message: error.message || 'Erro de conexão' },
    };
  }
}

// ===========================
// PACIENTE - CRUD (gerenciar-pacientes)
// ===========================

export async function obterPaciente(idPaciente: number): Promise<ApiResponse<Paciente>> {
  return callEdgeFunction<Paciente>(
    'gerenciar-pacientes',
    { acao: 'obter', id_paciente: idPaciente },
    10000
  );
}

export async function obterPacientePorAuthId(authUserId: string): Promise<ApiResponse<Paciente>> {
  return callEdgeFunction<Paciente>(
    'gerenciar-pacientes',
    { acao: 'obter-por-auth-id', auth_user_id: authUserId },
    10000
  );
}

/**
 * Registra um novo paciente (cria auth + paciente)
 * Chama a Edge Function 'register-paciente'
 */
export async function registrarPaciente(dados: {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
}): Promise<ApiResponse<any>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/register-paciente`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        data: null,
        error: {
          message: errorData.error || 'Erro ao registrar paciente',
          status: response.status,
        },
      };
    }

    const result = await response.json();
    
    if (result.error) {
      return { data: null, error: { message: result.error } };
    }

    return { data: result.user || result, error: null };
  } catch (error: any) {
    console.error('[registrarPaciente] Erro:', error.message);
    
    if (error.name === 'AbortError') {
      return {
        data: null,
        error: { message: 'Tempo limite de conexão excedido. Verifique sua internet' },
      };
    }
    return {
      data: null,
      error: { message: error.message || 'Erro de conexão' },
    };
  }
}

/**
 * Realiza login de um paciente existente
 * Chama a Edge Function 'login-paciente'
 */
export async function loginPacienteApi(cpf: string, password: string): Promise<ApiResponse<any>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/login-paciente`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        data: null,
        error: {
          message: errorData.error || 'Erro ao fazer login',
          status: response.status,
        },
      };
    }

    const result = await response.json();
    
    if (result.error) {
      return { data: null, error: { message: result.error } };
    }

    return { data: result, error: null };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {
        data: null,
        error: { message: 'Tempo limite de conexão excedido. Verifique sua internet' },
      };
    }
    return {
      data: null,
      error: { message: error.message || 'Erro de conexão' },
    };
  }
}

export async function atualizarPaciente(idPaciente: number, dadosPaciente: any): Promise<ApiResponse<Paciente>> {
  // Limpa cache ao atualizar
  cacheManager.delete('paciente_' + idPaciente);
  
  return callEdgeFunction<Paciente>(
    'gerenciar-pacientes',
    { acao: 'atualizar', id_paciente: idPaciente, dados: dadosPaciente },
    15000
  );
}

export async function deletarPaciente(idPaciente: number): Promise<ApiResponse<any>> {
  cacheManager.delete('paciente_' + idPaciente);
  
  return callEdgeFunction<any>(
    'gerenciar-pacientes',
    { acao: 'deletar', id_paciente: idPaciente },
    10000
  );
}

// ===========================
// CONSULTAS - CRUD
// ===========================

/**
 * Cria um novo agendamento de consulta
 */
export async function criarConsultaApi(consulta: {
  paciente_id: number;
  profissional_id?: number | null;
  unidade_saude_id?: number | null;
  status?: string;
  data_hora: string;
  especialidade?: string;
}) {
  // Limpa cache de consultas do paciente
  cacheManager.delete(`consultas_paciente_${consulta.paciente_id}`);
  
  return callEdgeFunction(
    'gerenciar-consultas',
    { acao: 'criar-consulta', dados: consulta },
    15000
  );
}

/**
 * Busca todas as consultas de um paciente
 */
export async function buscarConsultasPacienteApi(pacienteId: number) {
  const cacheKey = `consultas_paciente_${pacienteId}`;
  const cacheData = cacheManager.get(cacheKey);
  
  if (cacheData) {
    return { data: cacheData, error: null };
  }

  const result = await callEdgeFunction(
    'gerenciar-consultas',
    { acao: 'listar-consultas', id_paciente: pacienteId },
    15000
  );

  if (result.data) {
    cacheManager.set(cacheKey, result.data, undefined);
  }

  return result;
}

/**
 * Cancela uma consulta
 */
export async function cancelarConsultaApi(consultaId: number, pacienteId: number) {
  // Limpa cache de consultas
  cacheManager.delete(`consultas_paciente_${pacienteId}`);
  
  return callEdgeFunction(
    'gerenciar-consultas',
    { acao: 'cancelar-consulta', id_consulta: consultaId },
    10000
  );
}

/**
 * Busca horários ocupados para uma data e unidade
 */
export async function buscarHorariosOcupadosApi(
  data: string,
  unidadeId?: number
): Promise<ApiResponse<string[]>> {
  const cacheKey = `horarios_${data}_${unidadeId || 'sem-unidade'}`;
  const cacheData = cacheManager.get<string[]>(cacheKey);
  
  if (cacheData) {
    return { data: cacheData, error: null };
  }

  const result = await callEdgeFunction<string[]>(
    'gerenciar-consultas',
    {
      acao: 'buscar-horarios-ocupados',
      data,
      unidade_saude_id: unidadeId,
    },
    10000
  );

  if (result.data) {
    cacheManager.set(cacheKey, result.data, undefined);
  }

  return result;
}

// ===========================
// REFERÊNCIAS - Unidades e Profissionais
// ===========================

/**
 * Busca unidades de saúde com profissionais cadastrados
 */
export async function buscarUnidadesSaudeApi() {
  const cacheKey = 'unidades_saude_com_profissionais';
  const cacheData = cacheManager.get(cacheKey);
  
  if (cacheData) {
    return { data: cacheData, error: null };
  }

  const result = await callEdgeFunction(
    'gerenciar-referencias',
    { acao: 'listar-unidades' },
    10000
  );

  if (result.data) {
    cacheManager.set(cacheKey, result.data, undefined);
  }

  return result;
}

/**
 * Busca apenas unidades de saúde que possuem profissionais associados
 * Útil para agendamento onde só faz sentido listar unidades com profissionais disponíveis
 */
export async function buscarUnidadesComProfissionaisApi() {
  const cacheKey = 'unidades_saude_com_profissionais_filtrado';
  const cacheData = cacheManager.get(cacheKey);
  
  if (cacheData) {
    console.log('[API] Unidades retornadas do cache:', cacheData);
    return { data: cacheData, error: null };
  }

  console.log('[API] Chamando gerenciar-referencias com acao: buscar-unidades-com-profissionais');
  const result = await callEdgeFunction(
    'gerenciar-referencias',
    { acao: 'buscar-unidades-com-profissionais' },
    10000
  );

  console.log('[API] Resultado gerenciar-referencias:', result);

  if (result.data) {
    cacheManager.set(cacheKey, result.data, undefined);
  }

  return result;
}

/**
 * Busca profissionais de uma unidade específica
 */
export async function buscarProfissionaisPorUnidadeApi(unidadeId: number) {
  const cacheKey = `profissionais_unidade_${unidadeId}`;
  const cacheData = cacheManager.get(cacheKey);
  
  if (cacheData) {
    return { data: cacheData, error: null };
  }

  const result = await callEdgeFunction(
    'gerenciar-referencias',
    { acao: 'listar-profissionais', unidade_saude_id: unidadeId },
    10000
  );

  if (result.data) {
    cacheManager.set(cacheKey, result.data, undefined);
  }

  return result;
}

// ===========================
// MEDICAMENTOS
// ===========================

export async function buscarMedicamentosApi() {
  const cacheKey = 'medicamentos_disponiveis';
  const cacheData = cacheManager.get(cacheKey);
  
  if (cacheData) {
    return { data: cacheData, error: null };
  }

  const result = await callEdgeFunction(
    'gerenciar-referencias',
    { acao: 'listar-medicamentos' },
    10000
  );

  if (result.data) {
    cacheManager.set(cacheKey, result.data, undefined);
  }

  return result;
}

// ===========================
// UTILITÁRIOS
// ===========================

/**
 * Combina data e horário em formato ISO
 */
export function combinarDataHoraApi(data: string, horario: string): string {
  return `${data}T${horario}:00`;
}

/**
 * Invalida todo o cache (útil após logout)
 */
export function invalidarCacheApi() {
  cacheManager.clearAll();
}
