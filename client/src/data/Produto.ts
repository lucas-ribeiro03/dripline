export interface Produto {
  id: number;
  categoria: {
    id: number;
    nome: string;
  };
  nome: string;
  img_principal: string;
  img_secundaria?: string;
  preco_base: number;
  tipo_produto: string;
}
