/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { Produto } from "../data/Produto";
import axios from "axios";

interface ProdutosContextData {
  products: Produto[];
  setProducts: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const ProdutoContext = createContext({} as ProdutosContextData);
interface ProdutosProviderProps {
  children: React.ReactNode;
}

export const ProdutosProvider: React.FC<ProdutosProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Produto[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:3001/produtos");
      setProducts(response.data);
    };

    getProducts();
  });

  return (
    <ProdutoContext.Provider value={{ products, setProducts }}>
      {children}
    </ProdutoContext.Provider>
  );
};
