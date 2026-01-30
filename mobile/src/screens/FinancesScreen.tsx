import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Download, TrendingUp, AlertCircle } from 'lucide-react-native';
import { api } from '../services/api';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Mock Data for Chart (Keep for now or replace with real history if available)
const MONTHLY_DATA = [
    { label: 'Set', value: 30, active: false },
    { label: 'Out', value: 45, active: false },
    { label: 'Nov', value: 60, active: false },
    { label: 'Dez', value: 85, active: false },
    { label: 'Jan', value: 55, active: true },
    { label: 'Fev', value: 20, active: false },
];

export default function FinancesScreen({ navigation }: any) {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadFinances();
        }
    }, [isFocused]);

    const loadFinances = async () => {
        try {
            const balanceData = await api.getBalance();
            setBalance(balanceData.balance || 0);

            const transactionsData = await api.getTransactions();
            if (Array.isArray(transactionsData)) {
                setTransactions(transactionsData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await loadFinances();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    // Calculate total spent (OUT transactions)
    const spent = transactions
        .filter(t => t.type === 'OUT')
        .reduce((acc, t) => acc + Number(t.amount), 0);

    // Calculate total income (IN transactions)
    const income = transactions
        .filter(t => t.type === 'IN')
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const spendingLimit = 2000;
    const progress = Math.min(spent / spendingLimit, 1);
    const remaining = Math.max(0, spendingLimit - spent);
    const percentage = ((spent / spendingLimit) * 100).toFixed(1);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Gestão Financeira</Text>
                <TouchableOpacity style={styles.exportButton} onPress={() => navigation.navigate('Export')}>
                    <Download color={COLORS.accent} size={20} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
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

                {/* Spending Limit Card */}
                <View style={styles.limitCard}>
                    <View style={styles.limitHeader}>
                        <View>
                            <Text style={styles.limitLabel}>Limite Mensal</Text>
                            <Text style={styles.limitValue}>R$ {spent.toFixed(2)} <Text style={styles.limitTotal}>/ R$ {spendingLimit}</Text></Text>
                        </View>
                        <View style={styles.limitBadge}>
                            <Text style={styles.limitBadgeText}>{percentage}%</Text>
                        </View>
                    </View>

                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${Math.round(progress * 100)}%` }]} />
                    </View>

                    <View style={styles.limitFooter}>
                        <AlertCircle color={COLORS.textSecondary} size={14} />
                        <Text style={styles.limitFooterText}>R$ {remaining.toFixed(2)} restantes para gastar</Text>
                    </View>
                </View>

                {/* Income vs Expenses Cards */}
                <View style={styles.statsRow}>
                    {/* Income */}
                    <View style={[styles.miniCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                        <Text style={styles.miniCardLabel}>Entradas</Text>
                        <Text style={[styles.miniCardValue, { color: '#10b981' }]}>
                            R$ {income.toFixed(2)}
                        </Text>
                    </View>
                    {/* Expenses */}
                    <View style={[styles.miniCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                        <Text style={styles.miniCardLabel}>Saídas</Text>
                        <Text style={[styles.miniCardValue, { color: '#ef4444' }]}>
                            R$ {spent.toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Monthly History Chart */}
                <Text style={styles.sectionTitle}>Histórico</Text>
                <View style={styles.chartContainer}>
                    {MONTHLY_DATA.map((item, index) => (
                        <View key={index} style={styles.barGroup}>
                            <View style={styles.barTrack}>
                                <View
                                    style={[
                                        styles.barFill,
                                        {
                                            height: `${item.value}%`,
                                            backgroundColor: item.active ? COLORS.accent : COLORS.surfaceHighlight
                                        }
                                    ]}
                                />
                            </View>
                            <Text style={[styles.barLabel, item.active && styles.barLabelActive]}>{item.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Recent Transactions List */}
                <Text style={styles.sectionTitle}>Transações Recentes</Text>
                {transactions.length === 0 ? (
                    <Text style={{ color: COLORS.textSecondary, textAlign: 'center', marginTop: 10, marginBottom: 20 }}>Nenhuma transação.</Text>
                ) : (
                    transactions.map((t, index) => (
                        <TouchableOpacity key={index} style={styles.transactionItem} onPress={() => {
                            Alert.alert(
                                t.description || t.category,
                                `Data: ${new Date(t.date).toLocaleDateString()}\\nValor: R$ ${Number(t.amount).toFixed(2)}\\nTipo: ${t.type === 'IN' ? 'Entrada' : 'Saída'}\\nCategoria: ${t.category}\\n\\nDetalhes completos em breve!`,
                                [{ text: 'OK' }]
                            );
                        }}>
                            <View>
                                <Text style={styles.transactionTitle}>{t.description || t.category}</Text>
                                <Text style={styles.transactionDate}>{new Date(t.date).toLocaleDateString()}</Text>
                            </View>
                            <Text style={[
                                styles.transactionAmount,
                                { color: t.type === 'IN' ? '#10b981' : '#ef4444' }
                            ]}>
                                {t.type === 'IN' ? '+' : '-'} R$ {Number(t.amount).toFixed(2)}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 60 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 24 },
    headerTitle: { fontFamily: FONTS.bold, fontSize: 24, color: COLORS.textPrimary },
    exportButton: {
        width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surface,
        justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border
    },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 100 },

    // Limit Card
    limitCard: {
        backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: 20, marginBottom: 24,
        borderWidth: 1, borderColor: COLORS.border
    },
    limitHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    limitLabel: { fontFamily: FONTS.medium, color: COLORS.textSecondary, fontSize: 12, marginBottom: 4 },
    limitValue: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 24 },
    limitTotal: { fontSize: 16, color: COLORS.textSecondary },
    limitBadge: {
        backgroundColor: 'rgba(163, 230, 53, 0.1)', paddingVertical: 4, paddingHorizontal: 8,
        borderRadius: 8, justifyContent: 'center'
    },
    limitBadgeText: { fontFamily: FONTS.bold, color: COLORS.accent, fontSize: 12 },
    progressBarBg: { height: 8, backgroundColor: COLORS.surfaceHighlight, borderRadius: 4, marginBottom: 16 },
    progressBarFill: { height: 8, backgroundColor: COLORS.accent, borderRadius: 4 },
    limitFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    limitFooterText: { fontFamily: FONTS.regular, color: COLORS.textSecondary, fontSize: 12 },

    // Stats Row
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    miniCard: { flex: 0.48, padding: 16, borderRadius: RADIUS.md, justifyContent: 'center' },
    miniCardLabel: { fontFamily: FONTS.medium, color: COLORS.textSecondary, marginBottom: 4 },
    miniCardValue: { fontFamily: FONTS.bold, fontSize: 18 },

    // Chart
    sectionTitle: { fontFamily: FONTS.bold, fontSize: 18, color: COLORS.textPrimary, marginBottom: 16 },
    chartContainer: {
        flexDirection: 'row', justifyContent: 'space-between', height: 180,
        backgroundColor: COLORS.surface, borderRadius: RADIUS.md, padding: 20, marginBottom: 32,
        borderWidth: 1, borderColor: COLORS.border
    },
    barGroup: { alignItems: 'center', flex: 1 },
    barTrack: { flex: 1, width: 8, backgroundColor: COLORS.surfaceHighlight, borderRadius: 4, justifyContent: 'flex-end', marginBottom: 8 },
    barFill: { width: '100%', borderRadius: 4 },
    barLabel: { fontFamily: FONTS.medium, color: COLORS.textSecondary, fontSize: 10 },
    barLabelActive: { color: COLORS.accent, fontFamily: FONTS.bold },

    // Transactions
    transactionItem: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border
    },
    transactionTitle: { fontFamily: FONTS.medium, color: COLORS.textPrimary, fontSize: 16 },
    transactionDate: { fontFamily: FONTS.regular, color: COLORS.textSecondary, fontSize: 12 },
    transactionAmount: { fontFamily: FONTS.bold, fontSize: 16 },
});
