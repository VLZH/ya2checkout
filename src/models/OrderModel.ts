import { ProductModel } from "./ProductModel";
import { PaginationModel } from "./PaginationModel";

export class OrderModel {
    Items: OrderItem[];
    BillingDetails: BillingDetails;
    PaymentDetails: PaymentDetails;
    Currency: string;
    // customer
    CustomerIP: string;
    ExternalCustomerReference?: string;
    CustomerReference?: string;
    //
    Affiliate?: Affiliate;
    Country?: string;
    Language?: string;
    constructor(data: OrderModel) {
        Object.assign(this, data);
    }
}

type OrderItem = CatalogItem | DynamicItem;

export interface CatalogItem {
    Code: string;
    Quantity: string;
}

export interface DynamicItem {
    Name: string;
    Description?: string;
    IsDynamic: boolean;
    Quantity: string;
    Tangible: boolean;
    PurchaseType: "PRODUCT" | "TAX" | "SHIPPING" | "COUPON";
    Price: {
        Amount: string;
        Type: "CUSTOM";
    };
    PriceOptions?: {
        Name: string;
        Value: string;
        Surcharge: number;
    }[];
    Trial?: {
        Period: number; // days
        Price: number;
    };
    RecurringOptions?: {
        CycleLength: number;
        CycleUnit: "YEARS" | "MONTHS";
        CycleAmount: number;
        ContractLength: number;
        ContractUnit: "YEARS" | "MONTHS";
    };
    AdditionalFields?: ProductModel["AdditionalFields"];
    SubscriptionStartDate?: string;
}

export interface BillingDetails {
    Address1: string;
    Address2?: string;
    City: string;
    CountryCode: string;
    Email: string;
    FirstName: string;
    LastName: string;
    FiscalCode: string;
    Phone?: string;
    Company?: string;
    State: string;
    Zip: string;
}

export interface PaymentDetails {
    Currency: string;
    CustomerIP: string;
    Type:
        | "CC" // credit card
        | "PAYPAL"
        | "PAYPAL_EXPRESS"
        | "TEST"
        | "PREVIOUS_ORDER" // link to previous order (get requisites)
        | "WIRE"
        | "CHECK"
        | "PURCHASEORDER"
        | "FREE";
    PaymentMethod?:
        | CardPaymentMethod
        | PayPalExpressPaymentMethod
        | PrevioudOrderPaymentMethod
        | PurchaseOrderPaymentMethod
        | 0;
}

export type CardType = "VISA" | "MASTERCARD";

export interface CardPaymentMethod {
    CCID?: string;
    CardNumber?: string;
    CardNumberTime?: string;
    CardType?: CardType;
    ExpirationMonth?: string;
    ExpirationYear?: string;
    HolderName?: string;
    HolderNameTime?: string;
    InstallmentsNumber?: string;
    RecurringEnabled?: boolean;
    Vendor3DSReturnURL?: string;
    Vendor3DSCancelURL?: string;
}

export interface PayPalExpressPaymentMethod {
    Email: string;
    ReturnURL: string;
}

export interface PrevioudOrderPaymentMethod {
    RefNo: string;
}

export interface PurchaseOrderPaymentMethod {
    InternalPONumber: string;
    AutoApprove: boolean;
}

export interface Affiliate {
    AffiliateCode: string;
    AffiliateSource: string;
}

export class OrdersModel {
    Items: OrderModel[];
    Pagination: PaginationModel;
    constructor(data: OrdersModel) {
        this.Items = data.Items.map((item: any) => new OrderModel(item));
        this.Pagination = new PaginationModel(data.Pagination);
    }
}
