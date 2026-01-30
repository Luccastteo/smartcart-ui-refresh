import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Minus, Plus, Trash, ArrowRight, ShoppingBag } from 'lucide-react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }: any) {
    const { products, total, itemCount, updateQuantity, removeProduct, loading } = useCart();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setRefreshing(false);
    }, []);

    const renderItem = ({ item }: { item: typeof products[0] }) => (
        <View style={styles.cartItem}>
            <View style={styles.imagePlaceholder}>
                {item.imageUri ? (
                    <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
                ) : (
                    <Text style={{ fontSize: 24 }}>🛒</Text>
                )}
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.qtyControls}>
                <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                    <Minus color={COLORS.textPrimary} size={16} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                    <Plus color={COLORS.textPrimary} size={16} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeProduct(item.id)}
            >
                <Trash color={COLORS.statusError} size={20} />
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (products.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}>
                    <ShoppingBag color={COLORS.muted} size={64} strokeWidth={1.5} />
                    <Text style={styles.emptyTitle}>Carrinho Vazio</Text>
                    <Text style={styles.emptyMessage}>
                        Capture produtos para adicionar ao carrinho
                    </Text>
                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={() => navigation.navigate('Capture')}
                    >
                        <Text style={styles.captureButtonText}>Capturar Produto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Meu Carrinho</Text>
                <Text style={styles.itemCount}>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</Text>
            </View>

            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.accent}
                        colors={[COLORS.accent]}
                    />
                }
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text style={styles.checkoutText}>Finalizar Compra</Text>
                    <ArrowRight color={COLORS.background} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    title: { fontFamily: FONTS.bold, fontSize: 28, color: COLORS.textPrimary },
    itemCount: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textSecondary },
    listContent: { paddingHorizontal: 24, paddingBottom: 140 },

    cartItem: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg, padding: 16, marginBottom: 12
    },
    imagePlaceholder: {
        width: 60, height: 60, borderRadius: RADIUS.md,
        backgroundColor: COLORS.muted, justifyContent: 'center', alignItems: 'center'
    },
    itemImage: { width: 60, height: 60, borderRadius: RADIUS.md },
    itemDetails: { flex: 1, marginLeft: 16 },
    itemName: { fontFamily: FONTS.medium, fontSize: 15, color: COLORS.textPrimary, marginBottom: 4 },
    itemPrice: { fontFamily: FONTS.regular, fontSize: 14, color: COLORS.accent },

    qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    qtyButton: {
        width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.muted,
        justifyContent: 'center', alignItems: 'center'
    },
    qtyText: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textPrimary, minWidth: 24, textAlign: 'center' },
    removeButton: { marginLeft: 12, padding: 8 },

    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: COLORS.surface, paddingHorizontal: 24, paddingVertical: 20,
        borderTopWidth: 1, borderTopColor: COLORS.muted
    },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    totalLabel: { fontFamily: FONTS.medium, fontSize: 16, color: COLORS.textSecondary },
    totalValue: { fontFamily: FONTS.bold, fontSize: 24, color: COLORS.accent },
    checkoutButton: {
        backgroundColor: COLORS.accent, borderRadius: RADIUS.lg,
        paddingVertical: 16, flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', gap: 8
    },
    checkoutText: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.background },

    emptyContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40
    },
    emptyTitle: {
        fontFamily: FONTS.bold, fontSize: 24, color: COLORS.textPrimary,
        marginTop: 24, marginBottom: 8
    },
    emptyMessage: {
        fontFamily: FONTS.regular, fontSize: 15, color: COLORS.textSecondary,
        textAlign: 'center', marginBottom: 32
    },
    captureButton: {
        backgroundColor: COLORS.accent, paddingHorizontal: 32, paddingVertical: 16,
        borderRadius: RADIUS.lg
    },
    captureButtonText: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.background },
    loadingText: { fontFamily: FONTS.medium, fontSize: 16, color: COLORS.textSecondary },
});
