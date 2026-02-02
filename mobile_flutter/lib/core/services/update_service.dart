import 'package:flutter/material.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../data/supabase_client.dart';

class UpdateService {
  static final UpdateService _instance = UpdateService._internal();
  factory UpdateService() => _instance;
  UpdateService._internal();

  /// Checks if a new version is available in Supabase
  Future<void> checkUpdates(BuildContext context) async {
    try {
      // 1. Get current app version
      final packageInfo = await PackageInfo.fromPlatform();
      final currentVersion = packageInfo.version;
      
      // 2. Fetch latest version from Supabase 'app_config' table
      // We expect a table 'app_config' with keys: 'latest_version' and 'update_url'
      final response = await SupabaseService.client
          .from('app_config')
          .select()
          .maybeSingle();

      if (response == null) return;

      final latestVersion = response['latest_version'] as String;
      final updateUrl = response['update_url'] as String;
      final isMandatory = response['is_mandatory'] ?? false;

      // 3. Compare versions (simple string comparison for now, or semantic)
      if (_isUpdateAvailable(currentVersion, latestVersion)) {
        if (context.mounted) {
          _showUpdateDialog(context, latestVersion, updateUrl, isMandatory);
        }
      }
    } catch (e) {
      debugPrint('Erro ao verificar atualizações: $e');
    }
  }

  bool _isUpdateAvailable(String current, String latest) {
    // Basic semantic versioning comparison
    List<int> currParts = current.split('.').map(int.parse).toList();
    List<int> lastParts = latest.split('.').map(int.parse).toList();

    for (var i = 0; i < 3; i++) {
        int c = i < currParts.length ? currParts[i] : 0;
        int l = i < lastParts.length ? lastParts[i] : 0;
        if (l > c) return true;
        if (l < c) return false;
    }
    return false;
  }

  void _showUpdateDialog(BuildContext context, String version, String url, bool mandatory) {
    showDialog(
      context: context,
      barrierDismissible: !mandatory,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B), // surfaceCard
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text(
          '✨ Nova versão disponível!',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        content: Text(
          'A versão $version do Pagly já está pronta. Atualize agora para ter as últimas melhorias e correções.',
          style: const TextStyle(color: Color(0xFF94A3B8)), // textSecondary
        ),
        actions: [
          if (!mandatory)
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Depois', style: TextStyle(color: Color(0xFF94A3B8))),
            ),
          ElevatedButton(
            onPressed: () async {
              final uri = Uri.parse(url);
              if (await canLaunchUrl(uri)) {
                await launchUrl(uri, mode: LaunchMode.externalApplication);
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFA3E635), // accent (lime)
              foregroundColor: Colors.black,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text('Atualizar Agora'),
          ),
        ],
      ),
    );
  }
}
