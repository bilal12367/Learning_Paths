
import axios, { AxiosInstance } from 'axios';


class RestTemplate{
    
    constructor(private baseUrl: string) {}

    private get client(): AxiosInstance {
        return axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async get<T,R>(endpoint: string, params?: any): Promise<R> {
        const response = await this.client.get<R>(this.baseUrl + endpoint, { params });
        return response.data;
    }

    async post<T,R>(endpoint: string, data: T): Promise<R> {
        const response = await this.client.post<R>(this.baseUrl + endpoint, data);
        return response.data;
    }

    async put<T,R>(endpoint: string, data: T): Promise<R> {
        const response = await this.client.put<R>(this.baseUrl + endpoint, data);
        return response.data;
    }

    async delete<T,R>(endpoint: string): Promise<R> {
        const response = await this.client.delete<R>(this.baseUrl + endpoint);
        return response.data;
    }
}