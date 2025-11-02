import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Auth from '../utils/auth';
import { supabase } from '../services/supabase';

type User = {
    id: string;
    email: string;
    nome: string;
    cpf?: string;
    nascimento?: string;
    endereco?: string;
    unidade?: string;
};

type AuthContextType = {
    logged: boolean;
    loading: boolean;
    user: User | null;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    logged: false,
    loading: true,
    user: null,
    signIn: async () => {},
    signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const DEV_RESET_ON_START = false;

    useEffect(() => {
        async function init() {
            try {
                if (DEV_RESET_ON_START) {
                    console.log('[AuthContext] DEV_RESET_ON_START enabled — clearing saved login');
                    await Auth.logout();
                }

                const v = await Auth.isLoggedIn();
                setLogged(v);

                // get session and user info if logged in
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    setUser({
                        id: session.user.id,
                        email: session.user.email || '',
                        nome: session.user.user_metadata?.nome || session.user.user_metadata?.display_name || ''
                    });
                }
            } catch (err) {
                console.log('[AuthContext] error checking login', err);
                setLogged(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    async function signIn(username: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({ email: username, password });
        if (error) {
            setLogged(false);
            setUser(null);
            throw error;
        } else {
            setLogged(true);
            setUser({
                id: data.user.id,
                email: data.user.email || '', // fallback
                nome: data.user.user_metadata?.nome || data.user.user_metadata?.display_name || '' // fallback
            });
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
        setLogged(false);
        setUser(null);
        console.log('[AuthContext] signOut -> logged false');
    }

    return (
        <AuthContext.Provider value={{ logged, loading, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}