import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../theme/app_colors_v2.dart';
import '../../../theme/app_text_styles_v2.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> with TickerProviderStateMixin {
  late List<AnimationController> _controllers;
  late List<Animation<Offset>> _animations;
  late AnimationController _subtitleController;
  late Animation<double> _subtitleFade;
  late AnimationController _bubbleController;
  late Animation<Offset> _bubble1Animation;
  late Animation<Offset> _bubble2Animation;

  final String _logo = "PAGLY";

  @override
  void initState() {
    super.initState();

    // Controllers for each letter
    _controllers = List.generate(
      _logo.length,
      (index) => AnimationController(
        vsync: this,
        duration: const Duration(milliseconds: 600),
      ),
    );

    // Animations for each letter (falling from top)
    _animations = _controllers.map((controller) {
      return Tween<Offset>(
        begin: const Offset(0, -2),
        end: Offset.zero,
      ).animate(CurvedAnimation(
        parent: controller,
        curve: Curves.bounceOut,
      ));
    }).toList();

    _subtitleController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    _subtitleFade = Tween<double>(begin: 0.0, end: 1.0).animate(CurvedAnimation(
      parent: _subtitleController,
      curve: Curves.easeIn,
    ));

    // Bubble floating animation
    _bubbleController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..repeat(reverse: true);

    _bubble1Animation = Tween<Offset>(
      begin: Offset.zero,
      end: const Offset(0.05, 0.05),
    ).animate(CurvedAnimation(
      parent: _bubbleController,
      curve: Curves.easeInOut,
    ));

    _bubble2Animation = Tween<Offset>(
      begin: Offset.zero,
      end: const Offset(-0.08, 0.04),
    ).animate(CurvedAnimation(
      parent: _bubbleController,
      curve: Curves.easeInOut,
    ));

    _startAnimations();
  }

  Future<void> _startAnimations() async {
    for (int i = 0; i < _controllers.length; i++) {
      if (!mounted) return;
      await Future.delayed(const Duration(milliseconds: 150));
      if (!mounted) return;
      _controllers[i].forward();
    }
    
    if (!mounted) return;
    await Future.delayed(const Duration(milliseconds: 300));
    if (!mounted) return;
    _subtitleController.forward();

    // Auto-advance after 4 seconds total
    Timer(const Duration(seconds: 4), () {
      if (mounted) context.go('/auth');
    });
  }

  @override
  void dispose() {
    for (var c in _controllers) {
      c.dispose();
    }
    _subtitleController.dispose();
    _bubbleController.dispose();
    super.dispose();
  }

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
            // Decorative bubbles
            Positioned(
              top: -50,
              left: -50,
              child: AnimatedBuilder(
                animation: _bubble1Animation,
                builder: (context, child) {
                  return Transform.translate(
                    offset: Offset(
                      _bubble1Animation.value.dx * 200,
                      _bubble1Animation.value.dy * 200,
                    ),
                    child: child,
                  );
                },
                child: _buildBubble(150, Colors.white.withOpacity(0.05)),
              ),
            ),
            Positioned(
              bottom: 100,
              right: -30,
              child: AnimatedBuilder(
                animation: _bubble2Animation,
                builder: (context, child) {
                  return Transform.translate(
                    offset: Offset(
                      _bubble2Animation.value.dx * 150,
                      _bubble2Animation.value.dy * 150,
                    ),
                    child: child,
                  );
                },
                child: _buildBubble(120, Colors.white.withOpacity(0.03)),
              ),
            ),
            
            // Content
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: List.generate(_logo.length, (index) {
                      return SlideTransition(
                        position: _animations[index],
                        child: Text(
                          _logo[index],
                          style: const TextStyle(
                            fontSize: 70,
                            fontWeight: FontWeight.bold,
                            color: AppColorsV2.brandGreen,
                            letterSpacing: 4,
                          ),
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 16),
                  FadeTransition(
                    opacity: _subtitleFade,
                    child: Text(
                      'sejam bem-vindos',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.white.withOpacity(0.8),
                        fontWeight: FontWeight.w300,
                        letterSpacing: 1.2,
                      ),
                    ),
                  ),
                ],
              ),
            ),
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
