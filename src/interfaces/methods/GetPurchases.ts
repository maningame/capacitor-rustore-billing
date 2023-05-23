import type { DigitalShopGeneralError } from "../models/DigitalShopGeneralError";

export interface PurchaseResponse {
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
     * список запрошенных покупок
     */
    purchases: Purchase[] | null;
}

export interface Purchase {
    /**
     * идентификатор покупки
     */
    purchaseId: string | null;
    /**
     * идентификатор продукта
     */
    productId: string;
    /**
     * описание покупки
     */
    description : string | null;
    /**
     * язык, указанный с помощью BCP 47 кодирования
     */
    language: string | null;
    /**
     * время покупки (в формате RFC 3339)
     */
    purchaseTime: string | null;
    /**
     * уникальный идентификатор оплаты, сформированный приложением (uuid)
     */
    orderId: string | null;
    /**
     * отформатированная цена покупки, включая валютный знак на языке [language]
     */
    amountLabel: string | null;
    /**
     * цена в минимальных единицах валюты
     */
    amount: number | null;
    /**
     * код валюты ISO 4217
     */
    currency: string | null;
    /**
     * количество продукта
     */
    quantity: number | null;
    /**
     * состояние покупки
     */
    purchaseState: PurchaseState | null;
    /**
     * указанная разработчиком строка, содержащая дополнительную информацию о заказе
     */
    developerPayload: string | null;
}

export enum PurchaseState {
    /**
     * создана
     */
    CREATED = 0,
    /**
     * создана, ожидает оплаты
     */
    INVOICE_CREATED = 1,
    /**
     * подтверждена
     */
    CONFIRMED = 2,
    /**
     * оплачена
     */
    PAID = 3,
    /**
     * покупка отменена
     */
    CANCELLED = 4,
    /**
     * потребление покупки подтверждено
     */
    CONSUMED = 5,
    /**
     * подписка была отменена
     */
    CLOSED = 6
}