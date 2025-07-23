/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";
import { Anuncio } from "../data/Anuncio";

interface AnuncioContextData {
  anuncio: Anuncio;
  setAnuncio: React.Dispatch<React.SetStateAction<Anuncio>>;
  getAnuncio: (id: number) => Promise<void>;
}

export const AnuncioContext = createContext({} as AnuncioContextData);
interface AnuncioProviderProps {
  children: React.ReactNode;
}

export const AnuncioProvider: React.FC<AnuncioProviderProps> = ({
  children,
}) => {
  const [anuncio, setAnuncio] = useState<Anuncio>({} as Anuncio);

  const getAnuncio = async (id: number) => {
    const response = await axios.get(`http://localhost:3001/anuncio/${id}`);
    setAnuncio(response.data);
  };

  return (
    <AnuncioContext.Provider value={{ getAnuncio, anuncio, setAnuncio }}>
      {children}
    </AnuncioContext.Provider>
  );
};
