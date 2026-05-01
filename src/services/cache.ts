// Estrutura do cache
interface CacheItem<T> {
    data: T;
    expiresAt: number;
}

// O objeto de cache fica "escondido" aqui dentro
const storage: { [key: string]: CacheItem<any> } = {};

export const cacheManager = {
    // Salva um item
    set: <T>(key: string, data: T, ttl: number) => {
        storage[key] = {
            data,
            expiresAt: Date.now() + ttl,
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
    deleteCache: (key: string) => {
        delete storage[key];
    },

    // Limpa tudo (útil para o Logout)
    clearAllCache: () => {
        Object.keys(storage).forEach(key => delete storage[key]);
    }
};