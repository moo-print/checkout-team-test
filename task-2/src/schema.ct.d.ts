export namespace Components {
    namespace Schemas {
        /**
         * Address
         */
        export interface Address {
            company?: string
            firstName: string
            email: string
            phone: string
            streetName: string
            streetNumber?: string
            city: string
            state: string
            country: string
            postalCode: string
        }
        /**
         * Artworks
         */
        export interface Artworks {
            type?: string
            artworkExternalUrl: string
            artworkInternalKey?: string
            artworkInternalUrl?: string
            artworkUploadFailureReason?: string
        }
        export interface ChangeArtworkUrl {
            action?: 'setLineItemCustomField'
            lineItemId: string
            name: string
            value: string
        }
        /**
         * ChannelReference
         */
        export interface ChannelReference {
            typeId: 'channel'
            id: string
        }
        /**
         * Custom
         */
        export interface Custom {
            type: /* Fields */ Type
            fields: /* Fields */ Fields
        }
        /**
         * CustomObject
         * Custom commerce-tools object
         */
        export interface CustomObject {
            version?: number
            createdAt?: string
            lastModifiedAt?: string
            container?: string
            key?: string
            id?: string
            value: /* Artworks */ Artworks
        }
        /**
         * CustomObjectCreateUpdate
         * Create or update commerce-tools object
         */
        export interface CustomObjectCreateUpdate {
            container: string
            key: string
            value: /* Artworks */ Artworks
        }
        /**
         * Fields
         */
        export interface CustomObjectType {
            typeId: string
            id: string
            obj?: /**
             * CustomObject
             * Custom commerce-tools object
             */
                CustomObject
        }
        /**
         * Custom
         */
        export interface CustomOrderField {
            type: /* Fields */ Type
            fields: /* Fields */ OrderCustomFields
        }
        /**
         * Fields
         */
        export interface Fields {
            artworks?: /* Fields */ CustomObjectType[]
        }
        /**
         * LineItem
         */
        export interface LineItem {
            id: string
            productId: string
            name: /* LocalizedString */ LocalizedString
            quantity: number
            price: /* Price */ Price
            variant: /* Variant */ Variant
            custom?: /* Custom */ Custom
        }
        /**
         * LocalizedString
         */
        export interface LocalizedString {
            'en-US': string
        }
        /**
         * Money
         */
        export interface Money {
            type?: string
            currencyCode: string
            centAmount: number
            fractionDigits?: number
        }
        /**
         * OauthToken
         */
        export interface OauthToken {
            token_type: string
            access_token: string
            expires_in?: number
            scope?: string
        }
        /**
         * OauthTokenDraft
         * The 'grant_type' has to be 'client_credentials' while the scope is the scope of the API client or less
         */
        export interface OauthTokenDraft {
            grant_type: string
            scope: string
        }
        /**
         * Order
         */
        export interface Order {
            id: string
            version: number
            lineItems?: /* LineItem */ LineItem[]
            createdAt?: string // date-time
            orderNumber?: string // date-time
            orderState?: 'Open' | 'Confirmed' | 'Complete' | 'Cancelled'
            lastModifiedAt?: string // date-time
            shippingAddress?: /* Address */ Address
            store?: /* Store */ Store
            billingAddress?: /* Address */ Address
            shippingInfo?: /* ShippingInfo */ ShippingInfo
            totalPrice?: /* Money */ Money
            taxedPrice?: /* TaxedPrice */ TaxedPrice
            state?: /* Fields */ Type
            custom?: /* Custom */ CustomOrderField
        }
        /**
         * Fields
         */
        export interface OrderCustomFields {
            fulfilmentRequestIds?: any[]
            customerReference?: string
        }
        /**
         * Price
         */
        export interface Price {
            value: /* Money */ Money
        }
        /**
         * Reference
         */
        export interface Reference {
            typeId: string
            id: string
        }
        /**
         * SetCustomField
         */
        export interface SetCustomField {
            action: 'setCustomField'
            name: string
            value: string
        }
        /**
         * ShippingInfo
         */
        export interface ShippingInfo {
            shippingMethodName: string
            price: /* Money */ Money
            taxedPrice: /* TaxedItemPrice */ TaxedItemPrice
            shippingMethod: /* ShippingMethod */ ShippingMethod
        }
        /**
         * ShippingMethod
         */
        export interface ShippingMethod {
            id: string
            typeId: string
        }
        /**
         * Store
         */
        export interface Store {
            typeId: string
            key: string
            distributionChannels: /* ChannelReference */ ChannelReference[]
        }
        /**
         * TaxPortion
         */
        export interface TaxPortion {
            name?: string
            rate: number
            amount: /* Money */ Money
        }
        /**
         * TaxedItemPrice
         */
        export interface TaxedItemPrice {
            totalNet: /* Money */ Money
            totalGross: /* Money */ Money
        }
        /**
         * TaxedPrice
         */
        export interface TaxedPrice {
            totalNet: /* Money */ Money
            totalGross: /* Money */ Money
            taxPortions?: /* TaxPortion */ TaxPortion[]
        }
        /**
         * TransitionState
         */
        export interface TransitionState {
            action: 'transitionState'
            state: /* Reference */ Reference
        }
        /**
         * Fields
         */
        export interface Type {
            typeId: string
            id: string
        }
        /**
         * Update
         */
        export interface UpdateAction {
            version: number
            actions: (/* TransitionState */ TransitionState | ChangeArtworkUrl | /* SetCustomField */ SetCustomField)[]
        }
        /**
         * Variant
         */
        export interface Variant {
            sku: string
        }
    }
}