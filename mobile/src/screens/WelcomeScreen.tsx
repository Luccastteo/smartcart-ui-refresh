import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={[COLORS.coral, '#f43f5e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    {/* Topographic lines simulation could go here with images or svgs */}
                    <View style={styles.circle1} />
                    <View style={styles.circle2} />
                </LinearGradient>
                <View style={styles.curve} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Welcome to PAGLY</Text>
                <Text style={styles.subtitle}>Smart shopping, simplified.</Text>

                <TouchableOpacity
                    style={styles.buttonMain}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        height: '55%',
        width: '100%',
        position: 'relative',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    curve: {
        position: 'absolute',
        bottom: -50,
        width: width,
        height: 100,
        backgroundColor: COLORS.background, // Match container bg
        borderTopLeftRadius: width / 2,
        borderTopRightRadius: width / 2,
        transform: [{ scaleX: 2 }],
    },
    circle1: {
        position: 'absolute',
        top: 50,
        right: -20,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    circle2: {
        position: 'absolute',
        bottom: 100,
        left: -50,
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    content: {
        flex: 1,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 28,
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: 48,
    },
    buttonMain: {
        backgroundColor: COLORS.accent,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: '#000',
    },
});
