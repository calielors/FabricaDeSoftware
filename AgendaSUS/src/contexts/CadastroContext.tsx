import React, { createContext, useState, ReactNode } from "react";

type CadastroData = {
  username: string;
  cpf: string;
  email: string;
  password: string;
};

type CadastroContextType = {
  cadastro: CadastroData | null;
  setCadastro: (data: CadastroData) => void;
  clearCadastro: () => void;
};

export const CadastroContext = createContext<CadastroContextType>({
  cadastro: null,
  setCadastro: () => {},
  clearCadastro: () => {},
});

export const CadastroProvider = ({ children }: { children: ReactNode }) => {
  const [cadastro, setCadastroState] = useState<CadastroData | null>(null);

  const setCadastro = (data: CadastroData) => setCadastroState(data);
  const clearCadastro = () => setCadastroState(null);

  return (
    <CadastroContext.Provider value={{ cadastro, setCadastro, clearCadastro }}>
      {children}
    </CadastroContext.Provider>
  );
};
