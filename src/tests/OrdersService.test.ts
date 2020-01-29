import * as faker from "faker";
import { OrdersService, ProductsService } from "../services";
import { Api } from "../utils";
import {
    simple_order,
    dynamic_products_order
} from "./fixtures/orders.fixtures";
import { simple_product } from "./fixtures/products.fixtures";
import {
    OrderModel,
    OrdersModel,
    PaginationModel,
    ProductModel
} from "../models";

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
            const created_product = await products_service.createProduct(
                product
            );
        });
        it("Create simple order", async () => {
            expect(product).not.toBeNull();
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
