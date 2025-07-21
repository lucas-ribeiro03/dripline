import { combineReducers } from "redux";
import { cartSlice } from "./cartReducer/cart-slice";

export const rootReducer = combineReducers({
  cartReducer: cartSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
