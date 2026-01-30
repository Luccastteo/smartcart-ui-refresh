import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Carregar sessão inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        // Escutar mudanças de autenticação
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (email: string, password: string) => {
                try {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });

                    if (error) throw error;

                    setSession(data.session);
                    setUser(data.user);
                } catch (error: any) {
                    console.error('Erro no login:', error);
                    Alert.alert('Erro', error.message || 'Falha ao fazer login');
                    throw error;
                }
            },

            signOut: async () => {
                try {
                    const { error } = await supabase.auth.signOut();
                    if (error) throw error;

                    setSession(null);
                    setUser(null);
                } catch (error: any) {
                    console.error('Erro no logout:', error);
                    Alert.alert('Erro', 'Falha ao fazer logout');
                    throw error;
                }
            },

            signUp: async (email: string, password: string, name: string) => {
                try {
                    const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            data: {
                                name,
                            },
                        },
                    });

                    if (error) throw error;

                    // O trigger no Supabase criará o profile automaticamente
                    setSession(data.session);
                    setUser(data.user);

                    Alert.alert(
                        'Sucesso!',
                        'Conta criada com sucesso. Verifique seu email para confirmar.'
                    );
                } catch (error: any) {
                    console.error('Erro no registro:', error);
                    Alert.alert('Erro', error.message || 'Falha ao criar conta');
                    throw error;
                }
            },

            user,
            session,
            isLoading,
        }),
        [user, session, isLoading]
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
