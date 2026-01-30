import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Minus, Plus, Trash, ArrowRight } from 'lucide-react-native';

const MOCK_CART = [
    { id: '1', name: 'Leite Integral 1L', price: 4.50, qty: 2, image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Pão de Forma', price: 8.90, qty: 1, image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Café Melitta 500g', price: 18.90, qty: 1, image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Maçã Fuji Kg', price: 12.50, qty: 0.5, image: 'https://via.placeholder.com/100' },
];

export default function CartScreen({ navigation }: any) {
    const [cartItems, setCartItems] = useState(MOCK_CART);
    const [refreshing, setRefreshing] = useState(false);

    const updateQty = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }).filter(item => item.qty > 0));
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            // Simular atualização do carrinho
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Aqui você pode adicionar: await fetchCartItems();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const renderItem = ({ item }: { item: typeof MOCK_CART[0] }) => (
        <View style={styles.cartItem}>
            <View style={styles.imagePlaceholder}>
                {/* <Image source={{ uri: item.image }} style={styles.itemImage} /> */}
                <Text style={{ fontSize: 24 }}>🛒</Text>
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}>
                    <Minus color={COLORS.textSecondary} size={16} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}>
                    <Plus color={COLORS.textPrimary} size={16} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Carrinho</Text>
                <Text style={styles.headerSubtitle}>{cartItems.length} itens</Text>
            </View>

            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLORS.accent]}
                        tintColor={COLORS.accent}
                        progressBackgroundColor={COLORS.surface}
                    />
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
                    </View>
                }
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('Checkout', { total, items: cartItems })}
                >
                    <Text style={styles.checkoutText}>Finalizar Compra</Text>
                    <ArrowRight color="#000" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 60 },
    header: { paddingHorizontal: 24, marginBottom: 24 },
    headerTitle: { fontFamily: FONTS.bold, fontSize: 32, color: COLORS.textPrimary },
    headerSubtitle: { fontFamily: FONTS.regular, fontSize: 16, color: COLORS.textSecondary, marginTop: 4 },
    listContent: { paddingHorizontal: 24, paddingBottom: 100 },
    cartItem: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
        padding: 12, borderRadius: RADIUS.md, marginBottom: 12,
        borderWidth: 1, borderColor: COLORS.border
    },
    imagePlaceholder: {
        width: 64, height: 64, borderRadius: RADIUS.sm, backgroundColor: COLORS.surfaceHighlight,
        justifyContent: 'center', alignItems: 'center', marginRight: 16
    },
    itemImage: { width: 64, height: 64, borderRadius: RADIUS.sm },
    itemDetails: { flex: 1 },
    itemName: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 14, marginBottom: 4 },
    itemPrice: { fontFamily: FONTS.regular, color: COLORS.accent, fontSize: 14 },
    qtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, borderRadius: 8 },
    qtyBtn: { padding: 8 },
    qtyText: { fontFamily: FONTS.medium, color: COLORS.textPrimary, width: 24, textAlign: 'center' },
    footer: {
        padding: 24, paddingBottom: 40, borderTopWidth: 1, borderTopColor: COLORS.border,
        backgroundColor: COLORS.surface
    },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    totalLabel: { fontFamily: FONTS.regular, color: COLORS.textSecondary, fontSize: 16 },
    totalValue: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 32 },
    checkoutButton: {
        backgroundColor: COLORS.accent, height: 56, borderRadius: RADIUS.md,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    checkoutText: { fontFamily: FONTS.bold, color: '#000', fontSize: 16, marginRight: 8 },
    emptyContainer: { alignItems: 'center', marginTop: 40 },
    emptyText: { fontFamily: FONTS.regular, color: COLORS.textSecondary },
});
