import { HashCreator } from "./HashCreator";

const VENDOR_CODE = "1234567891";
const SECRET_KEY = "h*GD!X9@Bplksdj(2rqR";
const REQUEST_DATE_TIME = new Date(1579514235982);

describe("HashCreator", () => {
    it("String generation", () => {
        const hc = new HashCreator(VENDOR_CODE, SECRET_KEY, REQUEST_DATE_TIME);
        expect(hc._getString()).toBe("101234567891192020-01-20 03:01:15");
    });
    it("Hash generation", () => {
        const hc = new HashCreator(VENDOR_CODE, SECRET_KEY, REQUEST_DATE_TIME);
        expect(hc.getHash()).toBe("8093539c1093047f8a7c0c256bbe43ce");
    });
});
