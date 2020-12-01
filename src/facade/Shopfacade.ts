import { ShopDataSource } from "../datasource/ShopDataSource";
import { ShopEntity } from "../entities/ShopEntity";
import _ from "lodash";

export class ShopFacade {
    static getShopListData(): Promise<_.Object<_.Dictionary<ShopEntity[]>>> {
        return ShopDataSource.getShop().then((res) => {
            return _(res.data).groupBy("territory")
        });
    }
}
