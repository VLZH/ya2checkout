import axios, { AxiosInstance, AxiosResponse } from "axios";
import { HashCreator } from "./HashCreator";
import { TWOCHEKCOUT_BASE_URL } from "../constances";

export class ApiResponseError extends Error {
    constructor(
        msg: string,
        public response: AxiosResponse | null,
        public status: number
    ) {
        super(msg);
    }
}

const createApiResponseError = (error: any) => {
    if (error && error.response) {
        return new ApiResponseError(
            error.response.data.message,
            error.response,
            error.response.status
        );
    }
    return new ApiResponseError(error.message, null, 0);
};

export class Api {
    ax: AxiosInstance;
    constructor(private merchant_id: string, private service_key: string) {
        this.ax = axios.create({
            baseURL: TWOCHEKCOUT_BASE_URL,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    async get(endpoint_path: string): Promise<any> {
        const hc = new HashCreator(this.merchant_id, this.service_key);
        try {
            const response = await this.ax.get(endpoint_path, {
                headers: {
                    "X-Avangate-Authentication": hc.getAuthString()
                }
            });
            return response.data;
        } catch (error) {
            throw createApiResponseError(error);
        }
    }

    async post(endpoint_path: string, data: any): Promise<any> {
        const hc = new HashCreator(this.merchant_id, this.service_key);
        try {
            const response = await this.ax.post(endpoint_path, data, {
                headers: {
                    "X-Avangate-Authentication": hc.getAuthString()
                }
            });
            return response.data;
        } catch (error) {
            throw createApiResponseError(error);
        }
    }
    async delete(endpoint_path: string): Promise<any> {
        const hc = new HashCreator(this.merchant_id, this.service_key);
        try {
            const response = await this.ax.delete(endpoint_path, {
                headers: {
                    "X-Avangate-Authentication": hc.getAuthString()
                }
            });
            return response.data;
        } catch (error) {
            throw createApiResponseError(error);
        }
    }
}
