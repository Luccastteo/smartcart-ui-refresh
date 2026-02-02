import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../features/auth/screens/welcome_screen.dart';
import '../features/auth/screens/sign_in_screen.dart';
import '../features/auth/screens/sign_up_screen.dart';
import '../features/home/screens/home_screen.dart';
import '../features/lists/screens/lists_screen.dart';
import '../features/cart/screens/cart_screen.dart';
import '../features/scanner/screens/scanner_screen.dart';
import '../features/finances/screens/finances_screen.dart';
import '../features/wallet/screens/wallet_screen.dart';
import '../features/finances/screens/pix_payment_screen.dart';
import '../features/auth/screens/profile_screen.dart';
import '../features/auth/providers/auth_provider.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);

  return GoRouter(
    initialLocation: '/welcome',
    redirect: (context, state) {
      final isAuthenticated = authState.value?.session != null;
      final isAuthRoute = state.matchedLocation.startsWith('/welcome') ||
          state.matchedLocation.startsWith('/signin') ||
          state.matchedLocation.startsWith('/signup');

      if (!isAuthenticated && !isAuthRoute) {
        return '/welcome';
      }
      if (isAuthenticated && isAuthRoute) {
        return '/home';
      }
      return null;
    },
    routes: [
      // Auth Routes
      GoRoute(
        path: '/welcome',
        builder: (context, state) => const WelcomeScreen(),
      ),
      GoRoute(
        path: '/signin',
        builder: (context, state) => const SignInScreen(),
      ),
      GoRoute(
        path: '/signup',
        builder: (context, state) => const SignUpScreen(),
      ),

      // Main App Routes
      GoRoute(
        path: '/home',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/lists',
        builder: (context, state) => const ListsScreen(),
      ),
      GoRoute(
        path: '/cart',
        builder: (context, state) => const CartScreen(),
      ),
      GoRoute(
        path: '/scanner',
        builder: (context, state) => const ScannerScreen(),
      ),
      GoRoute(
        path: '/finances',
        builder: (context, state) => const FinancesScreen(),
      ),
      GoRoute(
        path: '/wallet',
        builder: (context, state) => const WalletScreen(),
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/checkout/pix',
        builder: (context, state) {
          final data = state.extra as Map<String, dynamic>;
          return PixPaymentScreen(
            amount: data['amount'] as double,
            qrCode: data['qr_code'] as String,
            qrCodeBase64: data['qr_code_base64'] as String,
          );
        },
      ),
    ],
  );
});
