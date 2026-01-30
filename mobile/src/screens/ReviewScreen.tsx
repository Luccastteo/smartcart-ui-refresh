import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { Check, Trash } from 'lucide-react-native';

export default function ReviewScreen({ route, navigation }: any) {
    const { imageUri } = route.params || {};
    // Mock extracted items
    const [items, setItems] = useState([
        { id: '1', name: 'Leite Integral 1L', price: '4.50', qty: 2 },
        { id: '2', name: 'Pão de Forma', price: '8.90', qty: 1 },
        { id: '3', name: 'Café Melitta 500g', price: '18.90', qty: 1 },
    ]);

    const total = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.qty), 0);

    const handleConfirm = () => {
        // Save to backend logic here
        navigation.navigate('Tabs', { screen: 'Cart' });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Revisar Itens</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}

                <Text style={styles.sectionTitle}>Itens Detectados</Text>

                {items.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                        <View style={styles.itemInfo}>
                            <TextInput style={styles.itemName} value={item.name} />
                            <View style={styles.row}>
                                <Text style={styles.currency}>R$</Text>
                                <TextInput style={styles.itemPrice} value={item.price} keyboardType="numeric" />
                                <Text style={styles.qty}>x{item.qty}</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Trash color={COLORS.danger} size={20} />
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Estimado</Text>
                    <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Check color="#000" size={20} style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Confirmar e Adicionar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 20 },
    title: { fontFamily: FONTS.bold, fontSize: 20, color: COLORS.textPrimary },
    cancelText: { fontFamily: FONTS.medium, color: COLORS.danger, fontSize: 16 },
    content: { paddingHorizontal: 24, paddingBottom: 100 },
    previewImage: { width: '100%', height: 200, borderRadius: RADIUS.md, marginBottom: 24, backgroundColor: COLORS.surfaceHighlight },
    sectionTitle: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textPrimary, marginBottom: 16 },
    itemCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
        padding: 16, borderRadius: RADIUS.md, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border
    },
    itemInfo: { flex: 1 },
    itemName: { fontFamily: FONTS.medium, color: COLORS.textPrimary, fontSize: 16, marginBottom: 4 },
    row: { flexDirection: 'row', alignItems: 'center' },
    currency: { fontFamily: FONTS.regular, color: COLORS.accent, marginRight: 4 },
    itemPrice: { fontFamily: FONTS.bold, color: COLORS.accent, fontSize: 16, width: 80 },
    qty: { fontFamily: FONTS.regular, color: COLORS.textSecondary, marginLeft: 16 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: COLORS.border },
    totalLabel: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 18 },
    totalValue: { fontFamily: FONTS.bold, color: COLORS.accent, fontSize: 20 },
    footer: { padding: 24, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.background },
    confirmButton: {
        backgroundColor: COLORS.accent, flexDirection: 'row', height: 56, borderRadius: 12,
        alignItems: 'center', justifyContent: 'center'
    },
    buttonText: { fontFamily: FONTS.bold, color: '#000', fontSize: 16 },
});
