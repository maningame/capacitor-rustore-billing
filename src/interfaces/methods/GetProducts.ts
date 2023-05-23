import type { DigitalShopGeneralError } from "../models/DigitalShopGeneralError";

export interface GetProductsOptions {
    /**
     * string — язык устройства, указанный с помощью BCP 47 кодирования
     */
    language: string;
    /**
     * list<string> — список идентификаторов продуктов
     */
    productIds: string[];
}

export interface ProductsResponse {
    /**
     * код ответа
     */
    code: number;
    /**
     * сообщение об ошибке для пользователя
     */
    errorMessage: string | undefined;
    /**
     * расшифровка сообщения об ошибке
     */
    errorDescription: string | null;
    /**
     * идентификатор ошибочного сообщения
     */
    traceId: string | null;
    /**
     * список ошибок для запрошенных покупок
     */
    errors: DigitalShopGeneralError[] | null;
    /**
     * список запрошенных продуктов
     */
    products: Product[];
}

export interface Product {
    /**
     * идентификатор продукта
     */
    productId: string;
    /**
     * тип продукта
     */
    productType: ProductType | null;
    /**
     * статус продукта
     */
    productStatus: ProductStatus;
    /**
     * отформатированная цена товара, включая валютный знак на языке [language]
     */
    priceLabel: string | null;
    /**
     * цена в минимальных единицах
     */
    price: number;
    /**
     * код валюты ISO 4217
     */
    currency: string | null;
    /**
     * язык, указанный с помощью BCP 47 кодирования
     */
    language: string | null;
    /**
     * название продукта на языке [language]
     */
    title: string | null;
    /**
     * описание продукта на языке [language]
     */
    description : string | null;
    /**
     * ссылка на картинку
     */
    imageUrl: URL | null;
    /**
     * ссылка на промо картинку
     */
    promoImageUrl: URL | null;
    /**
     * описание подписки, возвращается только для продуктов с типом subscription
     */
    subscription: ProductSubscription | null;
}

export enum ProductType {
    NON_CONSUMABLE = 0,
    CONSUMABLE = 1,
    SUBSCRIPTION = 2,
}

export enum ProductStatus {
    ACTIVE = 0,
    INACTIVE = 1,
}

export interface ProductSubscription {
    /**
     * период подписки
     */
    subscriptionPeriod: SubscriptionPeriod | null;
    /**
     * пробный период подписки
     */
    freeTrialPeriod: SubscriptionPeriod | null;
    /**
     * льготный период подписки
     */
    gracePeriod: SubscriptionPeriod | null;
    /**
     * отформатированная вступительная цена подписки, включая знак валюты, на языке product:language
     */
    introductoryPrice: string | null;
    /**
     * вступительная цена в минимальных единицах валюты (в копейках)
     */
    introductoryPriceAmount: string | null;
    /**
     * расчетный период вступительной цены
     */
    introductoryPricePeriod: SubscriptionPeriod | null;
}

export interface SubscriptionPeriod {
    /**
     * количество лет
     */
    years: number;
    /**
     * количество месяцев
     */
    months: number;
    /**
     * количество дней
     */
    days: number;
}