export type PaymentResult = InvoiceResult | InvalidInvoice | PurchaseResult | InvalidPurchase | InvalidPaymentState;

/**
 * оплата завершилась с результатом
 */
export interface InvoiceResult {
    invoiceId: string;
    finishCode: PaymentFinishCode;
}

/**
 * оплата завершилась без указания счета на оплату товаров или услуг
 */
export interface InvalidInvoice {
    invoiceId: string | null;
}

/**
 * результат успешного завершения покупки цифрового товара
 */
export interface PurchaseResult {
    finishCode: PaymentFinishCode;
    orderId: string;
    purchaseId: string;
    productId: string;
}

/**
 * при оплате цифрового товара оплата завершилась с ошибкой
 */
export interface InvalidPurchase {
    purchaseId: string | null;
    invoiceId: string | null;
    orderId: string | null;
    quantity: number | null;
    productId: string | null;
    errorCode: number | null;
}

/**
 * при завершении оплаты отсутствует состояние
 */
export type InvalidPaymentState = any

export enum PaymentFinishCode {
    /**
     * успешная оплата
     */
    SUCCESSFUL_PAYMENT = 0,
    /**
     * отменено пользователем
     */
    CLOSED_BY_USER = 1,
    /**
     * неизвестная ошибка
     */
    UNHANDLED_FORM_ERROR = 2,
    /**
     * ошибка оплаты по таймауту
     */
    PAYMENT_TIMEOUT = 3,
    /**
     * отклонено сервером
     */
    DECLINED_BY_SERVER = 4,
    /**
     * неизвестный статус оплаты
     */
    RESULT_UNKNOWN = 5,
}