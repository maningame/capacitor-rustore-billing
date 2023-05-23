import type { DigitalShopGeneralError } from "../models/DigitalShopGeneralError";

export interface DeletePurchaseOptions {
    /**
     * идентификатор покупки
     */
    purchaseId: string;
    /**
     * язык устройства, указанный с помощью BCP 47 кодирования
     */
    language: string;
}

export interface DeletePurchaseResponse {
    /**
     * код ответа
     */
    code: number;
    /**
     * сообщение об ошибке для пользователя
     */
    errorMessage: string | null;
    /**
     * расшифровка сообщения об ошибке
     */
    errorDescription: string | null;
    /**
     * идентификатор ошибочного сообщения
     */
    traceId: string | null;
    /**
     * список ошибок
     */
    errors: DigitalShopGeneralError[] | null;
}