import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import '../../../theme/app_colors_v2.dart';
import '../../../l10n/app_strings.dart';
import '../providers/scanner_provider.dart';
import '../../cart/providers/cart_provider.dart';

class ScannerScreen extends ConsumerWidget {
  const ScannerScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final scannerState = ref.watch(scannerControllerProvider);
    final scannerController = ref.read(scannerControllerProvider.notifier);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return WillPopScope(
      onWillPop: () async {
        scannerController.reset();
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
              icon: const Icon(Icons.close, size: 20),
              onPressed: () {
                scannerController.reset();
                context.go('/home');
              },
            ),
          ),
          title: const Text(
            'Scanner',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        body: scannerState.imagePath == null
            ? _buildInitialState(context, ref, isDark)
            : _buildReviewState(context, ref, scannerState, isDark),
      ),
    );
  }

  Widget _buildInitialState(BuildContext context, WidgetRef ref, bool isDark) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                color: AppColorsV2.cardPurple.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.camera_alt_outlined,
                size: 60,
                color: AppColorsV2.cardPurple,
              ),
            ),
            const SizedBox(height: 32),
            Text(
              'Scanner de Produtos',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Tire uma foto do produto para\nadicionar ao carrinho automaticamente',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16,
                color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
              ),
            ),
            const SizedBox(height: 48),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () => _pickImage(context, ref, ImageSource.camera),
                icon: const Icon(Icons.camera_alt),
                label: const Text('Abrir Câmera'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColorsV2.cardPurple,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
            ),
            const SizedBox(height: 16),
            TextButton.icon(
              onPressed: () => _pickImage(context, ref, ImageSource.gallery),
              icon: const Icon(Icons.photo_library_outlined),
              label: const Text('Escolher da Galeria'),
              style: TextButton.styleFrom(
                foregroundColor: isDark ? Colors.white : Colors.black,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildReviewState(BuildContext context, WidgetRef ref, ScannerState state, bool isDark) {
    if (state.isProcessing) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const CircularProgressIndicator(color: AppColorsV2.cardPurple),
            const SizedBox(height: 24),
            Text(
              'Analisando imagem...',
              style: TextStyle(
                color: isDark ? Colors.white : Colors.black,
                fontSize: 16,
              ),
            ),
          ],
        ),
      );
    }

    if (state.error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 80, color: AppColorsV2.error),
              const SizedBox(height: 24),
              const Text(
                'Erro no Processamento',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Text(
                state.error!,
                textAlign: TextAlign.center,
                style: const TextStyle(color: AppColorsV2.textSecondaryLight),
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: () => ref.read(scannerControllerProvider.notifier).reset(),
                child: const Text('Tentar Novamente'),
              ),
            ],
          ),
        ),
      );
    }

    final nameController = TextEditingController(text: state.productName);
    final priceController = TextEditingController(text: state.productPrice?.toStringAsFixed(2) ?? '0.00');

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (state.imagePath != null)
            Hero(
              tag: 'scanned_image',
              child: ClipRRect(
                borderRadius: BorderRadius.circular(24),
                child: Image.file(
                  File(state.imagePath!),
                  height: 240,
                  fit: BoxFit.cover,
                ),
              ),
            ),
          
          const SizedBox(height: 32),
          
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: isDark ? AppColorsV2.cardDark : Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(
                color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Produto Detectado',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 24),
                TextField(
                  controller: nameController,
                  decoration: const InputDecoration(labelText: 'Nome do Produto'),
                ),
                const SizedBox(height: 20),
                TextField(
                  controller: priceController,
                  decoration: const InputDecoration(
                    labelText: 'Preço Estimado',
                    prefixText: 'R\$ ',
                  ),
                  keyboardType: TextInputType.number,
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 32),
          
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () => ref.read(scannerControllerProvider.notifier).reset(),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: const Text('Cancelar'),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                flex: 2,
                child: ElevatedButton(
                  onPressed: () async {
                    final price = double.tryParse(priceController.text) ?? 0.0;
                    if (nameController.text.isNotEmpty && price > 0) {
                      await ref.read(cartControllerProvider.notifier).addItem(
                        name: nameController.text,
                        price: price,
                        imageUrl: state.imagePath,
                      );
                      ref.read(scannerControllerProvider.notifier).reset();
                      ref.invalidate(cartItemsProvider);
                      if (context.mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Adicionado ao carrinho!')));
                        context.go('/cart');
                      }
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColorsV2.cardPurple,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: const Text('Confirmar & Adicionar'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _pickImage(BuildContext context, WidgetRef ref, ImageSource source) async {
    final image = await ImagePicker().pickImage(source: source);
    if (image != null) {
      await ref.read(scannerControllerProvider.notifier).processImage(image.path);
    }
  }
}
