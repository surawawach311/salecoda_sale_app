import React, { createContext, useReducer, Dispatch, useState } from "react";
import { productReducer, ProductActions } from "../context/cartReducer";
import { CartDataSource } from "../datasource/CartDataSource";

type ProductType = {
  id: string;
  quantity: number;
  shopId: string;
};

type InitialStateType = {
  products: ProductType[];
};

const initialState = {
  products: []
};

const CartContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ProductActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { products }: InitialStateType,
  action: ProductActions
) => ({
  products: productReducer(products, action),
});

const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [cart,setCart] = useState<ProductType[]>([])


  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
