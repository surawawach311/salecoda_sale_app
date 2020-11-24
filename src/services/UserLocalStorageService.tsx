import AsyncStorage from "@react-native-async-storage/async-storage";
export class UserLocalStorageService {
  static USER_LOCAL_STORAGE_KEY = "access_token";

  static putAccessToken(accessToken: string): boolean {
    const currentUser = AsyncStorage.getItem(this.USER_LOCAL_STORAGE_KEY);

    if (!currentUser) {
      AsyncStorage.setItem(this.USER_LOCAL_STORAGE_KEY, accessToken);
      return true;
    } else {
      return false;
    }
  }

  static async haveAccessToken(): Promise<boolean> {
    const currentUser = await AsyncStorage.getItem(this.USER_LOCAL_STORAGE_KEY);
    if (!currentUser) {
      return false;
    } else {
      return true;
    }
  }

  static getAccessToken(): Promise<string | null> {
    const currentUser = AsyncStorage.getItem(this.USER_LOCAL_STORAGE_KEY);
    return currentUser;
  }

  static async deleteAccessToken(): Promise<void> {
    return await AsyncStorage.removeItem(this.USER_LOCAL_STORAGE_KEY);
  }
}
