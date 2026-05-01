import { Slot, usePathname } from "expo-router";
import { useEffect } from "react";
import { AuthProvider } from "../src/contexts/AuthContext";
import { ThemeProvider, useTheme } from "../src/contexts/ThemeContext";
import { Top_Bar } from "@/src/assets/components/topbar";

function GerenciadorDeProgresso() {
  const { atualizarBarra, configBarra } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    // Extraímos a última parte da URL para o switch comparar
    // Ex: "/home/unidade" vira "unidade"
    const rotaAtual = pathname.split('/').pop() || "";

    let etapa: number | undefined;
    let total: number | undefined = 3;

    switch (rotaAtual) {
      case "unidade":
      case "recuperar":
        etapa = 1;
        break;

      case "profissionais":
      case "validar":
        etapa = 2;
        break;

      case "agendar":
      case "alterar":
        etapa = 3;
        break;

      default:
        etapa = undefined;
        total = undefined;
        break;
    }

    atualizarBarra(etapa, total);
  }, [pathname]);

  return (
    <Top_Bar 
      key={pathname} // A 'key' força a Top_Bar a se atualizar visualmente na troca de rota
      etapaAtual={configBarra.etapa} 
      totalEtapas={configBarra.total} 
    />
  );
}

export default function RootLayout() {
  return (  
    <AuthProvider>
      <ThemeProvider>
        <GerenciadorDeProgresso />
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}