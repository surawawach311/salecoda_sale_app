import React, { createContext, Reducer, useEffect, useReducer } from "react";
import { CartDataSource } from "../datasource/CartDataSource";
import { CartEntity } from "../entities/CartEntity";

export const CartQuantityContext = createContext({});

interface State {
  count: number;
}

type Actions = "reset" | "increment" | "decrement";

interface Action {
  payload: number;
  type: Actions;
}

const initialState: State = { count: 0 };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      return state;
  }
};

const CounterReducer: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const resetCounter = (payload: any) => dispatch({ type: "reset", payload });
  const addCounter = (payload: any) => dispatch({ type: "increment", payload });
  const subCounter = (payload: any) => dispatch({ type: "decrement", payload });

  return (
    <CartQuantityContext.Provider
      value={{ state, addCounter, subCounter, resetCounter }}
    >
      {children}
    </CartQuantityContext.Provider>
  );
};

export default CounterReducer;
