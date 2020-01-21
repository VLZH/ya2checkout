import { Api } from "../utils";
import {ProductsModel} from "../models";

export class ProductsService {
    constructor(private api: Api) {}
    async getProducts(): Promise<ProductsModel> {
        const data = await this.api.get("/orders");
        return new ProductsModel(data as ProductsModel);
    }
}

