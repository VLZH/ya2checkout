import { OrdersService } from "../services";
import { Api } from "../utils";

it("Required envs provided", () => {
    expect(typeof process.env.MERCHANT_ID).toBe("string");
    expect(typeof process.env.SECRET_KEY).toBe("string");
});

describe("OrdersService", () => {
    let api: Api;
    let service: OrdersService;
    beforeAll(() => {
        if (process.env.MERCHANT_ID && process.env.SECRET_KEY) {
            api = new Api(process.env.MERCHANT_ID, process.env.SECRET_KEY);
            service = new OrdersService(api);
        }
    });
    it("Getting orders", async () => {
        console.log(await service.getOrders());
    });
});
