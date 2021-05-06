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
  Delete = "DELETE_PRODUCT",
}

// Product

type ProductType = {
  id: string;
  quantity: number;
  shopId: string;
};

type ProductPayload = {
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

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const productReducer = (
  state: ProductType[],
  action: ProductActions
) => {
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
          (product) =>
            product.id !== action.payload.id &&
            product.shopId == action.payload.shopId
        ),
      ];
    default:
      return state;
  }
};

// ShoppingCart

// type ShoppingCartPayload = {
//   [Types.Increase]: undefined;
//   [Types.Dencrease]: undefined;
// };

// export type ShoppingCartActions = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

// export const shoppingCartReducer = (
//   state: number,
//   action: ProductActions | ShoppingCartActions
// ) => {
//   switch (action.type) {
//     case Types.Increase:
//       return state + 1;
//     case Types.Dencrease:
//       return state - 1;
//     default:
//       return state;
//   }
// };
