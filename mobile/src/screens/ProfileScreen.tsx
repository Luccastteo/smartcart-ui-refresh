import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { User, Mail, Phone, CreditCard, Globe, Bell, HelpCircle, FileText, LogOut, ChevronRight, Crown, Check } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
    const { signOut } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [isPro, setIsPro] = useState(true); // Mock PRO status
    const [showProFeatures, setShowProFeatures] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <User color={COLORS.accent} size={40} strokeWidth={1.5} />
                        </View>
                        <TouchableOpacity style={styles.editAvatarButton} onPress={() => {
                            Alert.alert(
                                'Editar Avatar',
                                'Funcionalidade de seleção de foto em breve!',
                                [{ text: 'OK' }]
                            );
                        }}>
                            <Text style={styles.editAvatarText}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>Lucas M</Text>
                    <Text style={styles.userEmail}>lucas@exemplo.com</Text>
                </View>

                {/* PRO Card */}
                <TouchableOpacity
                    style={[styles.proCard, isPro && styles.proCardActive]}
                    onPress={() => setShowProFeatures(!showProFeatures)}
                    activeOpacity={0.7}
                >
                    <View style={styles.proHeader}>
                        <View style={styles.proLeft}>
                            <View style={[styles.proBadge, isPro && styles.proBadgeActive]}>
                                <Crown color={isPro ? COLORS.background : COLORS.accent} size={14} strokeWidth={2.5} />
                                <Text style={[styles.proBadgeText, isPro && styles.proBadgeTextActive]}>
                                    {isPro ? 'PRO' : 'FREE'}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.proTitle}>SmartCart PRO</Text>
                                <Text style={styles.proPrice}>R$ 1,99/mês</Text>
                            </View>
                        </View>
                        <ChevronRight
                            color={COLORS.textSecondary}
                            size={20}
                            style={{ transform: [{ rotate: showProFeatures ? '90deg' : '0deg' }] }}
                        />
                    </View>

                    {showProFeatures && (
                        <View style={styles.proFeatures}>
                            <View style={styles.featureDivider} />
                            {[
                                { icon: '📸', title: 'Scanner Ilimitado', desc: 'Escaneie quantos produtos quiser' },
                                { icon: '🏦', title: 'Open Finance', desc: 'Conecte suas contas bancárias' },
                                { icon: '📊', title: 'Histórico de Preços', desc: 'Veja a evolução de preços' },
                                { icon: '🎯', title: 'Metas de Economia', desc: 'Crie e acompanhe suas metas' },
                                { icon: '📤', title: 'Exportar Dados', desc: 'Excel, PDF ou WhatsApp' },
                                { icon: '🚫', title: 'Sem Anúncios', desc: 'Experiência premium' },
                            ].map((feature, index) => (
                                <View key={index} style={styles.featureItem}>
                                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                                    <View style={styles.featureInfo}>
                                        <Text style={styles.featureTitle}>{feature.title}</Text>
                                        <Text style={styles.featureDesc}>{feature.desc}</Text>
                                    </View>
                                    {isPro && <Check color={COLORS.statusSuccess} size={18} strokeWidth={2.5} />}
                                </View>
                            ))}
                        </View>
                    )}

                    {!isPro && (
                        <TouchableOpacity style={styles.subscribeButton}>
                            <Text style={styles.subscribeButtonText}>Assinar Agora</Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>

                {/* Personal Data Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dados Pessoais</Text>
                    <View style={styles.card}>
                        <View style={styles.infoItem}>
                            <User color={COLORS.textSecondary} size={20} />
                            <Text style={styles.infoLabel}>Nome Completo</Text>
                            <Text style={styles.infoValue}>Lucas M</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoItem}>
                            <Mail color={COLORS.textSecondary} size={20} />
                            <Text style={styles.infoLabel}>E-mail</Text>
                            <Text style={styles.infoValue}>lucas@exemplo.com</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoItem}>
                            <Phone color={COLORS.textSecondary} size={20} />
                            <Text style={styles.infoLabel}>Telefone</Text>
                            <Text style={styles.infoValue}>(11) 99999-9999</Text>
                        </View>
                    </View>
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferências</Text>
                    <View style={styles.card}>
                        <View style={styles.preferenceItem}>
                            <View style={styles.preferenceLeft}>
                                <Globe color={COLORS.textSecondary} size={20} />
                                <Text style={styles.preferenceLabel}>Modo Escuro</Text>
                            </View>
                            <Switch
                                value={isDarkMode}
                                onValueChange={setIsDarkMode}
                                trackColor={{ false: COLORS.muted, true: COLORS.accent }}
                                thumbColor={COLORS.textPrimary}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.preferenceItem}>
                            <View style={styles.preferenceLeft}>
                                <Bell color={COLORS.textSecondary} size={20} />
                                <Text style={styles.preferenceLabel}>Notificações Push</Text>
                            </View>
                            <Switch
                                value={pushNotifications}
                                onValueChange={setPushNotifications}
                                trackColor={{ false: COLORS.muted, true: COLORS.accent }}
                                thumbColor={COLORS.textPrimary}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.preferenceItem}>
                            <View style={styles.preferenceLeft}>
                                <Mail color={COLORS.textSecondary} size={20} />
                                <Text style={styles.preferenceLabel}>E-mail Semanal</Text>
                            </View>
                            <Switch
                                value={emailNotifications}
                                onValueChange={setEmailNotifications}
                                trackColor={{ false: COLORS.muted, true: COLORS.accent }}
                                thumbColor={COLORS.textPrimary}
                            />
                        </View>
                    </View>
                </View>

                {/* Help & Support Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ajuda e Suporte</Text>
                    <View style={styles.card}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => {
                            Alert.alert(
                                'Central de Ajuda',
                                'FAQ e suporte em breve!\n\nEntre em contato: suporte@pagly.com',
                                [{ text: 'OK' }]
                            );
                        }}>
                            <HelpCircle color={COLORS.textSecondary} size={20} />
                            <Text style={styles.menuLabel}>Central de Ajuda</Text>
                            <ChevronRight color={COLORS.muted} size={20} />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.menuItem} onPress={() => {
                            Alert.alert(
                                'Termos de Uso',
                                'Termos e condições de uso do PAGLY\n\nDocumento completo em breve!',
                                [{ text: 'OK' }]
                            );
                        }}>
                            <FileText color={COLORS.textSecondary} size={20} />
                            <Text style={styles.menuLabel}>Termos de Uso</Text>
                            <ChevronRight color={COLORS.muted} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Account Section */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                        <LogOut color={COLORS.textPrimary} size={20} />
                        <Text style={styles.logoutText}>Sair da Conta</Text>
                    </TouchableOpacity>
                    <Text style={styles.versionText}>Versão 1.0.0</Text>
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
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },

    // Header
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.surface,
        borderWidth: 2,
        borderColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.accent,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    editAvatarText: {
        fontFamily: FONTS.bold,
        fontSize: 10,
        color: COLORS.background,
    },
    userName: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    userEmail: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    // PRO Card
    proCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        padding: 20,
        marginBottom: 32,
        borderWidth: 2,
        borderColor: COLORS.border,
    },
    proCardActive: {
        borderColor: COLORS.accent,
        backgroundColor: COLORS.surfaceHighlight,
    },
    proHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    proLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    proBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(163, 230, 53, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    proBadgeActive: {
        backgroundColor: COLORS.accent,
    },
    proBadgeText: {
        fontFamily: FONTS.bold,
        fontSize: 11,
        color: COLORS.accent,
    },
    proBadgeTextActive: {
        color: COLORS.background,
    },
    proTitle: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    proPrice: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    proFeatures: {
        marginTop: 16,
    },
    featureDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
    },
    featureIcon: {
        fontSize: 20,
    },
    featureInfo: {
        flex: 1,
    },
    featureTitle: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    featureDesc: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    subscribeButton: {
        backgroundColor: COLORS.accent,
        paddingVertical: 14,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        marginTop: 16,
    },
    subscribeButtonText: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: COLORS.background,
    },

    // Sections
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontFamily: FONTS.bold,
        fontSize: 18,
        color: COLORS.textPrimary,
        marginBottom: 16,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    // Info Items
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
    },
    infoLabel: {
        flex: 1,
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    infoValue: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.textPrimary,
    },

    // Preferences
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    preferenceLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    preferenceLabel: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.textPrimary,
    },

    // Menu Items
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
    },
    menuLabel: {
        flex: 1,
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.textPrimary,
    },

    // Common
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
    },

    // Logout
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: COLORS.surface,
        paddingVertical: 16,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 16,
    },
    logoutText: {
        fontFamily: FONTS.bold,
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    versionText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.muted,
        textAlign: 'center',
    },
});
