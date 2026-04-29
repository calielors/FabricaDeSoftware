import { useState, useEffect, useCallback } from 'react';

// Adicionamos o parâmetro 'deps' que é um array de qualquer coisa (ID do usuário, data, etc)
export function useQuery<T>(
    queryFunction: () => Promise<{ data: T | null; error: any }>,
    deps: any[] = [] // Valor padrão é um array vazio
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const carregar = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await queryFunction();
            
            if (result.error) {
                setError(result.error.message);
            } else {
                setData(result.data);
            }
        } catch (err: any) {
            setError(err.message || "Erro inesperado");
        } finally {
            setLoading(false);
        }
    }, deps); // O useCallback agora "escuta" as dependências

    useEffect(() => {
        carregar();
        // O array de dependências garante que se o ID mudar, a busca recomeça
    }, [carregar]);

    return { data, loading, error, refresh: carregar };
}