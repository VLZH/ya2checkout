import { ProductsService } from "../services";
import { Api } from "../utils";
import { ProductModel, PaginationModel } from "../models";
import * as faker from "faker";
import {
    simple_product,
    for_deleting_product
} from "./fixtures/products.fixtures";

describe("ProductsService", () => {
    let api: Api;
    let service: ProductsService;
    beforeAll(() => {
        if (process.env.MERCHANT_ID && process.env.SECRET_KEY) {
            api = new Api(process.env.MERCHANT_ID, process.env.SECRET_KEY);
            service = new ProductsService(api);
        }
    });
    describe("creating", () => {
        it("create product", async () => {
            const product = new ProductModel({
                ...simple_product,
                ProductCode: faker.lorem.slug()
            });
            const created_product = await service.createProduct(product);
        });
    });
    describe("deleting", () => {
        let created_product: any = null;
        it("create product for deleting", async () => {
            const product = new ProductModel({
                ...for_deleting_product,
                ProductCode: faker.lorem.slug()
            });
            created_product = await service.createProduct(product);
        });
        it("delete product", async () => {
            await service.deleteProduct(created_product.ProductCode);
        });
    });
    describe("getting", () => {
        it("Get products", async () => {
            const products = await service.getProducts();
            expect(products.Items).toBeInstanceOf(Array);
            products.Items.map(item =>
                expect(item).toBeInstanceOf(ProductModel)
            );
            expect(products.Pagination).toBeInstanceOf(PaginationModel);
        });
    });
});
