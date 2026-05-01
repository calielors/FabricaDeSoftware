import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { cacheManager } from './cache'; // Importa o novo gestor

export function useQuery<T>(
    queryFunction: () => Promise<{ data: T | null; error: any }>,
    deps: any[] = [],
    cacheKey?: string,
    ttl: number = 5 * 60 * 1000 //Padrão: 5 minutos
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const queryFnRef = useRef(queryFunction);

    useEffect(() => {
        queryFnRef.current = queryFunction;
    }, [queryFunction]);

    const carregar = useCallback(async (forceRefresh: boolean = false) => {
        // Tenta pegar do cache manager
        if (!forceRefresh && cacheKey) {
            const cachedData = cacheManager.get<T>(cacheKey);
            if (cachedData) {
                setData(cachedData);
                setLoading(false);
                return;
            }
        }

        setLoading(true);
        setError(null);

        try {
            const result = await queryFnRef.current();

            if (result.error) {
                setError(result.error.message);
            } else {
                setData(result.data);
                // Salva no cache manager
                if (cacheKey && result.data !== null) {
                    cacheManager.set(cacheKey, result.data, ttl);
                }
            }
        } catch (err: any) {
            setError(err.message || "Erro inesperado");
            Alert.alert("Erro", err.message || "Erro inesperado");
        } finally {
            setLoading(false);
        }
    }, [cacheKey, ttl, ...deps]);

    useEffect(() => {
        carregar();
    }, [carregar]);

    return { data, loading, error, refresh: () => carregar(true) };
}