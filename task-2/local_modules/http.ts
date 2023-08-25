import axios from 'axios'
import qs from 'qs'

const queryParameterSerializer = (params: unknown): string => qs.stringify(params, { arrayFormat: 'brackets' })

export interface HttpRequest {
    baseUrl: string
    path?: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD'
    body?: string
    data?: { [key: string]: unknown }
    headers?: { [key: string]: string }
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
    skipResponseLogging?: boolean
    retryConfig?: RetryConfig
}

export interface RetryConfig {
    retries: number
    retryCondition?: (error: any) => boolean
}
export interface HttpResponse {
    body?: unknown
    statusCode?: number
}

const rawFormats = ['arraybuffer', 'blob', 'document', 'text', 'stream']

export class Http {
    async send(request: HttpRequest): Promise<HttpResponse> {
        console.log('HTTP Request', request.method, request)
        switch (request.method) {
            case 'GET':
                return this.get(request)
            case 'POST':
                return this.post(request)
            case 'PUT':
                return this.put(request)
            case 'DELETE':
                return this.delete(request)
            case 'HEAD':
                return this.head(request)
        }
    }

    private async get(request: HttpRequest): Promise<HttpResponse> {
        const response = await axios.get(request.path, {
            baseURL: request.baseUrl,
            headers: request.headers,
            params: request.data,
            paramsSerializer: queryParameterSerializer,
            responseType: request.responseType
        })

        console.log('HTTP Response status', response.status)
        if (!rawFormats.includes(request.responseType) && !request.skipResponseLogging) {
            console.log('HTTP Response', response.data)
        }
        return { body: response.data, statusCode: response.status }
    }

    private async post(request: HttpRequest): Promise<HttpResponse> {
        const response = await axios.post(request.path, request.body ? request.body : qs.stringify(request.data), {
            baseURL: request.baseUrl,
            headers: request.headers,
            params: request.body ? request.data : null,
            paramsSerializer: queryParameterSerializer,
            responseType: request.responseType
        })

        console.log('HTTP Response status', response.status)
        if (!rawFormats.includes(request.responseType) && !request.skipResponseLogging) {
            console.log('HTTP Response', response.data)
        }
        return { body: response.data, statusCode: response.status }
    }

    private async put(request: HttpRequest): Promise<HttpResponse> {
        const response = await axios.put(request.path, request.body ? request.body : qs.stringify(request.data), {
            baseURL: request.baseUrl,
            headers: request.headers,
            params: request.body ? request.data : null,
            paramsSerializer: queryParameterSerializer,
            responseType: request.responseType
        })

        console.log('HTTP Response status', response.status)
        if (!rawFormats.includes(request.responseType) && !request.skipResponseLogging) {
            console.log('HTTP Response', response.data)
        }
        return { body: response.data, statusCode: response.status }
    }

    private async delete(request: HttpRequest): Promise<HttpResponse> {
        const response = await axios.delete(request.path, {
            baseURL: request.baseUrl,
            headers: request.headers,
            params: request.data,
            paramsSerializer: queryParameterSerializer,
            responseType: request.responseType
        })

        console.log('HTTP Response status', response.status)
        if (!rawFormats.includes(request.responseType) && !request.skipResponseLogging) {
            console.log('HTTP Response', response.data)
        }
        return { body: response.data, statusCode: response.status }
    }

    private async head(request: HttpRequest): Promise<any> {
        const response = await axios.head(request.baseUrl)
        console.log('HTTP Response status', response.status)
        return { statusCode: response.status }
    }
}