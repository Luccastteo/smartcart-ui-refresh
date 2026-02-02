import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../features/auth/providers/auth_provider.dart';

import '../../../core/services/update_service.dart';
import 'package:flutter/services.dart';
import '../../../theme/app_colors_v2.dart';
import '../../../l10n/app_strings.dart';
import '../widgets/balance_cards.dart';
import '../widgets/quick_actions_v2.dart';
import '../widgets/expense_list_item_v2.dart';
import '../widgets/custom_bottom_nav_v2.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      UpdateService().checkUpdates(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(currentUserProvider);
    final userName = user?.userMetadata?['full_name'] ?? user?.email?.split('@').first ?? 'Usuário';
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return WillPopScope(
      onWillPop: () async {
        SystemNavigator.pop();
        return false;
      },
      child: Scaffold(
        body: SafeArea(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Premium Header
                _buildHeader(context, isDark, user?.userMetadata?['avatar_url']),
                
                const SizedBox(height: 20),
                
                // Greeting
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${AppStrings.hello} $userName!',
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
                          height: 1.2,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        AppStrings.letsSaveMoney,
                        style: TextStyle(
                          fontSize: 14,
                          color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
                          height: 1.4,
                        ),
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Balance Cards
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: BalanceCards(
                    balance: 3922.40, // Mock for now, sync with real data later
                    userName: userName,
                  ),
                ),
                
                const SizedBox(height: 24),
                
                // Quick Actions
                const QuickActionsV2(),
                
                const SizedBox(height: 32),
                
                // Expenses Section
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        AppStrings.manageExpenses,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
                        ),
                      ),
                      TextButton(
                        onPressed: () => context.go('/finances'),
                        child: const Text(
                          AppStrings.seeAll,
                          style: TextStyle(
                            fontSize: 14,
                            color: AppColorsV2.cardPurple,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(height: 12),
                
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                    children: [
                      ExpenseListItemV2(
                        title: AppStrings.houseRent,
                        category: 'house_rent',
                        time: '09:00 am',
                        date: '12 setembro, 2025',
                        amount: 1500.00,
                      ),
                      const SizedBox(height: 12),
                      ExpenseListItemV2(
                        title: AppStrings.groceries,
                        category: 'groceries',
                        time: '02:30 pm',
                        date: '11 setembro, 2025',
                        amount: 450.20,
                      ),
                      const SizedBox(height: 12),
                      ExpenseListItemV2(
                        title: AppStrings.internet,
                        category: 'internet',
                        time: '10:00 am',
                        date: '10 setembro, 2025',
                        amount: 120.00,
                      ),
                    ],
                  ),
                ),
                
                const SizedBox(height: 100), // Space for bottom nav
              ],
            ),
          ),
        ),
        bottomNavigationBar: CustomBottomNavV2(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() => _currentIndex = index);
            // Handle navigation
            switch (index) {
              case 1: context.go('/lists'); break;
              case 3: context.go('/finances'); break;
              case 4: context.go('/profile'); break;
            }
          },
          onScannerTap: () => context.go('/scanner'),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, bool isDark, String? avatarUrl) {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Menu Icon
          _buildHeaderIcon(Icons.menu, isDark, () {}),
          
          Row(
            children: [
              // Notification Icon
              Stack(
                children: [
                  _buildHeaderIcon(Icons.notifications_outlined, isDark, () {}),
                  Positioned(
                    right: 12,
                    top: 12,
                    child: Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(
                        color: AppColorsV2.error,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 12),
              // Profile Photo
              GestureDetector(
                onTap: () => context.push('/profile'),
                child: Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: AppColorsV2.cardPurple,
                      width: 2,
                    ),
                  ),
                  child: CircleAvatar(
                    backgroundImage: avatarUrl != null 
                      ? NetworkImage(avatarUrl) 
                      : null,
                    backgroundColor: AppColorsV2.cardPurple.withOpacity(0.1),
                    child: avatarUrl == null 
                      ? const Icon(Icons.person, color: AppColorsV2.cardPurple)
                      : null,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildHeaderIcon(IconData icon, bool isDark, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          color: isDark ? AppColorsV2.cardDark : Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Icon(icon, size: 20, color: isDark ? Colors.white : Colors.black),
      ),
    );
  }
}
