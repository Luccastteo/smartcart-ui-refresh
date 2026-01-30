import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import CartScreen from '../screens/CartScreen';
import FinancesScreen from '../screens/FinancesScreen';
import WalletScreen from '../screens/WalletScreen';
import { COLORS } from '../constants/theme';
import { Home, List, ShoppingBasket, PieChart, Wallet } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                    borderTopColor: COLORS.border,
                    height: 64,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: COLORS.accent,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarLabelStyle: {
                    fontFamily: 'Inter_500Medium',
                    fontSize: 10,
                },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') return <Home color={color} size={size} strokeWidth={1.5} />;
                    if (route.name === 'List') return <List color={color} size={size} strokeWidth={1.5} />;
                    if (route.name === 'Cart') return <ShoppingBasket color={color} size={size} strokeWidth={1.5} />;
                    if (route.name === 'Finances') return <PieChart color={color} size={size} strokeWidth={1.5} />;
                    if (route.name === 'Wallet') return <Wallet color={color} size={size} strokeWidth={1.5} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="List" component={ListScreen} options={{ tabBarLabel: 'Listas' }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarLabel: 'Carrinho' }} />
            <Tab.Screen name="Finances" component={FinancesScreen} options={{ tabBarLabel: 'Finanças' }} />
            <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'Carteira' }} />
        </Tab.Navigator>
    );
}
