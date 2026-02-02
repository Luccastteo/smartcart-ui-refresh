import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:go_router/go_router.dart';
import '../../../theme/colors.dart';
import '../../../theme/typography.dart';
import '../../../theme/spacing.dart';
import '../../../core/utils/currency_formatter.dart';

class PixPaymentScreen extends StatefulWidget {
  final double amount;
  final String qrCode;
  final String qrCodeBase64;

  const PixPaymentScreen({
    super.key,
    required this.amount,
    required this.qrCode,
    required this.qrCodeBase64,
  });

  @override
  State<PixPaymentScreen> createState() => _PixPaymentScreenState();
}

class _PixPaymentScreenState extends State<PixPaymentScreen> {
  bool _copied = false;

  void _copyToClipboard() {
    Clipboard.setData(ClipboardData(text: widget.qrCode));
    setState(() => _copied = true);
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) setState(() => _copied = false);
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Chave PIX copiada!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Pagamento PIX'),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => context.go('/home'),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.xl),
        child: Column(
          children: [
            // Amount Header
            Text(
              'Valor a pagar',
              style: AppTypography.caption,
            ),
            const SizedBox(height: 4),
            Text(
              CurrencyFormatter.format(widget.amount),
              style: AppTypography.h1.copyWith(color: AppColors.accent),
            ),
            const SizedBox(height: AppSpacing.xl * 2),

            // QR Code Container
            Container(
              padding: const EdgeInsets.all(AppSpacing.lg),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
              ),
              child: QrImageView(
                data: widget.qrCode,
                version: QrVersions.auto,
                size: 240.0,
                eyeStyle: const QrEyeStyle(
                  eyeShape: QrEyeShape.square,
                  color: Colors.black,
                ),
                dataModuleStyle: const QrDataModuleStyle(
                  dataModuleShape: QrDataModuleShape.square,
                  color: Colors.black,
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            // Instructions
            Text(
              'Escaneie o código QR acima para pagar',
              style: AppTypography.bodyMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppSpacing.xl),

            // Copy and Paste Section
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: AppColors.surfaceCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                children: [
                  Text(
                    'Ou use o código Copia e Cola',
                    style: AppTypography.small,
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          widget.qrCode,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: AppTypography.caption.copyWith(
                            fontFamily: 'monospace',
                          ),
                        ),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      IconButton(
                        onPressed: _copyToClipboard,
                        icon: Icon(
                          _copied ? Icons.check_circle : Icons.copy,
                          color: _copied ? AppColors.success : AppColors.accent,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl * 2),

            // Help instruction
            const _StepItem(
              icon: Icons.account_balance,
              text: 'Abra o app do seu banco ou carteira digital',
            ),
            const SizedBox(height: AppSpacing.md),
            const _StepItem(
              icon: Icons.pix,
              text: 'Escolha a opção Pagar com PIX/QR Code',
            ),
            const SizedBox(height: AppSpacing.md),
            const _StepItem(
              icon: Icons.verified_user,
              text: 'Confirme os dados e finalize o pagamento',
            ),
          ],
        ),
      ),
    );
  }
}

class _StepItem extends StatelessWidget {
  final IconData icon;
  final String text;

  const _StepItem({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppColors.surfaceHighlight,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: AppColors.accent, size: 20),
        ),
        const SizedBox(width: AppSpacing.md),
        Expanded(
          child: Text(
            text,
            style: AppTypography.small.copyWith(color: AppColors.textSecondary),
          ),
        ),
      ],
    );
  }
}
