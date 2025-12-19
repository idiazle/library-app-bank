import BannerInformativo from './components/molecules/BannerInformativo';
import TargetOption from './components/atoms/TargetOption';
import HeaderMovements from './components/molecules/HeaderMovements';
import Header from './components/molecules/Header';
import CardTransaction from './components/molecules/CardTransaction';
import ButtonCustom from './components/molecules/ButtonCustom';
import NativeNetworkMonitor from './NativeNetworkMonitor';
import NativeSecureStorage, {
  type KeyStorage,
  type SetKeyStorage,
} from './NativeSecureStorage';

export const calculateIncomeExpense = (array: any) => {
  let income = 0;
  let expense = 0;

  array.forEach((item: any) => {
    if (item.type === 'income') {
      income += item.amount;
    } else if (item.type === 'expense') {
      expense += item.amount;
    }
  });

  return { income, expense };
};

function setItem({ key, value }: SetKeyStorage) {
  return NativeSecureStorage.setItem({ key, value });
}

function getItem({ key }: KeyStorage) {
  return NativeSecureStorage.getItem({ key });
}

function removeItem({ key }: KeyStorage) {
  return NativeSecureStorage.removeItem({ key });
}

function getAllKeys() {
  return NativeSecureStorage.getAllKeys();
}

function clearStorage() {
  return NativeSecureStorage.clear();
}

function getConnectionInfo() {
  return NativeNetworkMonitor.getCurrentState();
}

//export all components
export {
  BannerInformativo,
  TargetOption,
  HeaderMovements,
  Header,
  CardTransaction,
  ButtonCustom,
  setItem,
  getItem,
  removeItem,
  getAllKeys,
  clearStorage,
  getConnectionInfo,
};
