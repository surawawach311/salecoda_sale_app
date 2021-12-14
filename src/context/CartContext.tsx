import React, { useReducer, useMemo } from 'react'

type CartContext = {
  getItemCount: () => number
  add: (id: string, qty: number, shopNo: string) => void
  adjust: (id: string, qty: number, shopNo: string) => void
  remove: (id: string, shopNo: string) => void
  getQty: (id: string, shopNo: string) => number
}

type CartState = {
  items: { id: string; qty: number; shopNo: string }[]
}

type CartAction = {
  type: CartActionType
  id?: string
  qty?: number
  shopNo: string
}

enum CartActionType {
  Add = 'ADD',
  Adjust = 'ADJUST',
  Remove = 'REMOVE',
}

export const CartContext = React.createContext<CartContext | undefined>(undefined)

type ProviderProp = {
  items?: { id: string; qty: number; shopNo: string }[]
}

export const CartContextProvider: React.FC<ProviderProp> = ({ children, items }) => {
  // TODO: handle state with cart api
  const [state, dispatch] = useReducer(
    (s: CartState, a: CartAction): CartState => {
      switch (a.type) {
        case CartActionType.Add: {
          const replicas = s.items.slice()
          a.id && replicas.push({ id: a.id, qty: Number(a.qty), shopNo: a.shopNo })
          return { ...s, items: replicas }
        }
        case CartActionType.Adjust: {
          const replicas = s.items.slice()
          const item = replicas.find((i) => i.id === a.id)
          if (item) {
            const index = replicas.indexOf(item)
            if (a.qty) {
              replicas[index] = { ...item, qty: a.qty }
            }
          } else {
            a.id && replicas.push({ id: a.id, qty: Number(a.qty), shopNo: a.shopNo })
          }
          return { ...s, items: replicas }
        }
        case CartActionType.Remove: {
          const replicas = s.items.slice()
          const item = replicas.find((i) => i.id === a.id)
          if (item) {
            const index = replicas.indexOf(item)
            replicas.splice(index, 1)
          }
          return { ...s, items: replicas }
        }
      }
    },
    { items: items ? items : [] },
  )

  const cartContext = useMemo(
    () => ({
      getItemCount: () => {
        return state.items.length
      },
      add: (id: string, qty: number, shopNo: string) => {
        dispatch({ type: CartActionType.Add, id, qty, shopNo })
      },
      adjust: (id: string, qty: number, shopNo: string) => {
        dispatch({ type: CartActionType.Adjust, id, qty, shopNo })
      },
      remove: (id: string, shopNo: string) => {
        dispatch({ type: CartActionType.Remove, id, shopNo })
      },

      getQty: (id: string, shopNo: string) => {
        const item = state.items.find((i) => i.id === id && i.shopNo == shopNo)
        return item ? item.qty : 0
      },
    }),
    [state.items],
  )

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}
