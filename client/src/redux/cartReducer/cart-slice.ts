import { createSlice } from "@reduxjs/toolkit";
import { Carrinho } from "../../types/Carrinho";

interface CarrinhoState {
  carrinho: Carrinho[];
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
      localStorage.setItem("carrinho", JSON.stringify(state.carrinho));
    },
  },
});

export const { addProduto } = cartSlice.actions;
