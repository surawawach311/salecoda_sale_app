import { OrderEntity } from "./OrderEntity";

export interface OrderListEntity {
  orders: OrderEntity[],
  total: number,
}
