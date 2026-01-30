import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react-native';

export default function ListDetailScreen({ route, navigation }: any) {
    const { listId, listTitle } = route.params;
    const [items, setItems] = useState([
        { id: '1', name: 'Leite Integral', qty: 2, checked: false },
        { id: '2', name: 'Pão de Forma', qty: 1, checked: false },
        { id: '3', name: 'Café em Grãos', qty: 1, checked: true },
    ]);
    const [newItemName, setNewItemName] = useState('');

    const toggleItem = (id: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const deleteItem = (id: string) => {
        Alert.alert(
            'Remover Item',
            'Deseja remover este item da lista?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Remover',
                    style: 'destructive',
                    onPress: () => setItems(prev => prev.filter(item => item.id !== id))
                }
            ]
        );
    };

    const addItem = () => {
        if (!newItemName.trim()) {
            Alert.alert('Atenção', 'Digite o nome do item');
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            name: newItemName.trim(),
            qty: 1,
            checked: false
        };

        setItems(prev => [...prev, newItem]);
        setNewItemName('');
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.itemRow}>
            <TouchableOpacity
                style={[styles.checkbox, item.checked && styles.checkboxChecked]}
                onPress={() => toggleItem(item.id)}
            >
                {item.checked && <Check color={COLORS.background} size={16} strokeWidth={3} />}
            </TouchableOpacity>

            <View style={styles.itemInfo}>
                <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>
                    {item.name}
                </Text>
                <Text style={styles.itemQty}>Qtd: {item.qty}</Text>
            </View>

            <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
                <Trash2 color={COLORS.statusError} size={20} strokeWidth={1.5} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color={COLORS.textPrimary} size={24} strokeWidth={1.5} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{listTitle || 'Lista'}</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Add Item Input */}
            <View style={styles.addItemContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicionar item..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={newItemName}
                    onChangeText={setNewItemName}
                    onSubmitEditing={addItem}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.addButton} onPress={addItem}>
                    <Plus color={COLORS.background} size={20} strokeWidth={2.5} />
                </TouchableOpacity>
            </View>

            {/* Items List */}
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum item na lista</Text>
                        <Text style={styles.emptySubtext}>Adicione itens usando o campo acima</Text>
                    </View>
                }
            />

            {/* Footer Stats */}
            <View style={styles.footer}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Total</Text>
                    <Text style={styles.statValue}>{items.length} itens</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Concluídos</Text>
                    <Text style={styles.statValue}>{items.filter(i => i.checked).length}</Text>
                </View>
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
    addItemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 24,
        gap: 12,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.textPrimary,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    addButton: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: RADIUS.md,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.muted,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: COLORS.accent,
        borderColor: COLORS.accent,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontFamily: FONTS.medium,
        fontSize: 15,
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    itemNameChecked: {
        textDecorationLine: 'line-through',
        color: COLORS.muted,
    },
    itemQty: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    deleteButton: {
        padding: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    emptySubtext: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.muted,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        flexDirection: 'row',
        padding: 24,
        paddingBottom: 40,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statLabel: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    statValue: {
        fontFamily: FONTS.bold,
        fontSize: 20,
        color: COLORS.textPrimary,
    },
    statDivider: {
        width: 1,
        backgroundColor: COLORS.border,
    },
});
