import { OrdersService, ProductsService } from "./services";
import { Api, ConvertPlusUrlGenerator } from "./utils";

export class Twocheckout {
    productsService: ProductsService;
    ordersService: OrdersService;
    api: Api;
    constructor(private merchant_id: string, private service_key: string) {
        this.api = new Api(merchant_id, service_key);
        this.productsService = new ProductsService(this.api);
        this.ordersService = new OrdersService(this.api);
    }
}

export { ConvertPlusUrlGenerator };

export default Twocheckout;
