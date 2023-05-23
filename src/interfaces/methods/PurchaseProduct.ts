export interface PurchaseProductOptions {
    /**
     * идентификатор продукта
     */
    productId: string;
    /**
     * идентификатор заказа, генерируется на стороне AnyApp
     */
    orderId: string;
    /**
     * Int — количество продукта
     */
    quantity: number;
    /**
     * указанная разработчиком строка, содержащая дополнительную информацию о заказе
     */
    developerPayload: string;
}