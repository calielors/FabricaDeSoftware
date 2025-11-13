import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabase';
import * as Auth from '../utils/auth';

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
  signIn: (cpf: string, password: string) => Promise<void>;
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

  // --- Restore session when app starts ---
  useEffect(() => {
    async function init() {
      try {
        if (DEV_RESET_ON_START) {
          console.log('[AuthContext] DEV_RESET_ON_START enabled — clearing login');
          await Auth.clearSession();
        }

        const restoredSession = await Auth.restoreSession();
        if (restoredSession?.user) {
          console.log('[AuthContext] Session restored.');
          setLogged(true);
          setUser({
            id: restoredSession.user.id,
            email: restoredSession.user.email || '',
            nome: restoredSession.user.user_metadata?.display_name || '',
          });
        } else {
          setLogged(false);
          setUser(null);
        }
      } catch (err) {
        console.error('[AuthContext] Error restoring session:', err);
        setLogged(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  // --- Sign in ---
  async function signIn(cpf: string, password: string) {
    try {
      const { data, error } = await supabase.functions.invoke('login-paciente', {
        body: { cpf, password },
      });

      if (error) {
        console.error('[AuthContext] invoke error:', error);
        throw new Error(error.message || 'Erro ao autenticar.');
      }

      const { session, user, message } = data || {};

      if (!session?.access_token) {
        console.error('[AuthContext] No valid session in response:', data);
        throw new Error('Falha ao obter sessão válida.');
      }

      await supabase.auth.setSession(session);
      await Auth.saveSession(session, user?.email);

      setLogged(true);
      setUser({
        id: user?.id,
        email: user?.email || '',
        nome: user?.display_name || '',
      });

      console.log('[AuthContext] Login successful:', message || user?.email);
    } catch (err: any) {
      console.error('[AuthContext] Login failed:', err);
      setLogged(false);
      setUser(null);
      throw err;
    }
  }
  async function signOut() {
    try {
      await Auth.clearSession();
      console.log('[AuthContext] User signed out.');
    } catch (err) {
      console.error('[AuthContext] signOut error:', err);
    } finally {
      setLogged(false);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ logged, loading, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}