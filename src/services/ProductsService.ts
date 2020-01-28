import { Api } from "../utils";
import { ProductsModel, ProductModel } from "../models";

export class ProductsService {
    constructor(private api: Api) {}

    async createProduct(product: ProductModel): Promise<ProductModel> {
        await this.api.post("/products/", product);
        const created_order = new ProductModel({
            ...product
        });
        return created_order;
    }

    async deleteProduct(product_code: string): Promise<void> {
        await this.api.delete(`/products/${product_code}/`);
    }

    async getProducts(): Promise<ProductsModel> {
        const data = await this.api.get("/products/");
        return new ProductsModel(data as ProductsModel);
    }
}
