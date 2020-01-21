import axios, { AxiosInstance, AxiosResponse } from "axios";
import { HashCreator } from "./HashCreator";
import { TWOCHEKCOUT_BASE_URL } from "../constances";

export class Api {
    ax: AxiosInstance;
    constructor(private merchant_id: string, private service_key: string) {
        this.ax = axios.create({
            baseURL: TWOCHEKCOUT_BASE_URL
        });
    }
    async get(endpoint_path: string): Promise<any> {
        const hc = new HashCreator(this.merchant_id, this.service_key);
        const response = await axios.get(endpoint_path, {
            headers: {
                "X-Avangate-Authentication": hc.getHash()
            }
        });
        return response.data;
    }
    async post(endpoint_path: string, data: any): Promise<any> {
        const hc = new HashCreator(this.merchant_id, this.service_key);
        const response = await axios.post(endpoint_path, data, {
            headers: {
                "X-Avangate-Authentication": hc.getHash()
            }
        });
        return response.data;
    }
}
