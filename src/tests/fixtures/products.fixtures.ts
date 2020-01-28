import { ProductModel, PriceConfiguration } from "../../models";

const DEFAULT_PRICE_CONFIGURATION: PriceConfiguration = {
    PriceType: "NET",
    DefaultCurrency: "USD",
    Default: true,
    PricingSchema: "DYNAMIC",
    Prices: {
        Regular: [
            {
                Amount: 100,
                Currency: "USD",
                MinQuantity: 1,
                MaxQuantity: 1000,
                OptionCodes: []
            }
        ],
        Renewal: []
    }
};

export const simple_product: ProductModel = {
    ProductCode: "simple_product",
    ProductType: "REGULAR",
    ProductName: "Simple Product",
    Enabled: true,
    PricingConfigurations: [DEFAULT_PRICE_CONFIGURATION],
    ShortDescription: "Short description",
    LongDescription: "Long description"
};

export const for_deleting_product: ProductModel = {
    ProductCode: "product_for_deleting",
    ProductType: "REGULAR",
    ProductName: "Product for deleting",
    Enabled: true,
    PricingConfigurations: [DEFAULT_PRICE_CONFIGURATION]
};
