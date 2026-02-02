import 'package:flutter/material.dart';
import '../../../theme/app_colors_v2.dart';

class ExpenseListItemV2 extends StatelessWidget {
  final String title;
  final String category;
  final String time;
  final String date;
  final double amount;

  const ExpenseListItemV2({
    super.key,
    required this.title,
    required this.category,
    required this.time,
    required this.date,
    required this.amount,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppColorsV2.cardDark : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight,
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: _getCategoryColor().withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              _getCategoryIcon(),
              color: _getCategoryColor(),
              size: 24,
            ),
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
                const SizedBox(height: 4),
                Text(
                  '$time • $date',
                  style: TextStyle(
                    fontSize: 13,
                    color: isDark ? AppColorsV2.textTertiaryDark : AppColorsV2.textTertiaryLight,
                  ),
                ),
              ],
            ),
          ),
          Text(
            'R\$ ${amount.toStringAsFixed(2).replaceAll('.', ',')}',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
            ),
          ),
        ],
      ),
    );
  }

  IconData _getCategoryIcon() {
    switch (category) {
      case 'house_rent': return Icons.home_outlined;
      case 'internet': return Icons.wifi;
      case 'groceries': return Icons.shopping_cart_outlined;
      case 'taxes': return Icons.receipt_long_outlined;
      default: return Icons.category_outlined;
    }
  }

  Color _getCategoryColor() {
    switch (category) {
      case 'house_rent': return AppColorsV2.cardPurple;
      case 'internet': return AppColorsV2.info;
      case 'groceries': return AppColorsV2.cardYellow;
      case 'taxes': return AppColorsV2.error;
      default: return AppColorsV2.textSecondaryLight;
    }
  }
}
