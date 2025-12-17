package com.libraryappbank;

import android.Manifest
import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import androidx.annotation.RequiresPermission
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule

@ReactModule(name = NetworkMonitorModule.NAME)
class NetworkMonitorModule(reactContext: ReactApplicationContext):NativeNetworkMonitorSpec(reactContext) {

  private var isMonitoring = false
  private var listenerCount = 0  // Track active listeners
  private val connectivityManager = reactContext
    .getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

  private val networkCallback = object : ConnectivityManager.NetworkCallback() {
    @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
    override fun onAvailable(network: Network) {
      // Only send events if there are active listeners
      println("onAvailable $listenerCount")
      if (listenerCount > 0) {

        emitAddListener(getCurrentNetworkState())
      }
    }

    @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
    override fun onLost(network: Network) {
      // Only send events if there are active listeners
      println("onLost $listenerCount")
      if (listenerCount > 0) {

        emitAddListener(getCurrentNetworkState())
      }
    }

    @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
    override fun onCapabilitiesChanged(network: Network, capabilities: NetworkCapabilities) {
      // Only send events if there are active listeners
      println("onCapabilitiesChanged $listenerCount")
      if (listenerCount > 0) {

        emitAddListener(getCurrentNetworkState())
      }
    }
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  private fun getCurrentNetworkState(): WritableMap {
    val map = WritableNativeMap()

    val network = connectivityManager.activeNetwork
    val capabilities = connectivityManager.getNetworkCapabilities(network)

    if (capabilities == null) {
      map.putString("type", "none")
      map.putBoolean("isConnected", false)
      map.putBoolean("isInternetReachable", false)
      return map
    }

    val type = when {
      capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "wifi"
      capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "cellular"
      else -> "unknown"
    }

    map.putString("type", type)
    map.putBoolean("isConnected", true)
    map.putBoolean("isInternetReachable",
      capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET))

    return map
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun getCurrentState(promise: Promise) {
    try {
      val state = getCurrentNetworkState()
      promise.resolve(state)
    } catch (e: Exception) {
      promise.reject("NETWORK_ERROR", "Failed to get current state: ${e.message}", e)
    }
  }

  @RequiresPermission(Manifest.permission.ACCESS_NETWORK_STATE)
  override fun startMonitoring() {
    if (!isMonitoring) {
      val request = NetworkRequest.Builder()
        .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
        .build()
      connectivityManager.registerNetworkCallback(request, networkCallback)
      listenerCount += 1
      isMonitoring = true
    }
  }

  override fun stopMonitoring() {
    if (isMonitoring) {
      connectivityManager.unregisterNetworkCallback(networkCallback)
      isMonitoring = false
    }
  }


  override fun removeListeners(count: Double) {
    // Keep: Required for RN built-in Event Emitter Calls
    listenerCount -= count.toInt()

    // Auto-stop monitoring when no listeners remain
    if (listenerCount <= 0) {
      listenerCount = 0
      stopMonitoring()
    }
  }

  companion object {
    const val NAME = "NetworkMonitor"
  }
}