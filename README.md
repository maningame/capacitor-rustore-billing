# capacitor-rustore-billing

Capacitor RuStore billing plugin

## Install

```bash
npm install ../capacitor-rustore-billing
npx cap sync
```

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`getProducts(...)`](#getproducts)
* [`getPurchases(...)`](#getpurchases)
* [`purchaseProduct(...)`](#purchaseproduct)
* [`confirmPurchase(...)`](#confirmpurchase)
* [`deletePurchase(...)`](#deletepurchase)
* [`addListener('paymentResultReceived', ...)`](#addlistenerpaymentresultreceived)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### getProducts(...)

```typescript
getProducts(options: GetProductsOptions) => Promise<ProductsResponse>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#getproductsoptions">GetProductsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#productsresponse">ProductsResponse</a>&gt;</code>

--------------------


### getPurchases(...)

```typescript
getPurchases(options: { language: string; }) => Promise<PurchaseResponse>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ language: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#purchaseresponse">PurchaseResponse</a>&gt;</code>

--------------------


### purchaseProduct(...)

```typescript
purchaseProduct(options: PurchaseProductOptions) => Promise<void>
```

Перед каждым вызовом purchaseProduct подпишитесь на получение результата покупки

| Param         | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#purchaseproductoptions">PurchaseProductOptions</a></code> |

--------------------


### confirmPurchase(...)

```typescript
confirmPurchase(options: ConfirmPurchaseOptions) => Promise<ConfirmPurchaseResponse>
```

Подтверждение покупки запрашивается только на продукты типа CONSUMABLE, если они находятся в состоянии <a href="#purchasestate">PurchaseState.PAID</a>

| Param         | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#confirmpurchaseoptions">ConfirmPurchaseOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#confirmpurchaseresponse">ConfirmPurchaseResponse</a>&gt;</code>

--------------------


### deletePurchase(...)

```typescript
deletePurchase(options: DeletePurchaseOptions) => Promise<DeletePurchaseResponse>
```

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletepurchaseoptions">DeletePurchaseOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#deletepurchaseresponse">DeletePurchaseResponse</a>&gt;</code>

--------------------


### addListener('paymentResultReceived', ...)

```typescript
addListener(eventName: 'paymentResultReceived', listenerFunc: (paymentResult: PaymentResult) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                         |
| ------------------ | -------------------------------------------- |
| **`eventName`**    | <code>'paymentResultReceived'</code>         |
| **`listenerFunc`** | <code>(paymentResult: any) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### Interfaces


#### ProductsResponse

| Prop                   | Type                                           | Description                           |
| ---------------------- | ---------------------------------------------- | ------------------------------------- |
| **`code`**             | <code>number</code>                            | код ответа                            |
| **`errorMessage`**     | <code>string</code>                            | сообщение об ошибке для пользователя  |
| **`errorDescription`** | <code>string \| null</code>                    | расшифровка сообщения об ошибке       |
| **`traceId`**          | <code>string \| null</code>                    | идентификатор ошибочного сообщения    |
| **`errors`**           | <code>DigitalShopGeneralError[] \| null</code> | список ошибок для запрошенных покупок |
| **`products`**         | <code>Product[]</code>                         | список запрошенных продуктов          |


#### DigitalShopGeneralError

| Prop              | Type                        | Description                  |
| ----------------- | --------------------------- | ---------------------------- |
| **`name`**        | <code>string \| null</code> | наименование атрибута ошибки |
| **`code`**        | <code>number \| null</code> | код ошибки                   |
| **`description`** | <code>string \| null</code> | описание ошибки              |


#### Product

| Prop                | Type                                                                        | Description                                                               |
| ------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **`productId`**     | <code>string</code>                                                         | идентификатор продукта                                                    |
| **`productType`**   | <code><a href="#producttype">ProductType</a> \| null</code>                 | тип продукта                                                              |
| **`productStatus`** | <code><a href="#productstatus">ProductStatus</a></code>                     | статус продукта                                                           |
| **`priceLabel`**    | <code>string \| null</code>                                                 | отформатированная цена товара, включая валютный знак на языке [language]  |
| **`price`**         | <code>number</code>                                                         | цена в минимальных единицах                                               |
| **`currency`**      | <code>string \| null</code>                                                 | код валюты ISO 4217                                                       |
| **`language`**      | <code>string \| null</code>                                                 | язык, указанный с помощью BCP 47 кодирования                              |
| **`title`**         | <code>string \| null</code>                                                 | название продукта на языке [language]                                     |
| **`description`**   | <code>string \| null</code>                                                 | описание продукта на языке [language]                                     |
| **`imageUrl`**      | <code>URL \| null</code>                                                    | ссылка на картинку                                                        |
| **`promoImageUrl`** | <code>URL \| null</code>                                                    | ссылка на промо картинку                                                  |
| **`subscription`**  | <code><a href="#productsubscription">ProductSubscription</a> \| null</code> | описание подписки, возвращается только для продуктов с типом subscription |


#### ProductSubscription

| Prop                          | Type                                                                      | Description                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **`subscriptionPeriod`**      | <code><a href="#subscriptionperiod">SubscriptionPeriod</a> \| null</code> | период подписки                                                                               |
| **`freeTrialPeriod`**         | <code><a href="#subscriptionperiod">SubscriptionPeriod</a> \| null</code> | пробный период подписки                                                                       |
| **`gracePeriod`**             | <code><a href="#subscriptionperiod">SubscriptionPeriod</a> \| null</code> | льготный период подписки                                                                      |
| **`introductoryPrice`**       | <code>string \| null</code>                                               | отформатированная вступительная цена подписки, включая знак валюты, на языке product:language |
| **`introductoryPriceAmount`** | <code>string \| null</code>                                               | вступительная цена в минимальных единицах валюты (в копейках)                                 |
| **`introductoryPricePeriod`** | <code><a href="#subscriptionperiod">SubscriptionPeriod</a> \| null</code> | расчетный период вступительной цены                                                           |


#### SubscriptionPeriod

| Prop         | Type                | Description        |
| ------------ | ------------------- | ------------------ |
| **`years`**  | <code>number</code> | количество лет     |
| **`months`** | <code>number</code> | количество месяцев |
| **`days`**   | <code>number</code> | количество дней    |


#### GetProductsOptions

| Prop             | Type                  | Description                                                      |
| ---------------- | --------------------- | ---------------------------------------------------------------- |
| **`language`**   | <code>string</code>   | string — язык устройства, указанный с помощью BCP 47 кодирования |
| **`productIds`** | <code>string[]</code> | list&lt;string&gt; — список идентификаторов продуктов            |


#### PurchaseResponse

| Prop                   | Type                                           | Description                           |
| ---------------------- | ---------------------------------------------- | ------------------------------------- |
| **`code`**             | <code>number</code>                            | код ответа                            |
| **`errorMessage`**     | <code>string</code>                            | сообщение об ошибке для пользователя  |
| **`errorDescription`** | <code>string \| null</code>                    | расшифровка сообщения об ошибке       |
| **`traceId`**          | <code>string \| null</code>                    | идентификатор ошибочного сообщения    |
| **`errors`**           | <code>DigitalShopGeneralError[] \| null</code> | список ошибок для запрошенных покупок |
| **`purchases`**        | <code>Purchase[] \| null</code>                | список запрошенных покупок            |


#### Purchase

| Prop                   | Type                                                            | Description                                                                   |
| ---------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **`purchaseId`**       | <code>string \| null</code>                                     | идентификатор покупки                                                         |
| **`productId`**        | <code>string</code>                                             | идентификатор продукта                                                        |
| **`description`**      | <code>string \| null</code>                                     | описание покупки                                                              |
| **`language`**         | <code>string \| null</code>                                     | язык, указанный с помощью BCP 47 кодирования                                  |
| **`purchaseTime`**     | <code>string \| null</code>                                     | время покупки (в формате RFC 3339)                                            |
| **`orderId`**          | <code>string \| null</code>                                     | уникальный идентификатор оплаты, сформированный приложением (uuid)            |
| **`amountLabel`**      | <code>string \| null</code>                                     | отформатированная цена покупки, включая валютный знак на языке [language]     |
| **`amount`**           | <code>number \| null</code>                                     | цена в минимальных единицах валюты                                            |
| **`currency`**         | <code>string \| null</code>                                     | код валюты ISO 4217                                                           |
| **`quantity`**         | <code>number \| null</code>                                     | количество продукта                                                           |
| **`purchaseState`**    | <code><a href="#purchasestate">PurchaseState</a> \| null</code> | состояние покупки                                                             |
| **`developerPayload`** | <code>string \| null</code>                                     | указанная разработчиком строка, содержащая дополнительную информацию о заказе |


#### PurchaseProductOptions

| Prop                   | Type                | Description                                                                   |
| ---------------------- | ------------------- | ----------------------------------------------------------------------------- |
| **`productId`**        | <code>string</code> | идентификатор продукта                                                        |
| **`orderId`**          | <code>string</code> | идентификатор заказа, генерируется на стороне AnyApp                          |
| **`quantity`**         | <code>number</code> | Int — количество продукта                                                     |
| **`developerPayload`** | <code>string</code> | указанная разработчиком строка, содержащая дополнительную информацию о заказе |


#### ConfirmPurchaseResponse

| Prop                   | Type                                           | Description                          |
| ---------------------- | ---------------------------------------------- | ------------------------------------ |
| **`code`**             | <code>number</code>                            | код ответа                           |
| **`errorMessage`**     | <code>string \| null</code>                    | сообщение об ошибке для пользователя |
| **`errorDescription`** | <code>string \| null</code>                    | расшифровка сообщения об ошибке      |
| **`traceId`**          | <code>string \| null</code>                    | идентификатор ошибочного сообщения   |
| **`errors`**           | <code>DigitalShopGeneralError[] \| null</code> | список ошибок                        |


#### ConfirmPurchaseOptions

| Prop             | Type                | Description                                             |
| ---------------- | ------------------- | ------------------------------------------------------- |
| **`purchaseId`** | <code>string</code> | идентификатор покупки                                   |
| **`language`**   | <code>string</code> | язык устройства, указанный с помощью BCP 47 кодирования |


#### DeletePurchaseResponse

| Prop                   | Type                                           | Description                          |
| ---------------------- | ---------------------------------------------- | ------------------------------------ |
| **`code`**             | <code>number</code>                            | код ответа                           |
| **`errorMessage`**     | <code>string \| null</code>                    | сообщение об ошибке для пользователя |
| **`errorDescription`** | <code>string \| null</code>                    | расшифровка сообщения об ошибке      |
| **`traceId`**          | <code>string \| null</code>                    | идентификатор ошибочного сообщения   |
| **`errors`**           | <code>DigitalShopGeneralError[] \| null</code> | список ошибок                        |


#### DeletePurchaseOptions

| Prop             | Type                | Description                                             |
| ---------------- | ------------------- | ------------------------------------------------------- |
| **`purchaseId`** | <code>string</code> | идентификатор покупки                                   |
| **`language`**   | <code>string</code> | язык устройства, указанный с помощью BCP 47 кодирования |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### InvoiceResult

оплата завершилась с результатом

| Prop             | Type                                                            |
| ---------------- | --------------------------------------------------------------- |
| **`invoiceId`**  | <code>string</code>                                             |
| **`finishCode`** | <code><a href="#paymentfinishcode">PaymentFinishCode</a></code> |


#### InvalidInvoice

оплата завершилась без указания счета на оплату товаров или услуг

| Prop            | Type                        |
| --------------- | --------------------------- |
| **`invoiceId`** | <code>string \| null</code> |


#### PurchaseResult

результат успешного завершения покупки цифрового товара

| Prop             | Type                                                            |
| ---------------- | --------------------------------------------------------------- |
| **`finishCode`** | <code><a href="#paymentfinishcode">PaymentFinishCode</a></code> |
| **`orderId`**    | <code>string</code>                                             |
| **`purchaseId`** | <code>string</code>                                             |
| **`productId`**  | <code>string</code>                                             |


#### InvalidPurchase

при оплате цифрового товара оплата завершилась с ошибкой

| Prop             | Type                        |
| ---------------- | --------------------------- |
| **`purchaseId`** | <code>string \| null</code> |
| **`invoiceId`**  | <code>string \| null</code> |
| **`orderId`**    | <code>string \| null</code> |
| **`quantity`**   | <code>number \| null</code> |
| **`productId`**  | <code>string \| null</code> |
| **`errorCode`**  | <code>number \| null</code> |


### Type Aliases


#### PaymentResult

<code><a href="#invoiceresult">InvoiceResult</a> | <a href="#invalidinvoice">InvalidInvoice</a> | <a href="#purchaseresult">PurchaseResult</a> | <a href="#invalidpurchase">InvalidPurchase</a> | <a href="#invalidpaymentstate">InvalidPaymentState</a></code>


#### InvalidPaymentState

при завершении оплаты отсутствует состояние

<code>any</code>


### Enums


#### ProductType

| Members              | Value          |
| -------------------- | -------------- |
| **`NON_CONSUMABLE`** | <code>0</code> |
| **`CONSUMABLE`**     | <code>1</code> |
| **`SUBSCRIPTION`**   | <code>2</code> |


#### ProductStatus

| Members        | Value          |
| -------------- | -------------- |
| **`ACTIVE`**   | <code>0</code> |
| **`INACTIVE`** | <code>1</code> |


#### PurchaseState

| Members               | Value          | Description                      |
| --------------------- | -------------- | -------------------------------- |
| **`CREATED`**         | <code>0</code> | создана                          |
| **`INVOICE_CREATED`** | <code>1</code> | создана, ожидает оплаты          |
| **`CONFIRMED`**       | <code>2</code> | подтверждена                     |
| **`PAID`**            | <code>3</code> | оплачена                         |
| **`CANCELLED`**       | <code>4</code> | покупка отменена                 |
| **`CONSUMED`**        | <code>5</code> | потребление покупки подтверждено |
| **`CLOSED`**          | <code>6</code> | подписка была отменена           |


#### PaymentFinishCode

| Members                    | Value          | Description               |
| -------------------------- | -------------- | ------------------------- |
| **`SUCCESSFUL_PAYMENT`**   | <code>0</code> | успешная оплата           |
| **`CLOSED_BY_USER`**       | <code>1</code> | отменено пользователем    |
| **`UNHANDLED_FORM_ERROR`** | <code>2</code> | неизвестная ошибка        |
| **`PAYMENT_TIMEOUT`**      | <code>3</code> | ошибка оплаты по таймауту |
| **`DECLINED_BY_SERVER`**   | <code>4</code> | отклонено сервером        |
| **`RESULT_UNKNOWN`**       | <code>5</code> | неизвестный статус оплаты |

</docgen-api>
