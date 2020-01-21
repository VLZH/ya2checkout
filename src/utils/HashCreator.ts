import * as crypto from "crypto";
import * as dateFormatNs from "dateformat";

const dateFormat = dateFormatNs;

export class HashCreator {
    constructor(
        private readonly vendor_code: string,
        private readonly secret_key: string,
        private readonly date: Date = new Date()
    ) {}
    public _getString(): string {
        console.log("type of dateFormat:", typeof dateFormat);
        const date_str = dateFormat(this.date, "yyyy-mm-dd hh:mm:ss");
        return `${this.vendor_code.length}${this.vendor_code}${date_str.length}${date_str}`;
    }
    public getHash(): string {
        const hasher = crypto.createHmac("md5", this.secret_key);
        hasher.update(this._getString());
        return hasher.digest("hex").toString();
    }
}
