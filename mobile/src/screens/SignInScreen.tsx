import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';

export default function SignInScreen({ navigation }: any) {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (email && password) {
            await signIn(email, password);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft color={COLORS.textPrimary} size={24} strokeWidth={BORDERS.medium} />
                </TouchableOpacity>

                {/* Card */}
                <View style={styles.card}>
                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>Continue your adventure.</Text>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={COLORS.muted}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <View style={styles.underline} />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Password"
                                placeholderTextColor={COLORS.muted}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <EyeOff color={COLORS.muted} size={20} strokeWidth={BORDERS.medium} />
                                ) : (
                                    <Eye color={COLORS.muted} size={20} strokeWidth={BORDERS.medium} />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.underline} />
                    </View>

                    {/* Remember Me & Forgot Password */}
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                {rememberMe && <View style={styles.checkboxInner} />}
                            </View>
                            <Text style={styles.checkboxLabel}>Remember me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Sign In Button */}
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surfaceCard,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    card: {
        backgroundColor: COLORS.surfaceCard,
        borderRadius: RADIUS.xl,
        padding: 32,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 28,
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.textSecondary,
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 24,
    },
    input: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.textPrimary,
        paddingVertical: 12,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    underline: {
        height: BORDERS.thin,
        backgroundColor: COLORS.border,
        marginTop: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: BORDERS.thin,
        borderColor: COLORS.border,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: COLORS.accent,
        borderColor: COLORS.accent,
    },
    checkboxInner: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: COLORS.textOnBrand,
    },
    checkboxLabel: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    forgotText: {
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    button: {
        backgroundColor: COLORS.actionPrimary,
        height: 56,
        borderRadius: RADIUS.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    buttonText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.textOnBrand,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    linkText: {
        fontFamily: FONTS.bold,
        fontSize: 14,
        color: COLORS.textPrimary,
    },
});
