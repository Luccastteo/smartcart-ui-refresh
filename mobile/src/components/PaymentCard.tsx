import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { CreditCard, Smartphone, Building2, Check } from 'lucide-react-native';

interface PaymentCardProps {
    type: 'pix' | 'card' | 'bank';
    title: string;
    subtitle?: string;
    selected: boolean;
    onPress: () => void;
}

export default function PaymentCard({ type, title, subtitle, selected, onPress }: PaymentCardProps) {
    const getIcon = () => {
        switch (type) {
            case 'pix':
                return <Smartphone color={selected ? COLORS.accent : COLORS.textSecondary} size={24} strokeWidth={1.5} />;
            case 'card':
                return <CreditCard color={selected ? COLORS.accent : COLORS.textSecondary} size={24} strokeWidth={1.5} />;
            case 'bank':
                return <Building2 color={selected ? COLORS.accent : COLORS.textSecondary} size={24} strokeWidth={1.5} />;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.selected]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                {getIcon()}
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            {selected && (
                <View style={styles.checkContainer}>
                    <Check color={COLORS.accent} size={20} strokeWidth={2.5} />
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.border,
        marginBottom: 12,
    },
    selected: {
        borderColor: COLORS.accent,
        backgroundColor: `${COLORS.accent}10`,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    titleSelected: {
        color: COLORS.accent,
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    checkContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: `${COLORS.accent}20`,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
