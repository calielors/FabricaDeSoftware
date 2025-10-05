import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveLogin(username: string) {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('username', username);
}

export async function isLoggedIn() {
    const value = await AsyncStorage.getItem('isLoggedIn');
    return value === 'true';
}

export async function logout() {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('username');
}
