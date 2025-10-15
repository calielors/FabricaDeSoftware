import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Auth from '../utils/auth';
import { supabase } from '../services/supabase';

type AuthContextType = {
    logged: boolean;
    loading: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    logged: false,
    loading: true,
    signIn: async () => { },
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

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
            } catch (err) {
                console.log('[AuthContext] error checking login', err);
                setLogged(false);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setLogged(!!session);
            setLoading(false);
        });
    }, []);

    async function signIn(username: string, password: string) {

        //deletar essa parte após implementação do usuário de teste no banco
        if('teste' === username && 'teste' === password) {
            setLogged(true);
            return;
        };//deletar após implementação real
        //deletar até essa parte

        const { data, error } = await supabase.auth.signInWithPassword({ email: username, password  });
        if (error) {
            setLogged(false);
            throw error;
        } else {
            setLogged(true);
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
        setLogged(false);
        console.log('[AuthContext] signOut -> logged false');
    }

    return (
        <AuthContext.Provider value={{ logged, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
