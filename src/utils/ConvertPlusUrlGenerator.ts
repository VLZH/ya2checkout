/**
 * For more information: https://knowledgecenter.2checkout.com/Documentation/07Commerce/2Checkout-ConvertPlus/ConvertPlus_URL_parameters
 */
import * as qs from "qs";
import * as crypto from "crypto";
import { TWOCHEKCOUT_BUY_LINK_URL } from "../constances";

const REQUIRED_FOR_SIGNATURE = [
    "return-url",
    "return-type",
    "expiration",
    "order-ext-ref",
    "item-ext-ref",
    "customer-ref",
    "customer-ext-ref"
];

const REQUIRED_FOR_DYNAMIC = [
    "currency",
    "prod",
    "price",
    "qty",
    "tangible",
    "type",
    "opt",
    "description",
    "recurrence",
    "duration",
    "renewal-price"
];

const REQUIRED_FOR_RENEWAL_MANUAL = ["prod", "qty", "opt"];

const REQUIRED_FOR_ON_THE_FLY = ["prod", "price", "qty", "opt", "coupon"];

export class ConvertPlusUrlGeneratorError extends Error {}

export class RequiredForDynamicProductsError extends Error {
    constructor(field: string) {
        super(`field ${field} is required for dynamic products`);
    }
}

abstract class BaseConvertPlusUrlGenerator {
    // billing information
    public email?: string;
    public name?: string;
    public phone?: string;
    public country?: string;
    public state?: string;
    public address?: string;
    public address2?: string;
    public zip?: string;
    // delivery information
    public shipName?: string;
    public shipCountry?: string;
    public shipState?: string;
    public shipAddress?: string;
    public shipAddress2?: string;
    public shipZip?: string;
    // product information
    public dynamic: boolean;
    public prod: string[];
    public itemExtRef?: string;
    public type?: "product" | "shipping" | "tax";
    public qty: number[];
    public price?: ({ [key: string]: number } | number)[];
    public tangible?: boolean;
    public opt?: string;
    public description?: string;
    public recurrence?: {
        DAY?: number;
        WEEK?: number;
        MONTH?: number;
        YEAR?: number;
        FOREVER?: number;
    }[];
    public duration?: string;
    public renewalPrice?: string;
    // cart behavior
    public merchant: string;
    public subscription?: string;
    public expiration?: number;
    public returnUrl?: string;
    public returnType?: "Link" | "Redirect";
    public coupon?: string[];
    public src?: string;
    public tpl?: "default" | "one-column" | string;
    public currency?: string;
    public emptyCart?: boolean;
    public orderExtRef?: string;
    public language?: string;
    public originUrl?: string;
    public style?: string;
    public test?: boolean;
    public customerRef?: string;
    public customerExtRef?: string;
    public lock?: boolean;
}

const getKeyOfFirstTruthyValue = (value: {
    [key: string]: any;
}): string | undefined => {
    return Object.keys(value).find(key => value[key]);
};

const translateBooleanValue = (
    value: undefined | boolean
): string | undefined => {
    if (value === undefined) return value;
    return value ? "1" : "0";
};

export class ConvertPlusUrlGenerator extends BaseConvertPlusUrlGenerator {
    constructor(
        public merchant: string,
        public secret_word: string,
        data: BaseConvertPlusUrlGenerator
    ) {
        super();
        Object.assign(this, data);
        // this.check();
    }

    getUrl(): string {
        return `${TWOCHEKCOUT_BUY_LINK_URL}?${qs.stringify(
            this.getParameters()
        )}`;
    }

