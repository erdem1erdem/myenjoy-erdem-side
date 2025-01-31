package com.iptvapp.macaddress
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.NativeModule
import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.net.wifi.WifiManager
import java.net.NetworkInterface;

class MacAddressModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MacAddressModule"
    }
   
    @ReactMethod
    fun getMacAddress(promise: Promise) {
       try {
            val wifiManager = reactApplicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
            val macAddress = wifiManager.connectionInfo.macAddress
            if (macAddress != null) {
                promise.resolve(macAddress)
            } else {
                promise.reject("MAC_ADDRESS_NULL", "Failed to retrieve MAC address")
            }
        } catch (e: Exception) {
            promise.reject("GET_MAC_ADDRESS_FAILED", e.message)
        }
    }
}
