import { createSlice } from "@reduxjs/toolkit";
import { Carrinho } from "../../types/Carrinho";

interface CarrinhoState {
  carrinho: Carrinho[];
}

const initialState: CarrinhoState = {
  carrinho: JSON.parse(localStorage.getItem("carrinho") || "[]"),
};

export const cartSlice = createSlice({
  initialState,
  name: "carrinho",
  reducers: {
    addProduto: (state, action) => {
      const produtoExistente = state.carrinho.find(
        (item) => item.produto_id === action.payload.produto_id
      );

      if (produtoExistente) {
        // Atualiza a quantidade do item existente
        state.carrinho = state.carrinho.map((item) => {
          if (item.produto_id === action.payload.produto_id) {
            return {
              ...item,
              quantidade: item.quantidade + 1,
            };
          }
          return item;
        });
      } else {
        // Adiciona o novo produto com quantidade 1, se não existir
        state.carrinho = [
          ...state.carrinho,
          { ...action.payload, quantidade: 1 },
        ];
      }

      localStorage.setItem("carrinho", JSON.stringify(state.carrinho));
    },

    removerProduto: (state, action) => {
      state.carrinho = state.carrinho.filter(
        (produto) => produto.produto_id !== action.payload
      );

      localStorage.setItem("carrinho", JSON.stringify(state.carrinho));
    },
  },
});

export const { addProduto, removerProduto } = cartSlice.actions;
