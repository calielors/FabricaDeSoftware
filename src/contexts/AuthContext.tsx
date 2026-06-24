import React, { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../services/supabase";
import * as Auth from "../utils/auth";
import { invalidarCacheApi } from "../services/api";
import { useRouter, useSegments } from "expo-router"; // Importamos o useSegments para monitorar a rota
import FundoAnimado from "../../src/assets/components/FundoAnimado"; // Ajuste o caminho para o seu componente
import { useTheme } from "../../src/contexts/ThemeContext"; // Ajuste o caminho para o seu contexto de Tema

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
  
  const { theme } = useTheme(); 
  // OuseSegments devolve um array com a rota atual (ex: ['auth', 'welcome'] ou ['auth', 'login'])
  const segments = useSegments();
  const estaNoFluxoAuth = segments[0] === "auth" || segments[0] === "recuperarSenha";
  const escurecerESumirFundo = !estaNoFluxoAuth;

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
      console.log("[Auth] signIn error:", err);
      setLogged(false);
      setUser(null);
      throw new Error(err?.message || "Não foi possível realizar o login.");
    }
  }

  async function signOut() {
    await Auth.clearSession();
    invalidarCacheApi(); // Limpa cache ao fazer logout
    setLogged(false);
    setUser(null);
    router.replace("/auth/welcome");
  }

  return (
    <AuthContext.Provider value={{ logged, loading, user, signIn, signOut }}>
      
      {/* O fundo agora fica injetado na raiz do provedor! 
        Ele só renderiza se o usuário estiver nas telas de Auth e recuperarSenha.
        Ele NUNCA vai reiniciar o estado da animação ao trocar entre essas telas. */}
      {estaNoFluxoAuth && (
        <FundoAnimado theme={theme} pararEFinalizar={escurecerESumirFundo} />
      )}
      {children}
    </AuthContext.Provider>
  );
}