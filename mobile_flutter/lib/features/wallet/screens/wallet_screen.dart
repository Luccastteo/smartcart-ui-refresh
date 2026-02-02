import 'package:flutter/material.dart';
import '../../../theme/colors.dart';
import '../../../theme/typography.dart';
import '../../../theme/spacing.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Minha Carteira', style: AppTypography.h2),
              const SizedBox(height: AppSpacing.xl),
              
              // Virtual Card
              _buildVirtualCard(),
              
              const SizedBox(height: AppSpacing.xl),
              
              Text('Métodos de Pagamento', style: AppTypography.h3),
              const SizedBox(height: AppSpacing.md),
              
              _buildPaymentMethod('PIX', 'Chave Cadastrada', Icons.pix, AppColors.accent),
              const SizedBox(height: AppSpacing.md),
              _buildPaymentMethod('Cartão Final 4242', 'Vence 12/28', Icons.credit_card, Colors.blue),
              
              const SizedBox(height: AppSpacing.xl),
              
              _buildBalanceSummary(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildVirtualCard() {
    return Container(
      width: double.infinity,
      height: 200,
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppColors.accent, Color(0xFFA3E635)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: AppColors.accent.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Icon(Icons.wifi_tethering, color: AppColors.textOnBrand),
              Text(
                'PAGLY CARD',
                style: AppTypography.caption.copyWith(
                  color: AppColors.textOnBrand,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const Text(
            '**** **** **** 4242',
            style: TextStyle(
              color: AppColors.textOnBrand,
              fontSize: 22,
              letterSpacing: 2,
              fontWeight: FontWeight.w500,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'VALOR DISPONÍVEL',
                    style: AppTypography.small.copyWith(color: AppColors.textOnBrand.withOpacity(0.7)),
                  ),
                  Text(
                    'R\$ 2.500,00',
                    style: AppTypography.h3.copyWith(color: AppColors.textOnBrand),
                  ),
                ],
              ),
              const Icon(Icons.contactless, color: AppColors.textOnBrand, size: 32),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPaymentMethod(String title, String subtitle, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: AppColors.surfaceCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: AppTypography.bodyMedium),
                Text(subtitle, style: AppTypography.caption),
              ],
            ),
          ),
          const Icon(Icons.chevron_right, color: AppColors.muted),
        ],
      ),
    );
  }

  Widget _buildBalanceSummary() {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: AppColors.surfaceCard,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildSummaryItem('Ganhos', 'R\$ 10k', AppColors.success),
          Container(width: 1, height: 40, color: AppColors.border),
          _buildSummaryItem('Gastos', 'R\$ 4k', AppColors.error),
          Container(width: 1, height: 40, color: AppColors.border),
          _buildSummaryItem('Cashback', 'R\$ 120', AppColors.accent),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(String label, String value, Color color) {
    return Column(
      children: [
        Text(label, style: AppTypography.caption),
        const SizedBox(height: 4),
        Text(value, style: AppTypography.bodyMedium.copyWith(color: color, fontWeight: FontWeight.bold)),
      ],
    );
  }
}
