import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../theme/app_colors_v2.dart';
import '../../../l10n/app_strings.dart';
import '../../home/widgets/balance_cards.dart';
import '../../auth/providers/auth_provider.dart';

class WalletScreen extends ConsumerWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final userName = user?.userMetadata?['full_name'] ?? user?.email?.split('@').first ?? 'Usuário';
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return WillPopScope(
      onWillPop: () async {
        context.go('/home');
        return false;
      },
      child: Scaffold(
        appBar: AppBar(
          leading: Container(
            margin: const EdgeInsets.only(left: 16),
            decoration: BoxDecoration(
              color: isDark ? AppColorsV2.cardDark : Colors.white,
              borderRadius: BorderRadius.circular(12),
            ),
            child: IconButton(
              icon: const Icon(Icons.arrow_back, size: 20),
              onPressed: () => context.go('/home'),
            ),
          ),
          title: const Text(
            AppStrings.navWallet,
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              BalanceCards(
                balance: 3922.40,
                userName: userName,
              ),
              const SizedBox(height: 32),
              
              Text(
                'Métodos de Pagamento',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
                ),
              ),
              const SizedBox(height: 16),
              
              _buildPaymentMethod(
                context,
                icon: Icons.credit_card,
                title: 'Cartão Principal',
                subtitle: 'Visa •••• 4364',
                isDark: isDark,
              ),
              const SizedBox(height: 12),
              _buildPaymentMethod(
                context,
                icon: Icons.account_balance,
                title: 'Saldo Pagly',
                subtitle: 'R\$ 3.922,40',
                isDark: isDark,
              ),
              
              const SizedBox(height: 32),
              _buildSummarySection(isDark),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPaymentMethod(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required bool isDark,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppColorsV2.cardDark : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: AppColorsV2.cardPurple.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: AppColorsV2.cardPurple),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
                  ),
                ),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 14,
                    color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
                  ),
                ),
              ],
            ),
          ),
          Icon(
            Icons.chevron_right,
            color: isDark ? AppColorsV2.textTertiaryDark : AppColorsV2.textTertiaryLight,
          ),
        ],
      ),
    );
  }

  Widget _buildSummarySection(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: isDark ? AppColorsV2.cardDark : Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildSummaryItem('Ganhos', 'R\$ 10k', AppColorsV2.success, isDark),
          Container(
            width: 1, 
            height: 40, 
            color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight
          ),
          _buildSummaryItem('Gastos', 'R\$ 4k', AppColorsV2.error, isDark),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(String label, String value, Color color, bool isDark) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
      ],
    );
  }
}
