import { createSlice } from "@reduxjs/toolkit";
import { Produto } from "../../types/Produto";

interface CarrinhoState {
  carrinho: Produto[];
}

const initialState: CarrinhoState = {
  carrinho: JSON.parse(localStorage.getItem("produtos no carrinho") || "[]"),
};

export const cartSlice = createSlice({
  initialState,
  name: "carrinho",
  reducers: {
    addProduto: (state, action) => {
      state.carrinho = [...state.carrinho, action.payload];
      localStorage.setItem(
        "produtos no carrinho",
        JSON.stringify(state.carrinho)
      );
    },
  },
});

export const { addProduto } = cartSlice.actions;
