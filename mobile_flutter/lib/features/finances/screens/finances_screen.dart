import 'package:flutter/material.dart';
import '../../../theme/colors.dart';
import '../../../theme/typography.dart';
import '../../../theme/spacing.dart';

class FinancesScreen extends StatelessWidget {
  const FinancesScreen({super.key});

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
              Text('Análise Financeira', style: AppTypography.h2),
              const SizedBox(height: AppSpacing.md),
              Text(
                'Acompanhe seus gastos e metas',
                style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
              ),
              const SizedBox(height: AppSpacing.xl),
              
              // Overview Card
              _buildOverviewCard(),
              
              const SizedBox(height: AppSpacing.xl),
              
              Text('Gasto por Categoria', style: AppTypography.h3),
              const SizedBox(height: AppSpacing.md),
              
              _buildCategoryItem('Alimentação', 'R\$ 850,00', 0.65, AppColors.accent),
              const SizedBox(height: AppSpacing.md),
              _buildCategoryItem('Transporte', 'R\$ 220,00', 0.20, Colors.blue),
              const SizedBox(height: AppSpacing.md),
              _buildCategoryItem('Saúde', 'R\$ 150,00', 0.15, Colors.red),
              
              const SizedBox(height: AppSpacing.xl),
              
              _buildInsightCard(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOverviewCard() {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: AppColors.surfaceCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildStat('Gasto Total', 'R\$ 1.220', AppColors.error),
              _buildStat('Economia', 'R\$ 450', AppColors.success),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),
          // Chart placeholder
          Container(
            height: 150,
            width: double.infinity,
            decoration: BoxDecoration(
              color: AppColors.surfaceHighlight.withOpacity(0.5),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Center(
              child: Icon(Icons.show_chart, color: AppColors.accent, size: 48),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStat(String label, String value, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: AppTypography.caption),
        Text(
          value,
          style: AppTypography.h3.copyWith(color: color, fontSize: 24),
        ),
      ],
    );
  }

  Widget _buildCategoryItem(String name, String value, double percent, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(name, style: AppTypography.bodyMedium),
            Text(value, style: AppTypography.bodyMedium.copyWith(fontWeight: FontWeight.bold)),
          ],
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: percent,
            backgroundColor: AppColors.surfaceHighlight,
            color: color,
            minHeight: 8,
          ),
        ),
      ],
    );
  }

  Widget _buildInsightCard() {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: AppColors.accent.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.accent.withOpacity(0.3)),
      ),
      child: Row(
        children: [
          const Icon(Icons.lightbulb_outline, color: AppColors.accent),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Text(
              'Você economizou 15% a mais que no mês passado com listas!',
              style: AppTypography.small.copyWith(color: AppColors.accent),
            ),
          ),
        ],
      ),
    );
  }
}