    /**
     * Get parameters for url in right form
     */
    getParameters(): { [key: string]: string } {
        let params: { [key: string]: any } = {
            email: this.email,
            name: this.name,
            phone: this.phone,
            country: this.country,
            state: this.state,
            address: this.address,
            address2: this.address2,
            zip: this.zip,
            "ship-name": this.shipName,
            "ship-country": this.shipCountry,
            "ship-state": this.shipState,
            "ship-address": this.shipAddress,
            "ship-address2": this.shipAddress2,
            "ship-zip": this.shipZip,
            dynamic: translateBooleanValue(this.dynamic),
            prod: this.prod.join(";"),
            "item-ext-ref": this.itemExtRef,
            type: this.type,
            qty: this.qty.join(";"),
            price: this.getPrice(),
            tangible: translateBooleanValue(this.tangible),
            opt: this.opt,
            description: this.description,
            recurrence: this.getRecurrence(),
            duration: this.duration,
            "renewal-price": this.renewalPrice,
            merchant: this.merchant,
            subscription: this.subscription,
            expiration: this.expiration,
            "return-url": this.returnUrl,
            "return-type": this.returnType,
            coupon: this.coupon ? this.coupon.join(";") : undefined,
            src: this.src,
            tpl: this.tpl,
            currency: this.currency,
            "empty-cart": translateBooleanValue(this.emptyCart),
            "order-ext-ref": this.orderExtRef,
            language: this.language,
            "origin-url": this.originUrl,
            style: this.style,
            test: translateBooleanValue(this.test),
            "customer-ref": this.customerRef,
            "customer-ext-ref": this.customerExtRef,
            lock: translateBooleanValue(this.lock)
        };
        // filter parameters with undefined
        params = Object.keys(params).reduce(
            (acc: { [key: string]: any }, key: string) => {
                if (params[key] !== undefined) {
                    acc[key] = params[key];
                }
                return acc;
            },
            {}
        );
        return {
            ...params,
            signature: this.getSignature(params)
        };
    }

    private getPrice(): string | undefined {
        return this.price
            ? this.price
                  .map((v: { [key: string]: number } | number): string => {
                      if (typeof v === "object") {
                          const first_key = Object.keys(v)[0];
                          return `${first_key}:${v[first_key]}`;
                      } else {
                          return v.toString();
                      }
                  })
                  .join(";")
            : undefined;
    }

    private getRecurrence(): string | undefined {
        return this.recurrence
            ? this.recurrence
                  .map((obj: any) => {
                      const k = getKeyOfFirstTruthyValue(obj);
                      if (k === undefined) {
                          return undefined;
                      }
                      return `${k}:${obj[k]}`;
                  })
                  .filter(v => v)
                  .join(";")
            : undefined;
    }

    private getSignature(parameters: { [key: string]: string }): string {
        const fields = [
            ...REQUIRED_FOR_SIGNATURE,
            ...(this.dynamic ? REQUIRED_FOR_DYNAMIC : [])
        ];
        const keys = Object.keys(parameters)
            .filter(
                key => fields.includes(key) && parameters.hasOwnProperty(key)
            )
            .sort();
        const str = keys.reduce((acc: string, cur: string) => {
            return `${acc}${parameters[cur].length}${parameters[cur]}`;
        }, "");
        const hasher = crypto.createHmac("sha256", this.secret_word);
        hasher.update(str);
        return hasher.digest("hex").toString();
    }

    //check() {
    //if (this.dynamic) {
    //this.checkRequiredForDynamicProducts();
    //} else {
    //this.checkRequiredForCatalogProducts();
    //}
    //}

    //private checkRequiredForDynamicProducts() {
    //if (this.type === undefined) {
    //throw new RequiredForDynamicProductsError("type");
    //}
    //if (this.price === undefined) {
    //throw new RequiredForDynamicProductsError("price");
    //}
    //if (this.tangible === undefined) {
    //throw new RequiredForDynamicProductsError("tangible");
    //}
    //if (this.recurrence === undefined) {
    //throw new RequiredForDynamicProductsError("recurrence");
    //}
    //if (this.duration === undefined) {
    //throw new RequiredForDynamicProductsError("duration");
    //}
    //if (this.renewalPrice === undefined) {
    //throw new RequiredForDynamicProductsError("renewalPrice");
    //}
    //}

    //private checkRequiredForCatalogProducts() {
    //if (this.subscription === undefined) {
    //throw new RequiredForDynamicProductsError("duration");
    //}
    //}
}
