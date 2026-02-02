import 'package:flutter/material.dart';
import '../../../theme/app_colors_v2.dart';

class QuickActionsV2 extends StatelessWidget {
  const QuickActionsV2({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildActionButton(
          context,
          icon: Icons.arrow_upward,
          label: 'Enviar',
          isDark: isDark,
          onTap: () {},
        ),
        _buildActionButton(
          context,
          icon: Icons.arrow_downward,
          label: 'Solicitar',
          isDark: isDark,
          onTap: () {},
        ),
        _buildActionButton(
          context,
          icon: Icons.credit_card,
          label: 'Recarga',
          isDark: isDark,
          onTap: () {},
        ),
        _buildActionButton(
          context,
          icon: Icons.more_horiz,
          label: 'Mais',
          isDark: isDark,
          onTap: () {},
        ),
      ],
    );
  }

  Widget _buildActionButton(
    BuildContext context, {
    required IconData icon,
    required String label,
    required bool isDark,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              color: isDark ? AppColorsV2.cardDark : Colors.white,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(isDark ? 0.3 : 0.05),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Icon(
              icon,
              size: 24,
              color: isDark ? Colors.white : Colors.black,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
            ),
          ),
        ],
      ),
    );
  }
}
