import { Produto } from "./Produto";

export interface Anuncio {
  id: number;
  preco: number;
  estoque: number;
  produto_id: number;
  produto: Produto;
}
