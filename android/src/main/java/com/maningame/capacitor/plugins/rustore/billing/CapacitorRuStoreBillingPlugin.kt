package com.maningame.capacitor.plugins.rustore.billing

import android.content.Intent
import android.util.Log
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import kotlinx.coroutines.*
import org.json.JSONArray
import org.json.JSONException
import ru.rustore.sdk.billingclient.RuStoreBillingClient
import ru.rustore.sdk.billingclient.RuStoreBillingClient.init
import ru.rustore.sdk.billingclient.RuStoreBillingClient.onNewIntent
import ru.rustore.sdk.billingclient.model.product.ProductsResponse
import ru.rustore.sdk.billingclient.model.purchase.PaymentResult
import ru.rustore.sdk.billingclient.model.purchase.response.ConfirmPurchaseResponse
import ru.rustore.sdk.billingclient.model.purchase.response.DeletePurchaseResponse
import ru.rustore.sdk.billingclient.model.purchase.response.PurchasesResponse
import java.util.concurrent.ExecutionException

@CapacitorPlugin(name = "CapacitorRuStoreBilling")
class CapacitorRuStoreBillingPlugin : Plugin() {

    override fun load() {
        super.load()
        val appContext = context
        val applicationId = context.packageName
        val consoleApplicationId = config.getString(CONFIG_KEY_CONSOLE_APPLICATION_ID) // "508863";
        val deeplinkPrefix =
            config.getString(CONFIG_KEY_DEEPLINK_PREFIX) // "yourappscheme://iamback";
        try {
            init(
                appContext,
                applicationId,
                consoleApplicationId,
                deeplinkPrefix
            )
        } catch (e: Exception) {
            e.printStackTrace()
            return
        }

    }

    override fun handleOnNewIntent(intent: Intent) {
        super.handleOnNewIntent(intent)
        onNewIntent(intent)
    }

    @PluginMethod
    fun echo(call: PluginCall) {
        val value = call.getString("value")
        Log.i("Echo", value!!)
        val ret = JSObject()
        ret.put("value", value)
        call.resolve(ret)
    }

    @PluginMethod
    fun getProducts(call: PluginCall) {
        runBlocking {
            val job =
                CoroutineScope(Dispatchers.IO).launch {
                    val language: String = call.getString("language") as String

                    val productsList: MutableList<String> = ArrayList()
                    val jsonArray = call.getArray("productIds") as JSONArray
                    val len = jsonArray.length()
                    for (i in 0 until len) {
                        try {
                            productsList.add(jsonArray[i].toString())
                        } catch (e: JSONException) {
                            e.printStackTrace()
                            call.reject(e.message, e)
                            return@launch
                        }
                    }
                    val productsResponse: ProductsResponse = try {
                        RuStoreBillingClient.products.getProducts(language, productsList)
                    } catch (e: ExecutionException) {
                        e.printStackTrace()
                        call.reject(e.message, e)
                        return@launch
                    } catch (e: InterruptedException) {
                        e.printStackTrace()
                        call.reject(e.message, e)
                        return@launch
                    } catch (e: Exception) {
                        e.printStackTrace()
                        call.reject(e.message, e)
                        return@launch
                    }
                    val result = JSObject()
                    result.put("code", productsResponse.code)
                    result.put("errorMessage", productsResponse.errorMessage)
                    result.put("errorDescription", productsResponse.errorDescription)
                    result.put("traceId", productsResponse.traceId)
                    result.put("errors", productsResponse.errors)
                    result.put("products", productsResponse.products)
                    call.resolve(result)
                }

            job.join()
        }
    }

    @PluginMethod
    fun getPurchases(call: PluginCall) {
        runBlocking {
            val job = CoroutineScope(Dispatchers.IO).launch {
                val language: String = call.getString("language") as String

                val purchasesResponse: PurchasesResponse = try {
                    RuStoreBillingClient.purchases.getPurchases(language = language)
                } catch (e: Exception) {
                    e.printStackTrace()
                    call.reject(e.message, e)
                    return@launch
                }
                val result = JSObject()
                result.put("code", purchasesResponse.code)
                result.put("errorMessage", purchasesResponse.errorMessage)
                result.put("errorDescription", purchasesResponse.errorDescription)
                result.put("traceId", purchasesResponse.traceId)
                result.put("errors", purchasesResponse.errors)
                result.put("purchases", purchasesResponse.purchases)
                call.resolve(result)
            }

            job.join()
        }
    }

