import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../theme/app_colors_v2.dart';
import '../../../l10n/app_strings.dart';
import '../../home/widgets/balance_cards.dart';
import '../../auth/providers/auth_provider.dart';
import '../../finances/providers/finance_provider.dart';

class WalletScreen extends ConsumerWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final bankAccountsAsync = ref.watch(bankAccountsProvider);
    final summary = ref.watch(financeSummaryProvider);
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
        body: RefreshIndicator(
          onRefresh: () async => ref.invalidate(bankAccountsProvider),
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                BalanceCards(
                  balance: summary['balance'] ?? 0.0,
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
                
                bankAccountsAsync.when(
                  data: (accounts) {
                    if (accounts.isEmpty) {
                      return _buildEmptyAccounts(context, isDark);
                    }
                    return Column(
                      children: accounts.map((acc) => Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: _buildPaymentMethod(
                          context,
                          icon: acc.accountType == 'credit_card' ? Icons.credit_card : Icons.account_balance,
                          title: acc.bankName,
                          subtitle: acc.accountType == 'credit_card' 
                              ? '•••• ${acc.cardNumberLast4 ?? '0000'}'
                              : 'Saldo: R\$ ${acc.balance.toStringAsFixed(2).replaceAll('.', ',')}',
                          isDark: isDark,
                        ),
                      )).toList(),
                    );
                  },
                  loading: () => const Center(child: CircularProgressIndicator()),
                  error: (e, _) => Center(child: Text('Erro: $e')),
                ),
                
                const SizedBox(height: 32),
                _buildSummarySection(summary, isDark),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyAccounts(BuildContext context, bool isDark) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 20),
        child: Column(
          children: [
            Icon(Icons.account_balance_wallet_outlined, size: 48, color: isDark ? Colors.white54 : Colors.black45),
            const SizedBox(height: 12),
            const Text('Nenhuma conta ou cartão cadastrado'),
          ],
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

  Widget _buildSummarySection(Map<String, double> summary, bool isDark) {
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
          _buildSummaryItem('Ganhos', 'R\$ ${summary['income']?.toStringAsFixed(0)}', AppColorsV2.success, isDark),
          Container(
            width: 1, 
            height: 40, 
            color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight
          ),
          _buildSummaryItem('Gastos', 'R\$ ${summary['expenses']?.toStringAsFixed(0)}', AppColorsV2.error, isDark),
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
