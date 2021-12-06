export interface ProductCategoryEntity {
    company: string,
    code: string,
    name: string,
    logo?: string | null,
    icon_regular?: string | null,
    icon_hover?: string | null,
    navision_updated?: string | null,
    is_active: boolean,
    created_at: string | null,
    updated_at: string | null
}