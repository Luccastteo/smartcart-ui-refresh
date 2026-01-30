import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface CartProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUri?: string;
    addedAt: Date;
}

interface CartContextData {
    products: CartProduct[];
    total: number;
    itemCount: number;
    addProduct: (product: Omit<CartProduct, 'id' | 'addedAt'>) => Promise<void>;
    removeProduct: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    loading: boolean;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [loading, setLoading] = useState(true);

    // Carregar carrinho do Supabase quando usuário logar
    useEffect(() => {
        if (user) {
            loadCart();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [user]);

    const loadCart = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const cartProducts: CartProduct[] = (data || []).map((item: any) => ({
                id: item.id,
                name: item.name,
                price: parseFloat(item.price),
                quantity: parseFloat(item.quantity),
                imageUri: item.image_url,
                addedAt: new Date(item.created_at),
            }));

            setProducts(cartProducts);
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product: Omit<CartProduct, 'id' | 'addedAt'>) => {
        if (!user) {
            console.error('Usuário não autenticado');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('cart_items')
                .insert({
                    user_id: user.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    image_url: product.imageUri,
                })
                .select()
                .single();

            if (error) throw error;

            const newProduct: CartProduct = {
                id: data.id,
                name: data.name,
                price: parseFloat(data.price),
                quantity: parseFloat(data.quantity),
                imageUri: data.image_url,
                addedAt: new Date(data.created_at),
            };

            setProducts(prev => [newProduct, ...prev]);
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            throw error;
        }
    };

    const removeProduct = async (id: string) => {
        if (!user) return;

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id);

            if (error) throw error;

            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Erro ao remover produto:', error);
            throw error;
        }
    };

    const updateQuantity = async (id: string, quantity: number) => {
        if (!user) return;

        if (quantity <= 0) {
            await removeProduct(id);
            return;
        }

        try {
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity })
                .eq('id', id)
                .eq('user_id', user.id);

            if (error) throw error;

            setProducts(prev =>
                prev.map(p => (p.id === id ? { ...p, quantity } : p))
            );
        } catch (error) {
            console.error('Erro ao atualizar quantidade:', error);
            throw error;
        }
    };

    const clearCart = async () => {
        if (!user) return;

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user.id);

            if (error) throw error;

            setProducts([]);
        } catch (error) {
            console.error('Erro ao limpar carrinho:', error);
            throw error;
        }
    };

    // Calcular total
    const total = products.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
    }, 0);

    // Contar itens
    const itemCount = products.reduce((sum, product) => {
        return sum + product.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                products,
                total,
                itemCount,
                addProduct,
                removeProduct,
                updateQuantity,
                clearCart,
                loading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
