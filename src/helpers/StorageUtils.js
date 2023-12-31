export default class StorageUtils {
  // local storage
  static setItem(key, value) {
    window.localStorage.setItem(key, value);
  }

  static getItem(key, defaultValue) {
    const result = window.localStorage.getItem(key);
    if (result === null || result === undefined) return defaultValue;
    return result;
  }

  static removeItem(key) {
    window.localStorage.removeItem(key);
  }
}
