import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import CaptureScreen from '../screens/CaptureScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ExportScreen from '../screens/ExportScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ListDetailScreen from '../screens/ListDetailScreen';

const Stack = createNativeStackNavigator();

export default function AuthenticatedNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
            <Stack.Screen name="Tabs" component={AppNavigator} options={{ presentation: 'card' }} />
            <Stack.Screen name="Capture" component={CaptureScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="Export" component={ExportScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ presentation: 'card' }} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ presentation: 'card' }} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ presentation: 'card' }} />
            <Stack.Screen name="ListDetail" component={ListDetailScreen} options={{ presentation: 'card' }} />
        </Stack.Navigator>
    );
}
