import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { ArrowLeft, Check, CreditCard, Smartphone, Building2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useCart } from '../context/CartContext';

type PaymentMethod = 'pix' | 'credit' | 'debit';

export default function CheckoutScreen({ navigation }: any) {
    const { products, total, itemCount, clearCart } = useCart();
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSelectPayment = async (method: PaymentMethod) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedPayment(method);
    };

    const handleConfirmPayment = async () => {
        if (!selectedPayment) {
            Alert.alert('Atenção', 'Selecione um método de pagamento');
            return;
        }

        setProcessing(true);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        // Simular processamento de pagamento
        // TODO: Integrar com Mercado Pago SDK
        setTimeout(async () => {
            setProcessing(false);

            // Limpar carrinho após pagamento bem-sucedido
            await clearCart();

            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            Alert.alert(
                '🎉 Pagamento Confirmado!',
                `Compra de R$ ${total.toFixed(2)} processada com sucesso.\\n\\nMétodo: ${getPaymentMethodName(selectedPayment)}`,
                [
                    {
                        text: 'Ver Recibo',
                        onPress: () => {
                            // TODO: Navegar para tela de recibo
                            navigation.navigate('Tabs', { screen: 'Home' });
                        },
                    },
                    {
                        text: 'Voltar ao Início',
                        onPress: () => navigation.navigate('Tabs', { screen: 'Home' }),
                        style: 'cancel'
                    },
                ]
            );
        }, 2500);
    };

    const getPaymentMethodName = (method: PaymentMethod) => {
        switch (method) {
            case 'pix': return 'PIX';
            case 'credit': return 'Cartão de Crédito';
            case 'debit': return 'Cartão de Débito';
            default: return '';
        }
    };

    const PaymentOption = ({ method, icon: Icon, title, subtitle }: {
        method: PaymentMethod;
        icon: any;
        title: string;
        subtitle: string;
    }) => {
        const isSelected = selectedPayment === method;

        return (
            <TouchableOpacity
                style={[styles.paymentOption, isSelected && styles.paymentOptionSelected]}
                onPress={() => handleSelectPayment(method)}
            >
                <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                    <Icon color={isSelected ? COLORS.accent : COLORS.textSecondary} size={24} />
                </View>
                <View style={styles.paymentInfo}>
                    <Text style={[styles.paymentTitle, isSelected && styles.paymentTitleSelected]}>
                        {title}
                    </Text>
                    <Text style={styles.paymentSubtitle}>{subtitle}</Text>
                </View>
                {isSelected && (
                    <View style={styles.checkIcon}>
                        <Check color={COLORS.accent} size={20} strokeWidth={3} />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color={COLORS.textPrimary} size={24} strokeWidth={1.5} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Finalizar Compra</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Resumo do Pedido */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total de itens</Text>
                            <Text style={styles.summaryValue}>{itemCount} {itemCount === 1 ? 'item' : 'itens'}</Text>
                        </View>

                        {/* Lista de produtos */}
                        <View style={styles.divider} />
                        {products.slice(0, 3).map((product, index) => (
                            <View key={product.id} style={styles.productRow}>
                                <Text style={styles.productName} numberOfLines={1}>
                                    {product.quantity}x {product.name}
                                </Text>
                                <Text style={styles.productPrice}>
                                    R$ {(product.price * product.quantity).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                        {products.length > 3 && (
                            <Text style={styles.moreItems}>
                                +{products.length - 3} {products.length - 3 === 1 ? 'item' : 'itens'}
                            </Text>
                        )}

                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>Total a pagar</Text>
                            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Métodos de Pagamento */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Método de Pagamento</Text>

                    <PaymentOption
                        method="pix"
                        icon={Smartphone}
                        title="PIX"
                        subtitle="Aprovação instantânea"
                    />

                    <PaymentOption
                        method="credit"
                        icon={CreditCard}
                        title="Cartão de Crédito"
                        subtitle="Parcelamento disponível"
                    />

                    <PaymentOption
                        method="debit"
                        icon={Building2}
                        title="Cartão de Débito"
                        subtitle="Débito em conta"
                    />
                </View>

                {/* Informações Adicionais */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        🔒 Pagamento 100% seguro e criptografado
                    </Text>
                    <Text style={styles.infoText}>
                        ✅ Confirmação instantânea por e-mail
                    </Text>
                </View>
            </ScrollView>

            {/* Footer com botão de confirmar */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.confirmButton, (!selectedPayment || processing) && styles.confirmButtonDisabled]}
                    onPress={handleConfirmPayment}
                    disabled={!selectedPayment || processing}
                >
                    {processing ? (
                        <ActivityIndicator color={COLORS.background} />
                    ) : (
                        <>
                            <Text style={styles.confirmButtonText}>
                                Confirmar Pagamento
                            </Text>
                            <Text style={styles.confirmButtonValue}>
                                R$ {total.toFixed(2)}
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20
    },
    backButton: { padding: 8 },
    headerTitle: { fontFamily: FONTS.bold, fontSize: 20, color: COLORS.textPrimary },

    scrollContent: { paddingHorizontal: 24, paddingBottom: 120 },
    section: { marginBottom: 32 },
    sectionTitle: {
        fontFamily: FONTS.bold, fontSize: 18, color: COLORS.textPrimary, marginBottom: 16
    },

    summaryCard: {
        backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: 20
    },
    summaryRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    summaryLabel: { fontFamily: FONTS.regular, fontSize: 14, color: COLORS.textSecondary },
    summaryValue: { fontFamily: FONTS.medium, fontSize: 14, color: COLORS.textPrimary },

    productRow: {
        flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8
    },
    productName: {
        fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textSecondary, flex: 1, marginRight: 12
    },
    productPrice: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.textPrimary },
    moreItems: {
        fontFamily: FONTS.regular, fontSize: 12, color: COLORS.textSecondary,
        fontStyle: 'italic', paddingTop: 8
    },

    divider: { height: 1, backgroundColor: COLORS.muted, marginVertical: 16 },
    totalLabel: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textPrimary },
    totalValue: { fontFamily: FONTS.bold, fontSize: 24, color: COLORS.accent },

    paymentOption: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg, padding: 16, marginBottom: 12,
        borderWidth: 2, borderColor: 'transparent'
    },
    paymentOptionSelected: { borderColor: COLORS.accent, backgroundColor: 'rgba(163, 230, 53, 0.05)' },
    iconBox: {
        width: 48, height: 48, borderRadius: RADIUS.md, backgroundColor: COLORS.muted,
        justifyContent: 'center', alignItems: 'center'
    },
    iconBoxSelected: { backgroundColor: 'rgba(163, 230, 53, 0.15)' },
    paymentInfo: { flex: 1, marginLeft: 16 },
    paymentTitle: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textPrimary, marginBottom: 4 },
    paymentTitleSelected: { color: COLORS.accent },
    paymentSubtitle: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textSecondary },
    checkIcon: {
        width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(163, 230, 53, 0.15)',
        justifyContent: 'center', alignItems: 'center'
    },

    infoBox: {
        backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: 16,
        borderLeftWidth: 4, borderLeftColor: COLORS.accent
    },
    infoText: {
        fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textSecondary,
        marginBottom: 8, lineHeight: 20
    },

    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: COLORS.surface, paddingHorizontal: 24, paddingVertical: 20,
        borderTopWidth: 1, borderTopColor: COLORS.muted
    },
    confirmButton: {
        backgroundColor: COLORS.accent, borderRadius: RADIUS.lg,
        paddingVertical: 18, flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 24
    },
    confirmButtonDisabled: { backgroundColor: COLORS.muted, opacity: 0.5 },
    confirmButtonText: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.background },
    confirmButtonValue: { fontFamily: FONTS.bold, fontSize: 18, color: COLORS.background },
});
