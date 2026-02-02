import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../theme/app_colors_v2.dart';
import '../../../l10n/app_strings.dart';
import '../providers/auth_provider.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final authController = ref.read(authControllerProvider.notifier);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final userName = user?.userMetadata?['full_name'] ?? user?.email?.split('@').first ?? 'Usuário';
    final email = user?.email ?? '';

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
            AppStrings.navProfile,
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              // Profile Photo & Name
              Column(
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: AppColorsV2.cardPurple,
                        width: 3,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: AppColorsV2.cardPurple.withOpacity(0.2),
                          blurRadius: 20,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: CircleAvatar(
                      radius: 48,
                      backgroundColor: AppColorsV2.cardPurple.withOpacity(0.1),
                      backgroundImage: user?.userMetadata?['avatar_url'] != null
                          ? NetworkImage(user!.userMetadata!['avatar_url'])
                          : null,
                      child: user?.userMetadata?['avatar_url'] == null
                          ? const Icon(Icons.person, size: 50, color: AppColorsV2.cardPurple)
                          : null,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    userName,
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
                    ),
                  ),
                  Text(
                    email,
                    style: TextStyle(
                      fontSize: 14,
                      color: isDark ? AppColorsV2.textTertiaryDark : AppColorsV2.textTertiaryLight,
                    ),
                  ),
                ],
              ),
              
              const SizedBox(height: 40),
              
              // Settings Sections
              _buildSection(
                context,
                title: 'Conta',
                isDark: isDark,
                items: [
                  _buildProfileItem(Icons.person_outline, 'Editar Perfil', isDark),
                  _buildProfileItem(Icons.notifications_none, 'Notificações', isDark),
                  _buildProfileItem(Icons.security, 'Segurança', isDark),
                ],
              ),
              
              const SizedBox(height: 24),
              
              _buildSection(
                context,
                title: 'Suporte',
                isDark: isDark,
                items: [
                  _buildProfileItem(Icons.help_outline, 'Ajuda & Suporte', isDark),
                  _buildProfileItem(Icons.info_outline, 'Sobre o Pagly', isDark),
                ],
              ),
              
              const SizedBox(height: 48),
              
              // Logout Button
              SizedBox(
                width: double.infinity,
                child: TextButton(
                  onPressed: () async {
                    await authController.signOut();
                    if (context.mounted) context.go('/welcome');
                  },
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    backgroundColor: AppColorsV2.error.withOpacity(0.1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: const Text(
                    'Sair da Conta',
                    style: TextStyle(
                      color: AppColorsV2.error,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSection(
    BuildContext context, {
    required String title,
    required List<Widget> items,
    required bool isDark,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(
            title,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColorsV2.textTertiaryDark : AppColorsV2.textTertiaryLight,
              letterSpacing: 1.1,
            ),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: isDark ? AppColorsV2.cardDark : Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight,
            ),
          ),
          child: Column(children: items),
        ),
      ],
    );
  }

  Widget _buildProfileItem(IconData icon, String title, bool isDark) {
    return ListTile(
      leading: Icon(
        icon,
        color: isDark ? Colors.white : Colors.black,
        size: 22,
      ),
      title: Text(
        title,
        style: TextStyle(
          fontSize: 15,
          color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
        ),
      ),
      trailing: const Icon(Icons.chevron_right, size: 20),
      onTap: () {},
    );
  }
}
