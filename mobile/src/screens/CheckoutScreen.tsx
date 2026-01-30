import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { ArrowLeft, Check } from 'lucide-react-native';
import PaymentCard from '../components/PaymentCard';
import { MOCK_PAYMENT_METHODS } from '../mocks/data';
import * as Haptics from 'expo-haptics';

export default function CheckoutScreen({ route, navigation }: any) {
    const { total, items } = route.params;
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSelectPayment = async (method: string) => {
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

        // Simular processamento
        setTimeout(() => {
            setProcessing(false);
            Alert.alert(
                'Pagamento Confirmado! 🎉',
                `Compra de R$ ${total.toFixed(2)} processada com sucesso.`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Tabs', { screen: 'Home' }),
                    },
                ]
            );
        }, 2000);
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
                            <Text style={styles.summaryValue}>{items.length} {items.length === 1 ? 'item' : 'itens'}</Text>
                        </View>
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

                    {MOCK_PAYMENT_METHODS.map((method) => (
                        <PaymentCard
                            key={method.id}
                            type={method.type as 'pix' | 'card' | 'bank'}
                            title={method.title}
                            subtitle={method.subtitle}
                            selected={selectedPayment === method.id}
                            onPress={() => handleSelectPayment(method.id)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Botão Confirmar */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.confirmButton, !selectedPayment && styles.confirmButtonDisabled]}
                    onPress={handleConfirmPayment}
                    disabled={!selectedPayment || processing}
                    activeOpacity={0.8}
                >
                    {processing ? (
                        <Text style={styles.confirmButtonText}>Processando...</Text>
                    ) : (
                        <>
                            <Check color="#000" size={24} strokeWidth={2.5} />
                            <Text style={styles.confirmButtonText}>Confirmar Pagamento</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    headerTitle: {
        fontFamily: FONTS.bold,
        fontSize: 20,
        color: COLORS.textPrimary,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 120,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.textPrimary,
        marginBottom: 16,
    },
    summaryCard: {
        backgroundColor: COLORS.surface,
        padding: 20,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryLabel: {
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.textSecondary,
    },
    summaryValue: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    totalLabel: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.textPrimary,
    },
    totalValue: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        color: COLORS.accent,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        padding: 24,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    confirmButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.accent,
        paddingVertical: 18,
        borderRadius: RADIUS.lg,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    confirmButtonDisabled: {
        backgroundColor: COLORS.muted,
        opacity: 0.5,
    },
    confirmButtonText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: '#000',
        marginLeft: 8,
    },
});
