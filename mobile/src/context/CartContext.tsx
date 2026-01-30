import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

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

const STORAGE_KEY = 'pagly_cart';

export function CartProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [loading, setLoading] = useState(true);

    // Carregar dados do SecureStore ao iniciar
    useEffect(() => {
        loadCart();
    }, []);

    // Salvar no SecureStore sempre que produtos mudarem
    useEffect(() => {
        if (!loading) {
            saveCart();
        }
    }, [products, loading]);

    const loadCart = async () => {
        try {
            const data = await SecureStore.getItemAsync(STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                // Converter strings de data de volta para Date
                const productsWithDates = parsed.map((p: any) => ({
                    ...p,
                    addedAt: new Date(p.addedAt)
                }));
                setProducts(productsWithDates);
            }
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveCart = async () => {
        try {
            await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(products));
        } catch (error) {
            console.error('Erro ao salvar carrinho:', error);
        }
    };

    const addProduct = async (product: Omit<CartProduct, 'id' | 'addedAt'>) => {
        const newProduct: CartProduct = {
            ...product,
            id: Date.now().toString(),
            addedAt: new Date(),
        };

        setProducts(prev => [...prev, newProduct]);
    };

    const removeProduct = async (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateQuantity = async (id: string, quantity: number) => {
        if (quantity <= 0) {
            await removeProduct(id);
            return;
        }

        setProducts(prev =>
            prev.map(p => (p.id === id ? { ...p, quantity } : p))
        );
    };

    const clearCart = async () => {
        setProducts([]);
        try {
            await SecureStore.deleteItemAsync(STORAGE_KEY);
        } catch (error) {
            console.error('Erro ao limpar carrinho:', error);
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