    @PluginMethod
    fun purchaseProduct(call: PluginCall) {
        runBlocking {
            val job = CoroutineScope(Dispatchers.IO).launch {
                val productId: String = call.getString("productId") as String
                val orderId: String = call.getString("orderId") as String
                val quantity: Int = call.getInt("quantity") as Int
                val developerPayload: String = call.getString("developerPayload") as String

            CoroutineScope(Dispatchers.IO).async {
                RuStoreBillingClient.purchases.resultObserver()
                    .collect() { result: PaymentResult ->
                        run {
                            val ret = JSObject()
                            when (result) {
                                is PaymentResult.InvoiceResult -> {
                                    ret.put("invoiceId", result.invoiceId)
                                    ret.put("finishCode", result.finishCode)
                                }
                                is PaymentResult.InvalidInvoice -> {
                                    ret.put("invoiceId", result.invoiceId)
                                }
                                PaymentResult.InvalidPaymentState -> {
                                    // add nothing
                                }
                                is PaymentResult.InvalidPurchase -> {
                                    ret.put("purchaseId", result.purchaseId)
                                    ret.put("invoiceId", result.invoiceId)
                                    ret.put("orderId", result.orderId)
                                    ret.put("quantity", result.quantity)
                                    ret.put("productId", result.productId)
                                    ret.put("errorCode", result.errorCode)
                                }
                                is PaymentResult.PurchaseResult -> {
                                    ret.put("finishCode", result.finishCode)
                                    ret.put("orderId", result.orderId)
                                    ret.put("purchaseId", result.purchaseId)
                                    ret.put("productId", result.productId)
                                }
                            }
                            notifyListeners("paymentResultReceived", ret)
                        }
                    }
            }

                try {
                    RuStoreBillingClient.purchases.purchaseProduct(
                        context = context,
                        productId = productId,
                        orderId = orderId,
                        quantity = quantity,
                        developerPayload = developerPayload
                    )

                    call.resolve()
                } catch (e: Exception) {
                    e.printStackTrace()
                    call.reject(e.message, e)
                    return@launch
                }
            }

            job.join()
        }
    }

    fun confirmPurchase(call: PluginCall) {
        runBlocking {
            val job = CoroutineScope(Dispatchers.IO).launch {
                val productId: String = call.getString("productId") as String
                val language: String = call.getString("language") as String
                val developerPayload: String = call.getString("developerPayload") as String


                val confirmPurchaseResponse: ConfirmPurchaseResponse = try {
                    RuStoreBillingClient.purchases.confirmPurchase(
                        purchaseId = productId,
                        language = language,
                        developerPayload = developerPayload
                    )
                } catch (e: Exception) {
                    e.printStackTrace()
                    call.reject(e.message, e)
                    return@launch
                }

                val result = JSObject()
                result.put("code", confirmPurchaseResponse.code)
                result.put("errorMessage", confirmPurchaseResponse.errorMessage)
                result.put("errorDescription", confirmPurchaseResponse.errorDescription)
                result.put("traceId", confirmPurchaseResponse.traceId)
                result.put("errors", confirmPurchaseResponse.errors)
                call.resolve(result)
            }

            job.join()
        }
    }

    fun deletePurchase(call: PluginCall) {
        runBlocking {
            val job = CoroutineScope(Dispatchers.IO).launch {
                val productId: String = call.getString("productId") as String
                val language: String = call.getString("language") as String


                val deletePurchaseResponse: DeletePurchaseResponse = try {
                    RuStoreBillingClient.purchases.deletePurchase(
                        purchaseId = productId,
                        language = language,
                    )
                } catch (e: Exception) {
                    e.printStackTrace()
                    call.reject(e.message, e)
                    return@launch
                }

                val result = JSObject()
                result.put("code", deletePurchaseResponse.code)
                result.put("errorMessage", deletePurchaseResponse.errorMessage)
                result.put("errorDescription", deletePurchaseResponse.errorDescription)
                result.put("traceId", deletePurchaseResponse.traceId)
                result.put("errors", deletePurchaseResponse.errors)
                call.resolve(result)
            }

            job.join()
        }
    }

    companion object {
        // config values --
        const val CONFIG_KEY_CONSOLE_APPLICATION_ID = "consoleApplicationId"
        const val CONFIG_KEY_DEEPLINK_PREFIX = "deeplinkPrefix"
    }
}
