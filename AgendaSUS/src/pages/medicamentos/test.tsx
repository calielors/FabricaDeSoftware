import { supabase } from '../../services/supabase';

const fetchDisponibilidade = async () => {
  const { data, error } = await supabase
    .from('disponibilidade')
    .select(`
      id_medicamento,
      unidades_disponiveis,
      medicamento (
        id,
        nome,
        dose_mg
      )
    `)
    .order('id_medicamento');

  console.log(data, error);
};

fetchDisponibilidade();