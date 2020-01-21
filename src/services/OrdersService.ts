import { Api } from "../utils";
import {OrdersModel} from "../models";

export class OrdersService {
    constructor(private api: Api) {}
    async getOrders(): Promise<OrdersModel> {
        const data = await this.api.get("/orders");
        return new OrdersModel(data as OrdersModel);
    }
}
