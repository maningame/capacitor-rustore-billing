export interface DigitalShopGeneralError {
    /**
     * наименование атрибута ошибки
     */
    name: string | null;
    /**
     * код ошибки
     */
    code: number | null;
    /**
     * описание ошибки
     */
    description: string | null;
}