import 'dart:ui';
import 'package:flutter/material.dart';
import '../../theme/app_colors_v2.dart';

class AuthBackground extends StatelessWidget {
  final Widget child;

  const AuthBackground({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: RadialGradient(
            center: Alignment.topLeft,
            radius: 1.5,
            colors: [
              AppColorsV2.authPurpleDark,
              AppColorsV2.authPurpleMid,
              AppColorsV2.authPink,
            ],
            stops: [0.0, 0.5, 1.0],
          ),
        ),
        child: Stack(
          children: [
            // Decorative bubbles with blur
            Positioned(
              top: -40,
              left: -40,
              child: _buildBubble(200, Colors.white.withOpacity(0.08)),
            ),
            Positioned(
              top: 100,
              right: -60,
              child: _buildBubble(180, Colors.white.withOpacity(0.05)),
            ),
            
            // Blur effect
            Positioned.fill(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                child: Container(color: Colors.transparent),
              ),
            ),
            
            // Page content
            SafeArea(child: child),
          ],
        ),
      ),
    );
  }

  Widget _buildBubble(double size, Color color) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
    );
  }
}
