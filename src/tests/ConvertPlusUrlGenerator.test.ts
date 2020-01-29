import { ConvertPlusUrlGenerator } from "../utils";
import * as qs from "qs";
import * as url from "url";

const getSearchFromUrl = (u: string) => {
    return (url.parse(u).search as string).slice(1);
};

describe("ConvertPlusUrlGenerator", () => {
    it("Check envs", () => {
        expect(process.env.MERCHANT_ID).toBeTruthy();
        expect(process.env.BUY_LINK_SECRET_WORD).toBeTruthy();
        expect(process.env.BUY_LINK_EXPECTED_DYNAMIC_LINK).toBeTruthy();
    });

    it("Link for one dynamic product compare with generated link in UI", () => {
        const expectedUrl = getSearchFromUrl(
            process.env.BUY_LINK_EXPECTED_DYNAMIC_LINK as string
        );
        const gen = new ConvertPlusUrlGenerator(
            process.env.MERCHANT_ID as string,
            process.env.BUY_LINK_SECRET_WORD as string,
            {
                merchant: process.env.MERCHANT_ID as string,
                dynamic: true,
                currency: "USD",
                tpl: "default",
                prod: ["Name"],
                tangible: true,
                price: [10],
                type: "product",
                qty: [1]
            }
        );
        const generated_url = gen.getUrl();
        // get only search part
        const generated_query = getSearchFromUrl(generated_url);
        console.log(`generated_url: ${generated_url}`);
        expect(qs.parse(generated_query)).toEqual(qs.parse(expectedUrl));
    });
});
