// Estrutura do cache
interface CacheItem<T> {
    data: T;
    expiresAt: number;
}

// O objeto de cache fica "escondido" aqui dentro
const storage: { [key: string]: CacheItem<any> } = {};

export const cacheManager = {
    // Salva um item
    set: <T>(key: string, data: T, ttl: number | undefined) => {
        storage[key] = {
            data,
            expiresAt: Date.now() + (ttl || 60 * 5), // 5 minutos padrão
        };
    },

    // Busca um item (retorna null se não existir ou estiver expirado)
    get: <T>(key: string): T | null => {
        const item = storage[key];
        if (!item) return null;

        if (Date.now() > item.expiresAt) {
            delete storage[key]; // Limpa o que expirou
            return null;
        }
        return item.data;
    },
    // Deleta um item
    delete: (key: string) => {
        delete storage[key];
    },

    // Limpa tudo (útil para o Logout)
    clearAll: () => {
        Object.keys(storage).forEach(key => delete storage[key]);
    }
};