import { OrderModel, CardPaymentMethod } from "../../models";

const DEFAULT_BILLING_DETAILS = {
    Address1: "Test Address",
    City: "LA",
    CountryCode: "BR",
    Email: "customer@2Checkout.com",
    FirstName: "Customer",
    FiscalCode: "056.027.963-98",
    LastName: "2Checkout",
    Phone: "556133127400",
    State: "DF",
    Zip: "70403-900"
};

const CUSTOMER_IP = "91.220.121.21";

const TEST_CARD: CardPaymentMethod = {
    CCID: "123",
    CardNumber: "4111111111111111",
    CardNumberTime: "12",
    CardType: "VISA",
    ExpirationMonth: "12",
    ExpirationYear: "2020",
    HolderName: "John Doe",
    HolderNameTime: "12",
    RecurringEnabled: true,
    Vendor3DSReturnURL: "www.test.com",
    Vendor3DSCancelURL: "www.test.com"
};

export const simple_order: OrderModel = {
    BillingDetails: DEFAULT_BILLING_DETAILS,
    PaymentDetails: {
        Type: "TEST",
        Currency: "usd",
        CustomerIP: CUSTOMER_IP,
        PaymentMethod: TEST_CARD
    },
    Language: "en",
    Country: "us",
    Currency: "usd",
    CustomerIP: CUSTOMER_IP,
    Items: [
        {
            Code: "first_product",
            Quantity: "1"
        }
    ]
};

export const dynamic_products_order: OrderModel = {
    BillingDetails: DEFAULT_BILLING_DETAILS,
    PaymentDetails: {
        Type: "TEST",
        Currency: "usd",
        CustomerIP: CUSTOMER_IP,
        PaymentMethod: TEST_CARD
    },
    Language: "en",
    Country: "us",
    Currency: "usd",
    CustomerIP: CUSTOMER_IP,
    Items: [
        {
            // Code: "NULL",
            IsDynamic: true,
            Name: "Some service",
            Description: "Some service description",
            Quantity: "1",
            Tangible: true,
            PurchaseType: "PRODUCT",
            Price: {
                Amount: "100",
                Type: "CUSTOM"
            }
        }
    ]
};
