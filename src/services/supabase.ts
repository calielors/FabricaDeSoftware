import Constants from "expo-constants";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl as string;
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.supabaseAnonKey as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);