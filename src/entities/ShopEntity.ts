export interface ShopEntity {
    id: string
    name: string
    address: string
    sub_district: string
    district: string
    province: string
    post_code: string
    telephone: string
    shop_no: string
    territory: string
    zone: string
}

export interface BrandEntity {
    id: string
    brand_no:string
    company: string
    product_brand: string
    image: string
    product_brand_name: string
}
export interface ApiShopEntity {
    items: ShopEntity[]
    links: {
        first: string
        last: string
        next: string
        previous: string
    }
    meta: {
        currentPage: number
        itemCount: number
        itemsPerPage: number
        totalItems: number
        totalPages: number
    }
}
