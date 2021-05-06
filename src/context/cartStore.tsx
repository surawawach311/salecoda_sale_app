import React, { createContext, useReducer, Dispatch } from "react";
import { cartReducer, CartActions } from "../context/cartReducer";

type CartType = {
  id: string;
  quantity: number;
  shopId: string;
};

type InitialStateType = {
  carts: CartType[];
};

const initialState = {
  carts: []
};

const CartContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<CartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { carts }: InitialStateType,
  action: CartActions
) => ({
  carts: cartReducer(carts, action),
});

const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
