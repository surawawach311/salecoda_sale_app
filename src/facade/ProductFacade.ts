import { ProductDataSource } from "../datasource/ProductDataSource";
import { ProductEntity } from "../entities/ProductEntity";

export class ProductFacade {
    static getProductName(shopId: string): Promise<ProductEntity> {
        return ProductDataSource.getNameProduct(shopId).then((res) => res);
    }
}