import { ShopDataSource } from "../datasource/ShopDataSource";
import { ShopEntity } from "../entities/ShopEntity";
import _ from "lodash";

export class ShopFacade {
    static getShopListData(): Promise<ShopEntity[]> {
        return ShopDataSource.getShop().then((res) => {
            return res.data
        });
    }
}
