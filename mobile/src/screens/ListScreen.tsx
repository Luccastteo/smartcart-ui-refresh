import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Plus, ChevronRight, ShoppingBag, Calendar } from 'lucide-react-native';
import { api } from '../services/api';
import { useIsFocused } from '@react-navigation/native';

export default function ListScreen({ navigation }: any) {
    const [lists, setLists] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadLists();
        }
    }, [isFocused]);

    const loadLists = async () => {
        try {
            const data = await api.getLists();
            if (Array.isArray(data)) {
                setLists(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await loadLists();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    const handleCreateList = async () => {
        // For MVP, creating a default list. Ideally, show a modal to input name.
        try {
            const newList = await api.createList(`Nova Lista ${lists.length + 1}`);
            loadLists();
            Alert.alert('Sucesso', 'Nova lista criada!');
        } catch (error) {
            Alert.alert('Erro', 'Falha ao criar lista');
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const itemCount = item.items ? item.items.length : 0;
        const completedCount = item.items ? item.items.filter((i: any) => i.checked).length : 0;
        const totalValue = item.items ? item.items.reduce((acc: number, i: any) => acc + Number(i.price * i.qty), 0) : 0;
        const progress = itemCount > 0 ? completedCount / itemCount : 0;
        const dateStr = new Date(item.createdAt).toLocaleDateString();

        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListDetail', { listId: item.id, listTitle: item.title })}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        <ShoppingBag color={COLORS.accent} size={20} />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <View style={styles.dateRow}>
                            <Calendar color={COLORS.textSecondary} size={12} />
                            <Text style={styles.cardDate}>{dateStr}</Text>
                        </View>
                    </View>
                    <ChevronRight color={COLORS.textSecondary} size={20} />
                </View>

                <View style={styles.divider} />

                <View style={styles.statsRow}>
                    <Text style={styles.statsText}>{completedCount}/{itemCount} itens</Text>
                    <Text style={styles.statsTotal}>R$ {totalValue.toFixed(2)}</Text>
                </View>

                <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Minhas Listas</Text>
                <Text style={styles.headerSubtitle}>Gerencie suas compras</Text>
            </View>

            <FlatList
                data={lists}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
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
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhuma lista encontrada</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.fab} onPress={handleCreateList}>
                <Plus color="#000" size={24} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 60 },
    header: { paddingHorizontal: 24, marginBottom: 24 },
    headerTitle: { fontFamily: FONTS.bold, fontSize: 32, color: COLORS.textPrimary },
    headerSubtitle: { fontFamily: FONTS.regular, fontSize: 16, color: COLORS.textSecondary, marginTop: 4 },
    listContent: { paddingHorizontal: 24, paddingBottom: 100 },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    iconContainer: {
        width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(163, 230, 53, 0.1)',
        justifyContent: 'center', alignItems: 'center', marginRight: 12
    },
    cardInfo: { flex: 1 },
    cardTitle: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textPrimary },
    dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
    cardDate: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.textSecondary },
    divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    statsText: { fontFamily: FONTS.medium, color: COLORS.textSecondary, fontSize: 12 },
    statsTotal: { fontFamily: FONTS.bold, color: COLORS.accent, fontSize: 14 },
    progressBg: { height: 4, backgroundColor: COLORS.border, borderRadius: 2 },
    progressFill: { height: 4, backgroundColor: COLORS.accent, borderRadius: 2 },
    emptyContainer: { alignItems: 'center', marginTop: 40 },
    emptyText: { fontFamily: FONTS.regular, color: COLORS.textSecondary },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
});
