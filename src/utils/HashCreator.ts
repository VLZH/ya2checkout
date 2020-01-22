import * as crypto from "crypto";
import * as dateFormatNs from "dateformat";

const dateFormat = dateFormatNs;

export class HashCreator {
    date_str: string;
    constructor(
        private readonly merchant_id: string,
        private readonly secret_key: string,
        private readonly date: Date = new Date()
    ) {
        this.date_str = dateFormat(this.date, "UTC:yyyy-mm-dd hh:MM:ss");
    }

    public _getString(): string {
        return `${this.merchant_id.length}${this.merchant_id}${this.date_str.length}${this.date_str}`;
    }

    public _getHash(): string {
        const hasher = crypto.createHmac("md5", this.secret_key);
        hasher.update(this._getString());
        return hasher.digest("hex").toString();
    }

    public getAuthString(): string {
        return `code="${this.merchant_id}" date="${
            this.date_str
        }" hash="${this._getHash()}"`;
    }
}
