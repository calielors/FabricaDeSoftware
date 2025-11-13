import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabase';

const SESSION_KEY = 'supabase_session';
const USERNAME_KEY = 'username';

export async function saveSession(session: any, username?: string) {
  try {
    if (!session) return;

    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));

    if (username) {
      await AsyncStorage.setItem(USERNAME_KEY, username);
    }

    console.log('[Auth] Session saved to storage.');
  } catch (err) {
    console.error('[Auth] Failed to save session:', err);
  }
}

export async function restoreSession() {
  try {
    const storedSession = await AsyncStorage.getItem(SESSION_KEY);
    if (!storedSession) return null;

    const session = JSON.parse(storedSession);

    const { data, error } = await supabase.auth.setSession(session);
    if (error) {
      console.error('[Auth] Failed to restore session:', error.message);
      await clearSession();
      return null;
    }

    console.log('[Auth] Session restored successfully.');
    return data.session;
  } catch (err) {
    console.error('[Auth] Failed to restore session:', err);
    return null;
  }
}


export async function isLoggedIn() {
  const storedSession = await AsyncStorage.getItem(SESSION_KEY);
  return !!storedSession;
}

export async function clearSession() {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
    await AsyncStorage.removeItem(USERNAME_KEY);
    await supabase.auth.signOut();
    console.log('[Auth] Session cleared.');
  } catch (err) {
    console.error('[Auth] Failed to clear session:', err);
  }
}
