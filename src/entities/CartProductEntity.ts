import { ProductEntity } from "./ProductEntity";

export interface CartProductEntity extends ProductEntity {
    quantity: number;
    total_price: number;
}