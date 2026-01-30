import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONTS } from '../constants/theme';
import { Mail, Lock, User, CheckCircle } from 'lucide-react-native';

export default function SignUpScreen({ navigation }: any) {
    const { signUp } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (name && email && password && password === confirmPassword) {
            await signUp();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Create Account</Text>
                    <Text style={styles.subText}>Join PAGLY today</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <User color={COLORS.textSecondary} size={20} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor={COLORS.textSecondary}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Mail color={COLORS.textSecondary} size={20} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={COLORS.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Lock color={COLORS.textSecondary} size={20} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor={COLORS.textSecondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <CheckCircle color={COLORS.textSecondary} size={20} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={COLORS.textSecondary}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text style={styles.linkText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    header: { marginBottom: 32 },
    welcomeText: { fontFamily: FONTS.bold, fontSize: 32, color: COLORS.textPrimary },
    subText: { fontFamily: FONTS.regular, fontSize: 16, color: COLORS.textSecondary, marginTop: 8 },
    form: { width: '100%' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    icon: { marginRight: 12 },
    input: {
        flex: 1,
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    button: {
        backgroundColor: COLORS.accent,
        flexDirection: 'row',
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    buttonText: {
        fontFamily: FONTS.bold,
        color: '#000',
        fontSize: 16,
    },
    footer: { flexDirection: 'row', justifyContent: 'center' },
    footerText: { fontFamily: FONTS.regular, color: COLORS.textSecondary },
    linkText: { fontFamily: FONTS.bold, color: COLORS.accent },
});
