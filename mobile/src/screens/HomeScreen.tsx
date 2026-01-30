import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Wallet, ShoppingCart, TrendingUp, Bell, User, ChevronRight, Camera, Sparkles, ArrowUpRight, ArrowDownRight, CreditCard, Coffee, ShoppingBag, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function HomeScreen({ navigation }: any) {
    const { signOut } = useAuth();
    const { itemCount } = useCart();
    const [refreshing, setRefreshing] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            // Simular atualização de dados
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Aqui você pode adicionar chamadas à API:
            // await fetchBalance();
            // await fetchTransactions();
            // await fetchNotifications();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    {/* Avatar clicável */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        activeOpacity={0.7}
                        style={styles.avatarButton}
                    >
                        <View style={styles.avatar}>
                            <User color={COLORS.accent} size={20} strokeWidth={2} />
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.greeting}>{getGreeting()}, Lucas 👋</Text>
                        <View style={styles.proTag}>
                            <Text style={styles.proText}>PAGLY PRO</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.notificationButton}
                    onPress={() => navigation.navigate('Notifications')}
                    activeOpacity={0.7}
                >
                    <Bell color={COLORS.textPrimary} size={24} strokeWidth={1.5} />
                    {/* Badge contador de notificações */}
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationBadgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[COLORS.accent]} // Android
                        tintColor={COLORS.accent} // iOS
                        progressBackgroundColor={COLORS.surface}
                    />
                }
            >
                {/* Balance Card */}
                <LinearGradient
                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                    style={styles.balanceCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.balanceHeader}>
                        <Text style={styles.balanceLabel}>Saldo Estimado</Text>
                        <TrendingUp color={COLORS.textOnBrand} size={20} />
                    </View>
                    <Text style={styles.balanceValue}>R$ 1.250,00</Text>

                    <View style={styles.balanceFooter}>
                        <View style={styles.balanceItem}>
                            <ArrowUpRight color={COLORS.statusSuccess} size={16} strokeWidth={2.5} />
                            <Text style={styles.balanceItemLabel}>Entradas</Text>
                            <Text style={styles.balanceItemValue}>R$ 5.000</Text>
                        </View>
                        <View style={styles.balanceDivider} />
                        <View style={styles.balanceItem}>
                            <ArrowDownRight color={COLORS.statusError} size={16} strokeWidth={2.5} />
                            <Text style={styles.balanceItemLabel}>Saídas</Text>
                            <Text style={styles.balanceItemValue}>R$ 450</Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Quick Actions Grid */}
                <Text style={styles.sectionTitle}>Ações Rápidas</Text>
                <View style={styles.grid}>
                    <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Capture')}>
                        <View style={[styles.iconBox, { backgroundColor: 'rgba(163, 230, 53, 0.1)' }]}>
                            <Camera color={COLORS.accent} size={24} />
                        </View>
                        <Text style={styles.actionText}>Capturar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Cart')}>
                        <View style={[styles.iconBox, { backgroundColor: 'rgba(96, 165, 250, 0.1)' }]}>
                            <ShoppingCart color={COLORS.blue} size={24} />
                        </View>
                        <Text style={styles.actionText}>Carrinho</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Wallet')}>
                        <View style={[styles.iconBox, { backgroundColor: 'rgba(251, 113, 133, 0.1)' }]}>
                            <CreditCard color={COLORS.coral} size={24} />
                        </View>
                        <Text style={styles.actionText}>Carteira</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Transactions */}
                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>Transações Recentes</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Finances')}>
                        <Text style={styles.linkText}>Ver todas</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.transactionsCard}>
                    <TouchableOpacity style={styles.transactionItem}>
                        <View style={[styles.transactionIcon, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                            <ArrowUpRight color={COLORS.statusSuccess} size={20} strokeWidth={2} />
                        </View>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTitle}>Salário</Text>
                            <Text style={styles.transactionMeta}>Hoje • Renda</Text>
                        </View>
                        <Text style={[styles.transactionValue, { color: COLORS.statusSuccess }]}>+R$ 5.000,00</Text>
                    </TouchableOpacity>

                    <View style={styles.transactionDivider} />

                    <TouchableOpacity style={styles.transactionItem}>
                        <View style={[styles.transactionIcon, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                            <ArrowDownRight color={COLORS.statusError} size={20} strokeWidth={2} />
                        </View>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTitle}>Supermercado</Text>
                            <Text style={styles.transactionMeta}>Ontem • Alimentação</Text>
                        </View>
                        <Text style={[styles.transactionValue, { color: COLORS.statusError }]}>-R$ 234,50</Text>
                    </TouchableOpacity>

                    <View style={styles.transactionDivider} />

                    <TouchableOpacity style={styles.transactionItem}>
                        <View style={[styles.transactionIcon, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                            <ArrowDownRight color={COLORS.statusError} size={20} strokeWidth={2} />
                        </View>
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionTitle}>Conta de Luz</Text>
                            <Text style={styles.transactionMeta}>18/01 • Utilidades</Text>
                        </View>
                        <Text style={[styles.transactionValue, { color: COLORS.statusError }]}>-R$ 216,00</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Lists Preview */}
                <View style={styles.rowBetween}>
                    <Text style={styles.sectionTitle}>Listas Recentes</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('List')}>
                        <Text style={styles.linkText}>Ver todas</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.listCard}>
                    <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>Compras do Mês</Text>
                        <Text style={styles.listDate}>Hoje, 10:30</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.listItem}>
                        <View style={styles.checkbox} />
                        <Text style={styles.itemText}>Leite Integral (2)</Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={styles.checkbox} />
                        <Text style={styles.itemText}>Pão de Forma</Text>
                    </View>
                    <View style={styles.listItem}>
                        <View style={[styles.checkbox, styles.checked]} />
                        <Text style={[styles.itemText, styles.strikethrough]}>Café em Grãos</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 60 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarButton: {
        marginRight: 0,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.surface,
        borderWidth: 2,
        borderColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: { fontFamily: FONTS.bold, fontSize: 20, color: COLORS.textPrimary },
    proTag: {
        backgroundColor: 'rgba(163, 230, 53, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    proText: { fontFamily: FONTS.bold, fontSize: 10, color: COLORS.accent },
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: COLORS.statusError,
        borderRadius: 9999,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    notificationBadgeText: {
        fontFamily: FONTS.bold,
        fontSize: 10,
        color: '#FFFFFF',
    },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 120 },

    // Balance Card Styles
    balanceCard: {
        padding: 32,
        borderRadius: RADIUS.xl,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    balanceLabel: {
        fontFamily: FONTS.medium,
        color: COLORS.textOnBrand,
        fontSize: 14,
        opacity: 0.9,
    },
    balanceValue: {
        fontFamily: FONTS.bold,
        color: COLORS.textOnBrand,
        fontSize: 40,
        marginBottom: 24,
        letterSpacing: -1,
    },
    balanceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    balanceItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    balanceItemLabel: {
        fontFamily: FONTS.regular,
        color: COLORS.textOnBrand,
        fontSize: 12,
        opacity: 0.8,
    },
    balanceItemValue: {
        fontFamily: FONTS.bold,
        color: COLORS.textOnBrand,
        fontSize: 14,
    },
    balanceDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    sectionTitle: { fontFamily: FONTS.bold, fontSize: 18, color: COLORS.textPrimary, marginBottom: 16 },
    grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    actionCard: {
        width: '31%', backgroundColor: COLORS.surface, borderRadius: RADIUS.md,
        padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border
    },
    iconBox: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    actionText: { fontFamily: FONTS.medium, color: COLORS.textPrimary, fontSize: 12 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    linkText: { fontFamily: FONTS.medium, color: COLORS.accent, fontSize: 14 },
    listCard: { backgroundColor: COLORS.surface, borderRadius: RADIUS.md, padding: 16, borderWidth: 1, borderColor: COLORS.border },
    listHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    listTitle: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 16 },
    listDate: { fontFamily: FONTS.regular, color: COLORS.textSecondary, fontSize: 12 },
    divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
    listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: COLORS.muted, marginRight: 12 },
    checked: { backgroundColor: COLORS.muted, borderColor: COLORS.muted },
    itemText: { fontFamily: FONTS.regular, color: COLORS.textPrimary, fontSize: 14 },
    strikethrough: { textDecorationLine: 'line-through', color: COLORS.muted },

    // Transaction Styles
    transactionsCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 32,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        fontFamily: FONTS.medium,
        color: COLORS.textPrimary,
        fontSize: 15,
        marginBottom: 4,
    },
    transactionMeta: {
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    transactionValue: {
        fontFamily: FONTS.bold,
        fontSize: 16,
    },
    transactionDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 4,
    },
});
