import { HttpRequest, HttpResponse } from '../../local_modules/http'
import { OrderProvider } from '../../src/adapters/OrderProvider'

const apiUrl = 'https://api.url'
const projectKey = 'project-key'
process.env.API_URL = apiUrl
process.env.PROJECT_KEY = projectKey

const mockSend = jest.fn()
jest.mock('../../local_modules/http', () => ({
    Http: jest.fn(() => ({ send: mockSend }))
}))

beforeEach(() => {
    mockSend.mockClear()
})

describe('updateOrder method', () => {
    test('should resolve to a valid body once it did an update on the order', async () => {
        //GIVEN
        const httpResponse: HttpResponse = { body: { order: 'order' } }
        const body = { test: 'test' }
        const storeKey = 'key'
        const httpRequest: HttpRequest = {
            baseUrl: 'https://api.url',
            path: `/${process.env.PROJECT_KEY}/in-store/key=${storeKey}/orders/1`,
            method: 'POST',
            body: JSON.stringify(body),
            headers: { Authorization: 'token' },
            data: {
                expand: 'lineItems[*].custom.fields.artworks[*]'
            }
        }
        //WHEN
        mockSend.mockResolvedValue(httpResponse)
        const order = new OrderProvider('token').updateOrder(storeKey, body, '1')

        // THEN
        await expect(order)
            .resolves.toEqual({ order: 'order' })
            .finally(() => {
                expect(mockSend).toHaveBeenCalledTimes(1)
                expect(mockSend).toHaveBeenCalledWith(httpRequest)
            })
    })

    test('should reject if there is an unexpected error', async () => {
        //GIVEN
        const anApiError = new Error('API Error')
        const body = { test: 'test' }
        const storeKey = 'key'
        const httpRequest: HttpRequest = {
            baseUrl: 'https://api.url',
            path: `/${process.env.PROJECT_KEY}/in-store/key=${storeKey}/orders/1`,
            method: 'POST',
            body: JSON.stringify(body),
            headers: { Authorization: 'token' },
            data: {
                expand: 'lineItems[*].custom.fields.artworks[*]'
            }
        }
        //WHEN
        mockSend.mockRejectedValue(anApiError)
        const order = new OrderProvider('token').updateOrder(storeKey, body, '1')

        // THEN
        await expect(order)
            .rejects.toEqual(anApiError)
            .finally(() => {
                expect(mockSend).toHaveBeenCalledTimes(1)
                expect(mockSend).toHaveBeenCalledWith(httpRequest)
            })
    })
})
