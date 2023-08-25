import { Http, HttpRequest, HttpResponse } from '../../local_modules/http'
import * as ct from '../schema.ct'
import Order = ct.Components.Schemas.Order

export class OrderProvider {
    private readonly authorisationToken: string
    constructor(authorisationToken: string) {
        this.authorisationToken = authorisationToken
    }
    async updateOrder(storeKey: string, body: any, orderId: string): Promise<Order> {
        const httpRequest: HttpRequest = {
            baseUrl: `${process.env.API_URL}`,
            path: `/${process.env.PROJECT_KEY}/in-store/key=${storeKey}/orders/${orderId}`,
            method: 'POST',
            headers: { Authorization: this.authorisationToken },
            body: JSON.stringify(body),
            data: {
                expand: 'lineItems[*].custom.fields.artworks[*]'
            }
        }
        const response: HttpResponse = await new Http().send(httpRequest)
        return response.body as Order
    }
}