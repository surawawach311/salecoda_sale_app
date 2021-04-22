import { ShopDataSource } from "../datasource/ShopDataSource";
import { ShopEntity } from "../entities/ShopEntity";
import _ from "lodash";

export class ShopFacade {
    static getShopListData(territory: string, keywords?: string): Promise<ShopEntity[]> {
        return ShopDataSource.getShop(territory, keywords).then((res) => {
            return res.data
        });
    }
}
