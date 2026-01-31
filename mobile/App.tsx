import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import AuthNavigator from './src/navigation/AuthNavigator';
import AuthenticatedNavigator from './src/navigation/AuthenticatedNavigator';
import { COLORS } from './src/constants/theme';

const NavStyles = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
  },
};

const RootNavigation = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={NavStyles}>
      {session ? <AuthenticatedNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <StatusBar style="light" />
          <RootNavigation />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
