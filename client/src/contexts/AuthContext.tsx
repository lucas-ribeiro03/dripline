/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";
import { Usuario } from "../types/Usuario";

interface AuthContextData {
  user: Usuario;
  setUser: React.Dispatch<React.SetStateAction<Usuario>>;
  getUser: (id: number) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario>({} as Usuario);

  const getUser = async (id: number) => {
    const response = await axios.get(`http://localhost:3001/auth/${id}`);
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ getUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
