import * as qs from "qs";
import * as url from "url";
import axios from "axios";
import { JSDOM } from "jsdom";

import { ConvertPlusUrlGenerator } from "../utils";

const getSearchFromUrl = (u: string) => {
    return (url.parse(u).search as string).slice(1);
};

const getGlobalObjectFromPage = async (url: string): Promise<any> => {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data, {
        runScripts: "dangerously"
    });
    return dom.window;
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
        console.log(`generated_url: ${generated_url}`);
        // get only search part
        const generated_query = getSearchFromUrl(generated_url);
        expect(qs.parse(generated_query)).toEqual(qs.parse(expectedUrl));
    });

    it("Test generated link", async () => {
        const gen = new ConvertPlusUrlGenerator(
            process.env.MERCHANT_ID as string,
            process.env.BUY_LINK_SECRET_WORD as string,
            {
                merchant: process.env.MERCHANT_ID as string,
                dynamic: true,
                currency: "USD",
                tpl: "default",
                prod: ["First product", "Second Product"],
                tangible: true,
                price: [10, 20],
                type: "product",
                qty: [1]
            }
        );
        const page_globals = await getGlobalObjectFromPage(gen.getUrl());
        expect(page_globals).toHaveProperty("$GLOBAL_VARS");
        expect(page_globals.$GLOBAL_VARS).toHaveProperty("context");
    });

    it("Test generated link with incorrect currency", async () => {
        const gen = new ConvertPlusUrlGenerator(
            process.env.MERCHANT_ID as string,
            process.env.BUY_LINK_SECRET_WORD as string,
            {
                merchant: process.env.MERCHANT_ID as string,
                dynamic: true,
                currency: "US",
                tpl: "default",
                prod: ["First product"],
                tangible: true,
                price: [10],
                type: "product",
                qty: [1]
            }
        );
        const page_globals = await getGlobalObjectFromPage(gen.getUrl());
        expect(page_globals).toHaveProperty("$GLOBAL_VARS");
        expect(page_globals.$GLOBAL_VARS).not.toHaveProperty("context");
    });
});
