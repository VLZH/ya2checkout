import { ProductModel } from "./ProductModel";
import { PaginationModel } from "./PaginationModel";

export class OrderModel {
    Items: ProductModel[];
    constructor(data: OrderModel) {}
}

export class OrdersModel {
    Items: OrderModel[];
    Pagination: PaginationModel;
    constructor(data: OrdersModel) {
        this.Items = data.Items.map((item: any) => new OrderModel(item));
        this.Pagination = new PaginationModel(data.Pagination);
    }
}
