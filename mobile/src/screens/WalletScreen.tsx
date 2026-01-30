import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Plus, CreditCard, Landmark } from 'lucide-react-native';

export default function WalletScreen() {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            // Simular atualização de contas e cartões
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Aqui você pode adicionar: await fetchAccounts(); await fetchCards();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Carteira</Text>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLORS.accent]}
                        tintColor={COLORS.accent}
                        progressBackgroundColor={COLORS.surface}
                    />
                }
            >
                {/* Total Balance */}
                <Text style={styles.label}>Patrimônio Consolidado</Text>
                <Text style={styles.balance}>R$ 14.250,00</Text>

                {/* Banks / Integrations */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Minhas Contas</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => {
                        Alert.alert(
                            'Adicionar Conta',
                            'Conecte sua conta bancária via Open Finance',
                            [
                                { text: 'Cancelar', style: 'cancel' },
                                { text: 'Em Breve', onPress: () => { } }
                            ]
                        );
                    }}>
                        <Plus color={COLORS.background} size={16} strokeWidth={3} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.card} onPress={() => {
                    Alert.alert(
                        'NuBank',
                        'Conta Corrente\nSaldo: R$ 1.250,00\n\nFuncionalidade de edição em breve!',
                        [{ text: 'OK' }]
                    );
                }}>
                    <View style={[styles.iconBox, { backgroundColor: '#820ad1' }]}>
                        <Landmark color="#fff" size={20} />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>NuBank</Text>
                        <Text style={styles.cardSubtitle}>Conta Corrente</Text>
                    </View>
                    <Text style={styles.cardValue}>R$ 1.250,00</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => {
                    Alert.alert(
                        'Inter',
                        'Investimentos\nSaldo: R$ 13.000,00\n\nFuncionalidade de edição em breve!',
                        [{ text: 'OK' }]
                    );
                }}>
                    <View style={[styles.iconBox, { backgroundColor: '#fa6501' }]}>
                        <Landmark color="#fff" size={20} />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>Inter</Text>
                        <Text style={styles.cardSubtitle}>Investimentos</Text>
                    </View>
                    <Text style={styles.cardValue}>R$ 13.000,00</Text>
                </TouchableOpacity>

                {/* Cards */}
                <View style={[styles.sectionHeader, { marginTop: 32 }]}>
                    <Text style={styles.sectionTitle}>Cartões de Crédito</Text>
                </View>

                <TouchableOpacity style={styles.creditCard} onPress={() => {
                    Alert.alert(
                        'Mastercard ••8842',
                        'Titular: LUCAS M\\nValidade: 12/29\\nLimite: R$ 5.000,00\\n\\nFuncionalidade de edição em breve!',
                        [{ text: 'OK' }]
                    );
                }}>
                    <View style={styles.cardRow}>
                        <CreditCard color={COLORS.textPrimary} size={24} />
                        <Text style={styles.cardBrand}>Mastercard</Text>
                    </View>
                    <Text style={styles.cardNumber}>•••• •••• •••• 8842</Text>
                    <View style={styles.cardRow}>
                        <View>
                            <Text style={styles.cardLabel}>Titular</Text>
                            <Text style={styles.cardHolder}>LUCAS M</Text>
                        </View>
                        <View>
                            <Text style={styles.cardLabel}>Validade</Text>
                            <Text style={styles.cardHolder}>12/29</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 60 },
    headerTitle: { fontFamily: FONTS.bold, fontSize: 24, color: COLORS.textPrimary, paddingHorizontal: 24, marginBottom: 24 },
    scrollContent: { paddingHorizontal: 24 },
    label: { fontFamily: FONTS.medium, color: COLORS.textSecondary, fontSize: 14, marginBottom: 4 },
    balance: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 36, marginBottom: 32 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontFamily: FONTS.bold, fontSize: 18, color: COLORS.textPrimary },
    addButton: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center' },
    card: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
        padding: 16, borderRadius: RADIUS.md, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border
    },
    iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    cardInfo: { flex: 1 },
    cardTitle: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 16 },
    cardSubtitle: { fontFamily: FONTS.regular, color: COLORS.textSecondary, fontSize: 12 },
    cardValue: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 16 },
    creditCard: {
        backgroundColor: '#1E1E1E', borderRadius: RADIUS.lg, padding: 24, height: 200, justifyContent: 'space-between',
        borderWidth: 1, borderColor: COLORS.border,
        shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
    },
    cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardBrand: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 16, fontStyle: 'italic' },
    cardNumber: { fontFamily: FONTS.medium, color: COLORS.textPrimary, fontSize: 22, letterSpacing: 2 },
    cardLabel: { fontFamily: FONTS.regular, color: COLORS.textSecondary, fontSize: 10, textTransform: 'uppercase' },
    cardHolder: { fontFamily: FONTS.medium, color: COLORS.textPrimary, fontSize: 14 },
});
