import { TurboModuleRegistry, type TurboModule } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypesNamespace';

export interface ConnectionInfo {
  type: 'wifi' | 'cellular' | 'none' | 'unknown';
  isConnected: boolean;
  isInternetReachable: boolean;
}

export interface Spec extends TurboModule {
  getCurrentState(): Promise<ConnectionInfo>;
  startMonitoring(): void;
  stopMonitoring(): void;
  addListener(eventName: string): void;
  removeListeners(count: Int32): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetworkMonitor');
