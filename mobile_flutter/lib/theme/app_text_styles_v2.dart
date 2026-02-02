import 'package:flutter/material.dart';
import 'app_colors_v2.dart';

class AppTextStylesV2 {
  static const String fontFamily = 'Poppins'; // Usando Poppins por ser clean e moderna

  static TextStyle h1(bool isDark) => TextStyle(
    fontFamily: fontFamily,
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
  );

  static TextStyle h2(bool isDark) => TextStyle(
    fontFamily: fontFamily,
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
  );

  static TextStyle h3(bool isDark) => TextStyle(
    fontFamily: fontFamily,
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
  );

  static TextStyle bodyLarge(bool isDark) => TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.normal,
    color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
  );

  static TextStyle bodyMedium(bool isDark) => TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.normal,
    color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
  );

  static TextStyle labelLarge(bool isDark) => TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
  );

  static TextStyle labelSmall(bool isDark) => TextStyle(
    fontFamily: fontFamily,
    fontSize: 11,
    fontWeight: FontWeight.w600,
    color: isDark ? AppColorsV2.textTertiaryDark : AppColorsV2.textTertiaryLight,
  );
}
