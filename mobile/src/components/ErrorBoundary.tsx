import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { AlertCircle, RefreshCw } from 'lucide-react-native';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ error, errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <AlertCircle color={COLORS.statusError} size={64} strokeWidth={1.5} />
                        </View>

                        <Text style={styles.title}>Algo deu errado</Text>
                        <Text style={styles.subtitle}>
                            O aplicativo encontrou um erro inesperado
                        </Text>

                        {this.state.error && (
                            <ScrollView style={styles.errorContainer}>
                                <Text style={styles.errorTitle}>Detalhes do erro:</Text>
                                <Text style={styles.errorText}>{this.state.error.toString()}</Text>
                                {this.state.errorInfo && (
                                    <Text style={styles.errorStack}>
                                        {this.state.errorInfo.componentStack}
                                    </Text>
                                )}
                            </ScrollView>
                        )}

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleReset}
                            activeOpacity={0.8}
                        >
                            <RefreshCw color={COLORS.textOnBrand} size={20} strokeWidth={2} />
                            <Text style={styles.buttonText}>Tentar Novamente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    content: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        color: COLORS.textPrimary,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 32,
    },
    errorContainer: {
        width: '100%',
        maxHeight: 200,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    errorTitle: {
        fontFamily: FONTS.bold,
        fontSize: 14,
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    errorText: {
        fontFamily: FONTS.regular,
        fontSize: 12,
        color: COLORS.statusError,
        marginBottom: 8,
    },
    errorStack: {
        fontFamily: FONTS.regular,
        fontSize: 10,
        color: COLORS.textSecondary,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: COLORS.accent,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: RADIUS.md,
    },
    buttonText: {
        fontFamily: FONTS.bold,
        fontSize: 16,
        color: COLORS.textOnBrand,
    },
});
