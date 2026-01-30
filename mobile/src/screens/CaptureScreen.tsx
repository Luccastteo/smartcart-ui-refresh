import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { X, Camera, Sparkles, Image as ImageIcon } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { useCart } from '../context/CartContext';

export default function CaptureScreen({ navigation }: any) {
    const { addProduct } = useCart();
    const [permission, requestPermission] = useCameraPermissions();
    const [analyzing, setAnalyzing] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    let cameraRef: any = null;

    const analyzeImage = async (imageUri: string) => {
        setAnalyzing(true);
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Simular análise de imagem (Google Lens style)
        // Na versão real, aqui você chamaria uma API de OCR/Vision AI
        setTimeout(async () => {
            setAnalyzing(false);
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            // Mock de resultado da análise
            const mockResults = [
                { product: 'Café Pilão 500g', price: 'R$ 18,90' },
                { product: 'Leite Integral Itambé 1L', price: 'R$ 5,49' },
                { product: 'Pão de Forma Pullman', price: 'R$ 7,99' },
                { product: 'Arroz Tio João 5kg', price: 'R$ 24,90' },
            ];

            const result = mockResults[Math.floor(Math.random() * mockResults.length)];

            // Extrair preço numérico
            const priceValue = parseFloat(result.price.replace('R$', '').replace(',', '.').trim());

            Alert.alert(
                '✨ Produto Identificado!',
                `📦 ${result.product}\n💰 ${result.price}\n\nDeseja adicionar à sua lista?`,
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => setCapturedImage(null)
                    },
                    {
                        text: 'Adicionar à Lista',
                        onPress: async () => {
                            // Adicionar produto ao carrinho
                            await addProduct({
                                name: result.product,
                                price: priceValue,
                                quantity: 1,
                                imageUri: imageUri
                            });

                            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            setCapturedImage(null);

                            Alert.alert(
                                '✅ Adicionado!',
                                `${result.product} foi adicionado à sua lista de compras`,
                                [
                                    { text: 'Capturar Outro' },
                                    { text: 'Ver Carrinho', onPress: () => navigation.navigate('Tabs', { screen: 'Cart' }) },
                                ]
                            );
                        }
                    }
                ]
            );
        }, 2000);
    };

    const takePicture = async () => {
        if (cameraRef) {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            const photo = await cameraRef.takePictureAsync();
            setCapturedImage(photo.uri);
            analyzeImage(photo.uri);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
            setCapturedImage(result.assets[0].uri);
            analyzeImage(result.assets[0].uri);
        }
    };

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <View style={styles.permissionContainer}>
                    <Camera color={COLORS.accent} size={64} strokeWidth={1.5} />
                    <Text style={styles.permissionTitle}>Acesso à Câmera</Text>
                    <Text style={styles.permissionMessage}>
                        Precisamos da sua permissão para capturar produtos
                    </Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                        <Text style={styles.permissionButtonText}>Conceder Permissão</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (capturedImage && analyzing) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: capturedImage }} style={styles.previewImage} />
                <View style={styles.analyzingOverlay}>
                    <Sparkles color={COLORS.accent} size={48} strokeWidth={1.5} />
                    <Text style={styles.analyzingText}>Analisando produto...</Text>
                    <Text style={styles.analyzingSubtext}>Identificando nome e preço</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="back"
                ref={(ref) => (cameraRef = ref)}
            >
                <View style={styles.overlay}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                            <X color="#fff" size={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Capturar Produto</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsContainer}>
                        <View style={styles.instructionBadge}>
                            <Sparkles color={COLORS.accent} size={16} strokeWidth={2} />
                            <Text style={styles.instructionText}>
                                Aponte para o produto e capture
                            </Text>
                        </View>
                        <Text style={styles.instructionSubtext}>
                            Vamos identificar automaticamente o nome e preço
                        </Text>
                    </View>

                    {/* Capture Frame */}
                    <View style={styles.captureArea}>
                        <View style={styles.frame}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />
                        </View>
                    </View>

                    {/* Bottom Controls */}
                    <View style={styles.controls}>
                        <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
                            <ImageIcon color="#fff" size={24} />
                            <Text style={styles.galleryButtonText}>Galeria</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                            <View style={styles.captureButtonInner}>
                                <Camera color={COLORS.background} size={32} strokeWidth={2} />
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: 80 }} />
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    camera: { flex: 1, width: '100%' },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'space-between' },

    // Header
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 60, paddingHorizontal: 24
    },
    headerTitle: { fontFamily: FONTS.bold, color: '#fff', fontSize: 18 },
    iconButton: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center', alignItems: 'center'
    },

    // Instructions
    instructionsContainer: { alignItems: 'center', paddingHorizontal: 24 },
    instructionBadge: {
        flexDirection: 'row', alignItems: 'center', gap: 8,
        backgroundColor: 'rgba(163, 230, 53, 0.2)', paddingHorizontal: 16, paddingVertical: 10,
        borderRadius: 20, borderWidth: 1, borderColor: COLORS.accent, marginBottom: 12
    },
    instructionText: { fontFamily: FONTS.bold, color: '#fff', fontSize: 14 },
    instructionSubtext: {
        fontFamily: FONTS.regular, color: 'rgba(255,255,255,0.7)',
        fontSize: 13, textAlign: 'center'
    },

    // Capture Frame
    captureArea: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    frame: {
        width: 300, height: 300, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'transparent'
    },
    corner: {
        position: 'absolute', width: 50, height: 50, borderColor: COLORS.accent, borderWidth: 4
    },
    topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },

    // Controls
    controls: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 40, paddingBottom: 50
    },
    galleryButton: { alignItems: 'center', gap: 6 },
    galleryButtonText: { fontFamily: FONTS.medium, color: '#fff', fontSize: 12 },
    captureButton: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center',
        borderWidth: 4, borderColor: '#fff'
    },
    captureButtonInner: {
        width: 64, height: 64, borderRadius: 32,
        backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center'
    },

    // Permission
    permissionContainer: {
        alignItems: 'center', paddingHorizontal: 40
    },
    permissionTitle: {
        fontFamily: FONTS.bold, fontSize: 24, color: COLORS.textPrimary,
        marginTop: 24, marginBottom: 12
    },
    permissionMessage: {
        fontFamily: FONTS.regular, fontSize: 15, color: COLORS.textSecondary,
        textAlign: 'center', marginBottom: 32
    },
    permissionButton: {
        backgroundColor: COLORS.accent, paddingHorizontal: 32, paddingVertical: 16,
        borderRadius: RADIUS.lg
    },
    permissionButtonText: {
        fontFamily: FONTS.bold, fontSize: 16, color: COLORS.background
    },

    // Analyzing
    previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    analyzingOverlay: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center'
    },
    analyzingText: {
        fontFamily: FONTS.bold, fontSize: 24, color: '#fff', marginTop: 24
    },
    analyzingSubtext: {
        fontFamily: FONTS.regular, fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8
    },
});
