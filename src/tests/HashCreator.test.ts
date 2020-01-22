import { HashCreator } from "../utils";

const VENDOR_CODE = "1234567891";
const SECRET_KEY = "h*GD!X9@Bplksdj(2rqR";
const REQUEST_DATE_TIME = new Date(1579514235982);

describe("HashCreator", () => {
    it("Correct format", () => {
        const hc = new HashCreator(VENDOR_CODE, SECRET_KEY, REQUEST_DATE_TIME);
        expect(hc.date_str).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });
    it("String generation", () => {
        const hc = new HashCreator(VENDOR_CODE, SECRET_KEY, REQUEST_DATE_TIME);
        expect(hc._getString()).toBe("101234567891192020-01-20 09:57:15");
    });
    it("Hash generation", () => {
        const hc = new HashCreator(VENDOR_CODE, SECRET_KEY, REQUEST_DATE_TIME);
        expect(hc._getHash()).toBe("d71250fe19dac136a3aba473a7d32df9");
    });
    it("Auth string generation", () => {
        const hc = new HashCreator(VENDOR_CODE, SECRET_KEY, REQUEST_DATE_TIME);
        expect(hc.getAuthString()).toBe(
            `code="${VENDOR_CODE}" date="2020-01-20 09:57:15" hash="d71250fe19dac136a3aba473a7d32df9"`
        );
    });
});
