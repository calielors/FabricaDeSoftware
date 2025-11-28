import React, { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../services/supabase";
import * as Auth from "../utils/auth";
import { useRouter } from "expo-router";

type User = {
  id: string;
  email: string;
  nome: string;
  cpf?: string;
  nascimento?: string;
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
  const router = useRouter();

  useEffect(() => {
    async function init() {
      try {
        const restored = await Auth.restoreSession();

        if (restored?.user) {
          const u = restored.user;

          setUser({
            id: u.id,
            email: u.email ?? "",
            nome: u.user_metadata?.display_name ?? "",
            cpf: u.user_metadata?.cpf,
            nascimento: u.user_metadata?.nascimento,
            unidade: u.user_metadata?.unidade,
          });

          setLogged(true);
        } else {
          setLogged(false);
          setUser(null);
        }
      } catch (err) {
        console.error("[Auth] Session restore failed:", err);
        setLogged(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  async function signIn(cpf: string, password: string) {
    try {
      const { data, error } = await supabase.functions.invoke(
        "login-paciente",
        { body: { cpf, password } }
      );

      if (error) throw new Error("Erro ao conectar-se ao servidor.");
      if (data?.error) throw new Error(data.error);

      const { session, user } = data;

      if (!session?.access_token) throw new Error("Falha ao criar sessão.");

      await supabase.auth.setSession(session);
      await Auth.saveSession(session, user?.email ?? "");

      setUser({
        id: user.id,
        email: user.email ?? "",
        nome: user.display_name ?? "",
        cpf: user.cpf,
      });

      setLogged(true);
    } catch (err: any) {
      console.error("[Auth] signIn error:", err);
      setLogged(false);
      setUser(null);
      throw new Error(err?.message || "Não foi possível realizar o login.");
    }
  }

  async function signOut() {
    await Auth.clearSession();
    setLogged(false);
    setUser(null);
    router.replace("/auth/login");
  }

  return (
    <AuthContext.Provider
      value={{ logged, loading, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}