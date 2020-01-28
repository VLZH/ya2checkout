import { PaginationModel } from "./PaginationModel";

export class ProductModel {
    AvantageId?: number | null;
    ProductCode: string;
    ProductType: ProductType;
    ProductId?: number;
    Enabled?: boolean;
    ProductVersion?: string;
    ProuductGroup?: ProuductGroup | null;
    // description
    ProductName: string;
    ShortDescription?: string | null;
    LongDescription?: string | null;
    Translations?: ProductTranslation[];
    AdditionalFields?: AdditionalField[];
    ProductCategory?: string;
    // pricing
    Discount?: number;
    DiscountType?: "PERCENT";
    PricingConfigurations: PriceConfiguration[];
    Prices?: any; // TODO: define type
    // bundle
    BundleProducts?: any[]; // TODO: define type
    // fullfilment
    Fullfilment?: string;
    FullfilmentInformation?: FullfilmentInformation;
    // subscription
    GeneratesSubscription?: boolean;
    SubscriptionInformation?: SubscriptionInformation;
    // another
    ChangeOptionsQuantityAtManualRenewal?: boolean;
    PurchaseMultipleUnits?: boolean;
    // errors
    Errors?: string[];
    constructor(data: ProductModel) {
        Object.assign(this, data);
    }
}

type ProductType = "REGULAR" | "BUNDLE";

interface ProuductGroup {}

interface ProductTranslation extends ProductModel {
    Language: string;
}

export interface PriceConfiguration {
    Name?: string;
    Code?: string | null;
    Default?: boolean;
    BillingCountries?: any[];
    UseOriginalPrices?: boolean;
    PricingSchema: "DYNAMIC";
    PriceType?: "NET";
    DefaultCurrency?: string;
    Prices: {
        Regular: Price[];
        Renewal: Price[];
    };
}

interface Price {
    Amount: number;
    Currency: string;
    MinQuantity: number;
    MaxQuantity: number;
    OptionCodes: any[]; // TODO: define type
}

interface FullfilmentInformation {
    IsStartAfterFulfillment: boolean;
    IsElectronicCode: boolean;
    IsDownloadLink: boolean;
    IsBackupMedia: boolean;
    IsDownloadInsuranceService: boolean;
    IsInstantDeliveryThankYouPage: boolean;
    IsDisplayInPartnersCPanel: boolean;
    CodeList?: {
        Code?: string;
        Name?: string;
        Type?: string;
    };
    BackupMedia?: {
        Code?: string;
        Name?: string;
        Type?: string;
    };
    ProductFile?: {
        Code?: string;
        Name?: string;
        File?: string;
        Version?: string;
        Size?: string;
        Type?: string;
        LastUpdate?: string;
    };
    AdditionalInformationByEmail?: string;
    AdditionalInformationEmailTranslations?: [
        {
            Name?: string;
            Description?: string;
            Language?: string;
        }
    ];
    AdditionalThankYouPage?: string;
    AdditionalThankYouPageTranslations?: [
        {
            Name?: string;
            Description?: string;
            Language?: string;
        }
    ];
    ReturnMethod: {
        Type: string | null;
        URL: string | null;
    };
}

interface SubscriptionInformation {
    DeprecatedProducts?: [any];
    BundleRenewalManagement?: string;
    BillingCycle?: string;
    BillingCycleUnits?: string;
    IsOneTimeFee?: boolean;
    ContractPeriod?: {
        Action?: string;
        EmailsDuringContract?: boolean;
        Period?: number;
        PeriodUnits?: string;
        IsUnlimited?: boolean;
    };
    UsageBilling?: number;
    GracePeriod?: {
        Type?: string;
        PeriodUnits?: string;
        Period?: string;
        IsUnlimited?: boolean;
    };
    RenewalEmails?: {
        Type?: string;
        Settings?: {
            ManualRenewal?: {
                Before30Days?: boolean;
                Before15Days?: boolean;
                Before7Days?: boolean;
                Before1Day?: boolean;
                OnExpirationDate?: boolean;
                After5Days?: boolean;
                After15Days?: boolean;
            };
            AutomaticRenewal?: {
                Before30Days?: boolean;
                Before15Days?: boolean;
                Before7Days?: boolean;
                Before1Day?: boolean;
                OnExpirationDate?: boolean;
                After5Days?: boolean;
                After15Days?: boolean;
            };
        };
    };
}

interface AdditionalField {
    Code: string;
    Text: string;
    Value: string;
}

export class ProductsModel {
    Items: ProductModel[];
    Pagination: PaginationModel;
    constructor(data: ProductsModel) {
        this.Items = data.Items.map(item => new ProductModel(item));
        this.Pagination = new PaginationModel(data.Pagination);
    }
}
