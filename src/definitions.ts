/// <reference types="@capacitor/cli" />

import type { PluginListenerHandle } from '@capacitor/core';

import type {
  //methods
  GetProductsOptions,
  ProductsResponse,
  PurchaseResponse,
  PurchaseProductOptions,
  PaymentResult,
  ConfirmPurchaseOptions,
  ConfirmPurchaseResponse,
  DeletePurchaseOptions,
  DeletePurchaseResponse,
} from './interfaces';

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    CapacitorRuStoreBilling: {
      /**
       * код приложения из системы RuStore Консоль
       */
      consoleApplicationId: string;
      /**
       * URL для использования deeplink
       */
      deeplinkPrefix: string;
    }
  }
}

export interface CapacitorRuStoreBillingPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;

  getProducts(options: GetProductsOptions): Promise<ProductsResponse>;

  getPurchases(options: { language: string }): Promise<PurchaseResponse>;

  /**
   * Перед каждым вызовом purchaseProduct подпишитесь на получение результата покупки
   */
  purchaseProduct(options: PurchaseProductOptions): Promise<void>;

  /**
   * Подтверждение покупки запрашивается только на продукты типа CONSUMABLE, если они находятся в состоянии PurchaseState.PAID
   */
  confirmPurchase(options: ConfirmPurchaseOptions): Promise<ConfirmPurchaseResponse>;

  deletePurchase(options: DeletePurchaseOptions): Promise<DeletePurchaseResponse>;


  addListener(
    eventName: 'paymentResultReceived',
    listenerFunc: (paymentResult: PaymentResult) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

export * from './interfaces/index';
