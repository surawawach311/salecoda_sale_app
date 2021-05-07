type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Adjust = "ADJUST",
  Delete = "DELETE",
}

type CartType = {
  id: string;
  quantity: number;
  shopId: string;
};

type CartPayload = {
  [Types.Adjust]: {
    id: string;
    quantity: number;
    shopId: string;
  };
  [Types.Delete]: {
    id: string;
    shopId: string;
  };
};

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>];

export const cartReducer = (state: CartType[], action: CartActions) => {
  switch (action.type) {
    case Types.Adjust:
      return [
        ...state,
        {
          id: action.payload.id,
          quantity: action.payload.quantity,
          shopId: action.payload.shopId,
        },
      ];
    case Types.Delete:
      return [
        ...state.filter(
          (item) =>
            item.id !== action.payload.id &&
            item.shopId == action.payload.shopId
        ),
      ];
    default:
      return state;
  }
};
