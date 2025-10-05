import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Auth from '../utils/auth';

type AuthContextType = {
    logged: boolean;
    loading: boolean;
    signIn: (username: string) => Promise<void>;
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

    async function signIn(username: string) {
        await Auth.saveLogin(username);
        setLogged(true);
        console.log('[AuthContext] signIn -> logged true for', username);
    }

    async function signOut() {
        await Auth.logout();
        setLogged(false);
        console.log('[AuthContext] signOut -> logged false');
    }

    return (
        <AuthContext.Provider value={{ logged, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
