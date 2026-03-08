// app/services/supabase.ts
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Credentials found in your Supabase Data API settings
const supabaseUrl = 'https://olyyugdntngmvionleqx.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seXl1Z2RudG5nbXZpb25sZXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4Nzk4NTgsImV4cCI6MjA3OTQ1NTg1OH0.HESHX2Yx0cpUUAXOGnyh2K16RR_pKbYOGYZlRCrKRZc'; // Copy this from your Supabase API settings

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});