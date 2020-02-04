import * as faker from "faker";
import { OrdersService, ProductsService } from "../services";
import { Api } from "../utils";
import {
    simple_order,
    dynamic_products_order
} from "./fixtures/orders.fixtures";
import { simple_product } from "./fixtures/products.fixtures";
import { OrderModel, PaginationModel, ProductModel } from "../models";

const SLEEP_TIME = 1;

const sleep = (seconds: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
};

describe("OrdersService", () => {
    let api: Api;
    let service: OrdersService;
    let products_service: ProductsService;
    beforeAll(() => {
        if (process.env.MERCHANT_ID && process.env.SECRET_KEY) {
            api = new Api(process.env.MERCHANT_ID, process.env.SECRET_KEY);
            service = new OrdersService(api);
            products_service = new ProductsService(api);
        }
    });
    describe("creating", () => {
        let product: ProductModel | null = null;
        it("create product", async () => {
            product = new ProductModel({
                ...simple_product,
                ProductCode: faker.lorem.slug()
            });
            expect(product).not.toBeNull();
            expect(async () =>
                products_service.createProduct(product as ProductModel)
            ).not.toThrow();
        });
        it("Create simple order", async () => {
            expect(product).not.toBeNull();
            // We must to wait couple seconds after creating of new product
            console.log(
                `wait ${SLEEP_TIME} seconds while product will created`
            );
            await sleep(SLEEP_TIME);
            const order = new OrderModel({
                ...simple_order,
                Items: [
                    {
                        Code: (product as ProductModel).ProductCode,
                        Quantity: "1"
                    }
                ]
            });
            const created_order = await service.createOrder(order);
            expect(created_order).toBeInstanceOf(OrderModel);
        }, 30000);
        it("Create order with dynamic products", async () => {
            const order = new OrderModel(dynamic_products_order);
            const created_order = await service.createOrder(order);
            expect(created_order).toBeInstanceOf(OrderModel);
        }, 30000);
    });
    describe("getting", () => {
        it("Get orders", async () => {
            const orders = await service.getOrders();
            expect(orders.Items).toBeInstanceOf(Array);
            orders.Items.map(item => expect(item).toBeInstanceOf(OrderModel));
            expect(orders.Pagination).toBeInstanceOf(PaginationModel);
        });
    });
});
