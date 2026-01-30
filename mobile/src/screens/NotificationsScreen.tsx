import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Bell, X, TrendingUp, ShoppingCart, CreditCard } from 'lucide-react-native';

const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        title: 'Meta de Economia Atingida! 🎉',
        message: 'Você economizou R$ 150 este mês. Parabéns!',
        time: 'Há 2 horas',
        read: false,
        icon: 'trending',
        color: COLORS.statusSuccess,
    },
    {
        id: '2',
        title: 'Novo produto escaneado',
        message: 'Café Melitta 500g foi adicionado ao carrinho',
        time: 'Há 5 horas',
        read: false,
        icon: 'cart',
        color: COLORS.accent,
    },
    {
        id: '3',
        title: 'Pagamento Confirmado',
        message: 'Compra de R$ 234,50 foi processada com sucesso',
        time: 'Ontem',
        read: false,
        icon: 'card',
        color: COLORS.actionPrimary,
    },
    {
        id: '4',
        title: 'Lembrete de Lista',
        message: 'Você tem 5 itens pendentes na lista "Compras do Mês"',
        time: '2 dias atrás',
        read: true,
        icon: 'bell',
        color: COLORS.textSecondary,
    },
];

export default function NotificationsScreen({ navigation }: any) {
    const renderIcon = (type: string, color: string) => {
        switch (type) {
            case 'trending':
                return <TrendingUp color={color} size={20} strokeWidth={2} />;
            case 'cart':
                return <ShoppingCart color={color} size={20} strokeWidth={2} />;
            case 'card':
                return <CreditCard color={color} size={20} strokeWidth={2} />;
            default:
                return <Bell color={color} size={20} strokeWidth={2} />;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notificações</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <X color={COLORS.textPrimary} size={24} strokeWidth={1.5} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Não lidas */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Novas</Text>
                    {MOCK_NOTIFICATIONS.filter(n => !n.read).map((notification, index) => (
                        <View key={notification.id}>
                            <TouchableOpacity style={[styles.notificationItem, !notification.read && styles.unread]}>
                                <View style={[styles.iconContainer, { backgroundColor: `${notification.color}20` }]}>
                                    {renderIcon(notification.icon, notification.color)}
                                </View>
                                <View style={styles.notificationContent}>
                                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                                    <Text style={styles.notificationTime}>{notification.time}</Text>
                                </View>
                                {!notification.read && <View style={styles.unreadDot} />}
                            </TouchableOpacity>
                            {index < MOCK_NOTIFICATIONS.filter(n => !n.read).length - 1 && (
                                <View style={styles.divider} />
                            )}
                        </View>
                    ))}
                </View>

                {/* Lidas */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Anteriores</Text>
                    {MOCK_NOTIFICATIONS.filter(n => n.read).map((notification, index) => (
                        <View key={notification.id}>
                            <TouchableOpacity style={styles.notificationItem}>
                                <View style={[styles.iconContainer, { backgroundColor: `${notification.color}20` }]}>
                                    {renderIcon(notification.icon, notification.color)}
                                </View>
                                <View style={styles.notificationContent}>
                                    <Text style={[styles.notificationTitle, styles.readTitle]}>{notification.title}</Text>
                                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                                    <Text style={styles.notificationTime}>{notification.time}</Text>
                                </View>
                            </TouchableOpacity>
                            {index < MOCK_NOTIFICATIONS.filter(n => n.read).length - 1 && (
                                <View style={styles.divider} />
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
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
    headerTitle: {
        fontFamily: FONTS.bold,
        fontSize: 32,
        color: COLORS.textPrimary,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontFamily: FONTS.bold,
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 16,
        position: 'relative',
    },
    unread: {
        backgroundColor: `${COLORS.accent}05`,
        marginHorizontal: -16,
        paddingHorizontal: 16,
        borderRadius: RADIUS.md,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    readTitle: {
        color: COLORS.textSecondary,
    },
    notificationMessage: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 6,
        lineHeight: 20,
    },
    notificationTime: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.muted,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.accent,
        position: 'absolute',
        right: 0,
        top: 24,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
    },
});
