import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, FONTS } from '../constants/theme';
import { X, Flashlight, ScanLine } from 'lucide-react-native';
import { MOCK_PRODUCTS } from '../mocks/data';
import * as Haptics from 'expo-haptics';

export default function ScannerScreen({ navigation }: any) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [torch, setTorch] = useState(false);

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        setScanned(true);
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Mock OCR - buscar produto no mock data
        const product = MOCK_PRODUCTS.find(p => p.barcode === data);

        if (product) {
            Alert.alert(
                "Produto Encontrado ✓",
                `${product.name}\nPreço: R$ ${product.price.toFixed(2)}\nCategoria: ${product.category}`,
                [
                    {
                        text: "Cancelar",
                        onPress: () => setScanned(false),
                        style: "cancel"
                    },
                    {
                        text: "Adicionar ao Carrinho",
                        onPress: async () => {
                            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            Alert.alert(
                                'Produto Adicionado! 🎉',
                                `${product.name} foi adicionado ao carrinho`,
                                [
                                    { text: 'Continuar Escaneando', onPress: () => setScanned(false) },
                                    { text: 'Ir para Carrinho', onPress: () => navigation.navigate('Tabs', { screen: 'Cart' }) },
                                ]
                            );
                        }
                    }
                ]
            );
        } else {
            Alert.alert(
                "Produto não encontrado",
                `Código: ${data}\n\nEste produto ainda não está cadastrado.`,
                [
                    { text: "OK", onPress: () => setScanned(false) }
                ]
            );
        }
    };

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Precisamos da sua permissão para usar a câmera</Text>
                <Button onPress={requestPermission} title="Conceder permissão" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="back"
                enableTorch={torch}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "ean13", "upc_e"],
                }}
            >
                <View style={styles.overlay}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                            <X color="#fff" size={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Escanear Código</Text>
                        <TouchableOpacity onPress={() => setTorch(!torch)} style={styles.iconButton}>
                            <Flashlight color={torch ? COLORS.accent : "#fff"} size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Scan Frame */}
                    <View style={styles.scanArea}>
                        <View style={styles.frame}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />
                            <ScanLine color={COLORS.accent} size={48} style={styles.scanIcon} />
                        </View>
                        <Text style={styles.instructionText}>Aponte a câmera para o código de barras</Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.manualButton} onPress={() => {
                            Alert.prompt(
                                'Código Manual',
                                'Digite o código de barras do produto:',
                                [
                                    { text: 'Cancelar', style: 'cancel' },
                                    {
                                        text: 'Buscar',
                                        onPress: (code?: string) => {
                                            if (code) {
                                                handleBarCodeScanned({ data: code });
                                            }
                                        }
                                    }
                                ],
                                'plain-text'
                            );
                        }}>
                            <Text style={styles.manualButtonText}>Digitar código manualmente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    message: { textAlign: 'center', paddingBottom: 10, color: '#fff' },
    camera: { flex: 1, width: '100%' },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'space-between' },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 60, paddingHorizontal: 24
    },
    headerTitle: { fontFamily: FONTS.bold, color: '#fff', fontSize: 18 },
    iconButton: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center', alignItems: 'center'
    },
    scanArea: { alignItems: 'center', justifyContent: 'center' },
    frame: {
        width: 280, height: 280, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'transparent'
    },
    corner: {
        position: 'absolute', width: 40, height: 40, borderColor: COLORS.accent, borderWidth: 4
    },
    topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
    scanIcon: { opacity: 0.8 },
    instructionText: {
        fontFamily: FONTS.medium, color: '#fff', marginTop: 24,
        fontSize: 14, paddingHorizontal: 40, textAlign: 'center', opacity: 0.8
    },
    footer: { padding: 40, alignItems: 'center' },
    manualButton: {
        paddingVertical: 12, paddingHorizontal: 24,
        backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 24
    },
    manualButtonText: { fontFamily: FONTS.bold, color: '#fff', fontSize: 14 },
});
