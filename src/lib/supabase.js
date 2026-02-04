
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate URL format to prevent "supabaseUrl is required" or invalid URL errors
const isValidUrl = (url) => {
    try {
        return url && new URL(url);
    } catch (e) {
        return false;
    }
};

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('CRITICAL: Supabase environment variables are missing!');
} else if (!isValidUrl(supabaseUrl)) {
    console.error('CRITICAL: VITE_SUPABASE_URL is not a valid URL:', supabaseUrl);
}

export const supabase = (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl))
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
