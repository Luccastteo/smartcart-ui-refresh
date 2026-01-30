import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// standard localhost for android emulator is 10.0.2.2, for iOS it is localhost
const API_URL = 'http://10.0.2.2:3000';
// Note: If running on physical device, use your machine's LAN IP (e.g., http://192.168.1.5:3000)

type AuthContextType = {
    userToken: string | null;
    isLoading: boolean;
    signIn: (email: string, pass: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, pass: string, name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const token = await SecureStore.getItemAsync('userToken');
                setUserToken(token);
            } catch (e) {
                console.log('Restoring token failed');
            }
            setIsLoading(false);
        };
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (email: string, pass: string) => {
                // MOCK LOGIN
                const fakeToken = 'mock-token-123';
                setUserToken(fakeToken);
                await SecureStore.setItemAsync('userToken', fakeToken);
            },
            signOut: async () => {
                setUserToken(null);
                await SecureStore.deleteItemAsync('userToken');
            },
            signUp: async (email: string, pass: string, name: string) => {
                // MOCK SIGNUP
                const fakeToken = 'mock-token-123';
                setUserToken(fakeToken);
                await SecureStore.setItemAsync('userToken', fakeToken);
            },
            userToken,
            isLoading,
        }),
        [userToken, isLoading]
    );

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
