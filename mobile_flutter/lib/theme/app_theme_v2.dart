import 'package:flutter/material.dart';
import 'app_colors_v2.dart';

class AppThemeV2 {
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    scaffoldBackgroundColor: AppColorsV2.backgroundLight,
    primaryColor: AppColorsV2.cardPurple,
    colorScheme: const ColorScheme.light(
      primary: AppColorsV2.cardPurple,
      secondary: AppColorsV2.cardYellow,
      surface: AppColorsV2.surfaceLight,
      background: AppColorsV2.backgroundLight,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
      iconTheme: IconThemeData(color: AppColorsV2.textPrimaryLight),
      titleTextStyle: TextStyle(
        color: AppColorsV2.textPrimaryLight,
        fontSize: 18,
        fontWeight: FontWeight.bold,
      ),
    ),
    dividerTheme: const DividerThemeData(
      color: AppColorsV2.dividerLight,
      thickness: 1,
    ),
  );

  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColorsV2.backgroundDark,
    primaryColor: AppColorsV2.cardPurple,
    colorScheme: const ColorScheme.dark(
      primary: AppColorsV2.cardPurple,
      secondary: AppColorsV2.cardYellow,
      surface: AppColorsV2.surfaceDark,
      background: AppColorsV2.backgroundDark,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0,
      iconTheme: IconThemeData(color: AppColorsV2.textPrimaryDark),
      titleTextStyle: TextStyle(
        color: AppColorsV2.textPrimaryDark,
        fontSize: 18,
        fontWeight: FontWeight.bold,
      ),
    ),
    dividerTheme: const DividerThemeData(
      color: AppColorsV2.dividerDark,
      thickness: 1,
    ),
  );
}
