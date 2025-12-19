package com.libraryappbank

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.libraryappbank.securestorage.SecureStorageModule
import com.libraryappbank.networkmonitor.NetworkMonitorModule
import java.util.HashMap

class LibraryAppBankPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      LibraryAppBankModule.NAME -> LibraryAppBankModule(reactContext)
      SecureStorageModule.NAME -> SecureStorageModule(reactContext)
      NetworkMonitorModule.NAME -> NetworkMonitorModule(reactContext)
      else -> null
    } as NativeModule?
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      // ✔ HooksModule
      moduleInfos[LibraryAppBankModule.NAME] =
        ReactModuleInfo(
          LibraryAppBankModule.NAME,
          LibraryAppBankModule.NAME,
          false,
          false,
          false,
          true   // TurboModule
        )

      // ✔ SecureStorageModule
      moduleInfos[SecureStorageModule.NAME] =
        ReactModuleInfo(
          SecureStorageModule.NAME,
          SecureStorageModule.NAME,
          false,
          false,
          false,
          true   // TurboModule
        )

      // ✔ NetworkMonitorModule
      moduleInfos[NetworkMonitorModule.NAME] =
        ReactModuleInfo(
          NetworkMonitorModule.NAME,
          NetworkMonitorModule.NAME,
          false,
          false,
          false,
          true   // TurboModule
        )

      moduleInfos
    }
  }
}

