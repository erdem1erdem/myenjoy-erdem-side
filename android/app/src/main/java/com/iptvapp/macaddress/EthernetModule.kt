


package com.iptvapp.macaddress

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.net.NetworkInterface
import java.io.BufferedReader
import java.io.FileReader

class EthernetModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "EthernetModule"
    }

    @ReactMethod
    fun getEthernetMacAddress(promise: Promise) {
        try {
            val macAddress = getMacAddr()
            if (macAddress != null) {
                promise.resolve(macAddress)
            } else {
                promise.reject("MAC_ADDRESS_ERROR", "Unable to retrieve MAC address")
            }
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }

    private fun getMacAddr(): String? {
         try {
            val reader = BufferedReader(FileReader("/sys/class/net/eth0/address"))
            val macAddress = reader.readLine().trim()
            reader.close()
             return macAddress.toString()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return null
    }
}

