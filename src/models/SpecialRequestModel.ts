

export interface ItemSpecialRequest {
    price_id?: string
    amount?: number | string
}

export interface ProductSpecialRequestModel {
    id: string;
    name: string;
    image: string;
    quantity: number;
    sale_unit: string;
    promotion_discount: any;
    total_price: number;
    discount?: number;
}