import 'package:flutter/material.dart';
import '../../../theme/app_colors_v2.dart';

class CustomBottomNavV2 extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;
  final VoidCallback onScannerTap;

  const CustomBottomNavV2({
    super.key,
    required this.currentIndex,
    required this.onTap,
    required this.onScannerTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bottomPadding = MediaQuery.of(context).padding.bottom;

    return Container(
      height: 72 + bottomPadding,
      padding: EdgeInsets.only(
        left: 20,
        right: 20,
        bottom: bottomPadding,
        top: 12,
      ),
      decoration: BoxDecoration(
        color: isDark ? AppColorsV2.surfaceDark : Colors.white,
        border: Border(
          top: BorderSide(
            color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight,
            width: 1,
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildNavItem(
            icon: Icons.home,
            isSelected: currentIndex == 0,
            isDark: isDark,
            onTap: () => onTap(0),
          ),
          _buildNavItem(
            icon: Icons.add_box_outlined,
            isSelected: currentIndex == 1,
            isDark: isDark,
            onTap: () => onTap(1),
          ),
          
          // Central FAB (Scanner)
          GestureDetector(
            onTap: onScannerTap,
            child: Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppColorsV2.brandGreen, Color(0xFFC4E03F)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppColorsV2.brandGreen.withOpacity(0.4),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: const Icon(
                Icons.camera_alt,
                color: Colors.black,
                size: 28,
              ),
            ),
          ),

          _buildNavItem(
            icon: Icons.bar_chart,
            isSelected: currentIndex == 3,
            isDark: isDark,
            onTap: () => onTap(3),
          ),
          _buildNavItem(
            icon: Icons.person_outline,
            isSelected: currentIndex == 4,
            isDark: isDark,
            onTap: () => onTap(4),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem({
    required IconData icon,
    required bool isSelected,
    required bool isDark,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 48,
        height: 48,
        decoration: BoxDecoration(
          color: isSelected 
              ? (isDark ? Colors.white.withOpacity(0.1) : Colors.black.withOpacity(0.05))
              : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(
          icon,
          size: 24,
          color: isSelected
              ? (isDark ? Colors.white : Colors.black)
              : AppColorsV2.textTertiaryLight,
        ),
      ),
    );
  }
}
