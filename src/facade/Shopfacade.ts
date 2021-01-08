import { ShopDataSource } from "../datasource/ShopDataSource";
import { ShopEntity } from "../entities/ShopEntity";
import _ from "lodash";

export class ShopFacade {
    static getShopListData(territory: string): Promise<ShopEntity[]> {
        return ShopDataSource.getShop(territory).then((res) => {
            return res.data
        });
    }
}
