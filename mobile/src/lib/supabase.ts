import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Adapter para usar SecureStore como storage do Supabase
const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        return SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        return SecureStore.deleteItemAsync(key);
    },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

// Types para o banco de dados
export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    name: string;
                    plan: string;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    name: string;
                    plan?: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    plan?: string;
                    created_at?: string;
                };
            };
            cart_items: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    quantity: number;
                    price: number;
                    image_url: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    name: string;
                    quantity?: number;
                    price: number;
                    image_url?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    name?: string;
                    quantity?: number;
                    price?: number;
                    image_url?: string | null;
                    created_at?: string;
                };
            };
            shopping_lists: {
                Row: {
                    id: string;
                    user_id: string;
                    name: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    name: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    name?: string;
                    created_at?: string;
                };
            };
            shopping_items: {
                Row: {
                    id: string;
                    list_id: string;
                    name: string;
                    quantity: number;
                    price_estimate: number | null;
                    status: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    list_id: string;
                    name: string;
                    quantity?: number;
                    price_estimate?: number | null;
                    status?: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    list_id?: string;
                    name?: string;
                    quantity?: number;
                    price_estimate?: number | null;
                    status?: string;
                    created_at?: string;
                };
            };
            transactions: {
                Row: {
                    id: string;
                    user_id: string;
                    type: string;
                    amount: number;
                    category: string | null;
                    description: string | null;
                    occurred_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    type: string;
                    amount: number;
                    category?: string | null;
                    description?: string | null;
                    occurred_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    type?: string;
                    amount?: number;
                    category?: string | null;
                    description?: string | null;
                    occurred_at?: string;
                };
            };
            goals: {
                Row: {
                    id: string;
                    user_id: string;
                    title: string;
                    target: number;
                    current: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    title: string;
                    target: number;
                    current?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    title?: string;
                    target?: number;
                    current?: number;
                    created_at?: string;
                };
            };
            scan_sessions: {
                Row: {
                    id: string;
                    user_id: string;
                    image_url: string;
                    extracted_items: any;
                    total: number | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    image_url: string;
                    extracted_items?: any;
                    total?: number | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    image_url?: string;
                    extracted_items?: any;
                    total?: number | null;
                    created_at?: string;
                };
            };
        };
    };
};
