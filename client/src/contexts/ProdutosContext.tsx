/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { Produto } from "../data/Produto";
import axios from "axios";
import { Anuncio } from "../data/Anuncio";

interface ProdutosContextData {
  products: Produto[];
  product: Produto & Anuncio;
  setProduct: React.Dispatch<React.SetStateAction<Produto & Anuncio>>;
  setProducts: React.Dispatch<React.SetStateAction<Produto[]>>;
  getProduct: (id: number) => Promise<void>;
}

export const ProdutoContext = createContext({} as ProdutosContextData);
interface ProdutosProviderProps {
  children: React.ReactNode;
}

export const ProdutosProvider: React.FC<ProdutosProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Produto[]>([]);
  const [product, setProduct] = useState<Produto & Anuncio>(
    {} as Produto & Anuncio
  );

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:3001/produtos");
      setProducts(response.data);
    };

    getProducts();
  }, []);

  const getProduct = async (id: number) => {
    const response = await axios.get(`http://localhost:3001/produtos/${id}`);
    setProduct(response.data);
    console.log(response.data);
  };

  return (
    <ProdutoContext.Provider
      value={{ products, setProducts, getProduct, product, setProduct }}
    >
      {children}
    </ProdutoContext.Provider>
  );
};
