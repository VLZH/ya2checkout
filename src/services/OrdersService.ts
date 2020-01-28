import { Api } from "../utils";
import { OrdersModel, OrderModel } from "../models";

export class OrdersService {
    constructor(private api: Api) {}

    async createOrder(order: OrderModel): Promise<OrderModel> {
        const data = await this.api.post("/orders/", order);
        const created_order = new OrderModel(data);
        return created_order;
    }

    async getOrders(): Promise<OrdersModel> {
        const data = await this.api.get("/orders/");
        return new OrdersModel(data as OrdersModel);
    }
}
