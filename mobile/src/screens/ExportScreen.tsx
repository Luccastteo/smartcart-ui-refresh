import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { FileText, Table, Share2 } from 'lucide-react-native';
// import * as Print from 'expo-print'; // For PDF
// import * as Sharing from 'expo-sharing'; // For Sharing

export default function ExportScreen() {

    const handleExportPDF = async () => {
        // Mock export
        alert('Exportando PDF...');
        // const html = '<h1>Shopping List</h1><p>Item 1: $10</p>';
        // const { uri } = await Print.printToFileAsync({ html });
        // await Sharing.shareAsync(uri);
    };

    const handleExportXLS = async () => {
        alert('Exportando Planilha...');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Exportar Dados</Text>

            <Text style={styles.sectionTitle}>Selecione o formato</Text>

            <TouchableOpacity style={styles.card} onPress={handleExportPDF}>
                <View style={[styles.iconBox, { backgroundColor: '#ef4444' }]}>
                    <FileText color="#fff" size={24} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.textPrimary}>Relatório em PDF</Text>
                    <Text style={styles.textSecondary}>Melhor para impressão e leitura</Text>
                </View>
                <Share2 color={COLORS.textSecondary} size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={handleExportXLS}>
                <View style={[styles.iconBox, { backgroundColor: '#10b981' }]}>
                    <Table color="#fff" size={24} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.textPrimary}>Planilha Excel / CSV</Text>
                    <Text style={styles.textSecondary}>Melhor para análise de dados</Text>
                </View>
                <Share2 color={COLORS.textSecondary} size={20} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 60, paddingHorizontal: 24 },
    headerTitle: { fontFamily: FONTS.bold, fontSize: 24, color: COLORS.textPrimary, marginBottom: 32 },
    sectionTitle: { fontFamily: FONTS.medium, color: COLORS.textSecondary, marginBottom: 16 },
    card: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface,
        padding: 16, borderRadius: RADIUS.md, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border
    },
    iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    info: { flex: 1 },
    textPrimary: { fontFamily: FONTS.bold, color: COLORS.textPrimary, fontSize: 16 },
    textSecondary: { fontFamily: FONTS.regular, color: COLORS.textSecondary, fontSize: 12 },
});
