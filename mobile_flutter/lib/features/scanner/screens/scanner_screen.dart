import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:go_router/go_router.dart';
import 'dart:io';
import '../../../theme/colors.dart';
import '../../../theme/typography.dart';
import '../../../theme/spacing.dart';
import '../providers/scanner_provider.dart';
import '../../cart/providers/cart_provider.dart';

class ScannerScreen extends ConsumerWidget {
  const ScannerScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final scannerState = ref.watch(scannerControllerProvider);
    final scannerController = ref.read(scannerControllerProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Scanner'),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () {
            scannerController.reset();
            context.go('/home');
          },
        ),
      ),
      body: scannerState.imagePath == null
          ? _buildInitialState(context, ref)
          : _buildReviewState(context, ref, scannerState),
    );
  }

  Widget _buildInitialState(BuildContext context, WidgetRef ref) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.xl),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.camera_alt_outlined,
              size: 64,
              color: AppColors.accent,
            ),
            const SizedBox(height: AppSpacing.lg),
            Text(
              'Scanner de Produtos',
              style: AppTypography.h2,
            ),
            const SizedBox(height: AppSpacing.md),
            Text(
              'Tire uma foto do produto para\nadicionar ao carrinho',
              style: AppTypography.body.copyWith(color: AppColors.textSecondary),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: AppSpacing.xl),
            ElevatedButton.icon(
              onPressed: () => _pickImage(context, ref, ImageSource.camera),
              icon: const Icon(Icons.camera_alt),
              label: const Text('Abrir Câmera'),
            ),
            const SizedBox(height: AppSpacing.md),
            TextButton.icon(
              onPressed: () => _pickImage(context, ref, ImageSource.gallery),
              icon: const Icon(Icons.photo_library_outlined),
              label: const Text('Escolher da Galeria'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildReviewState(
    BuildContext context,
    WidgetRef ref,
    ScannerState state,
  ) {
    if (state.isProcessing) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: AppSpacing.lg),
            Text('Analisando imagem...'),
          ],
        ),
      );
    }

    if (state.error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 64, color: AppColors.error),
              const SizedBox(height: AppSpacing.lg),
              Text(
                'Erro ao processar imagem',
                style: AppTypography.h3,
              ),
              const SizedBox(height: AppSpacing.md),
              Text(
                state.error!,
                style: AppTypography.caption,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.xl),
              ElevatedButton(
                onPressed: () {
                  ref.read(scannerControllerProvider.notifier).reset();
                },
                child: const Text('Tentar Novamente'),
              ),
            ],
          ),
        ),
      );
    }

    final nameController = TextEditingController(text: state.productName);
    final priceController = TextEditingController(
      text: state.productPrice?.toStringAsFixed(2) ?? '0.00',
    );

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Image preview
          if (state.imagePath != null)
            ClipRRect(
              borderRadius: BorderRadius.circular(AppRadius.md),
              child: Image.file(
                File(state.imagePath!),
                height: 200,
                fit: BoxFit.cover,
              ),
            ),
          
          const SizedBox(height: AppSpacing.xl),
          
          // Product info card
          Container(
            padding: const EdgeInsets.all(AppSpacing.lg),
            decoration: BoxDecoration(
              color: AppColors.surfaceCard,
              borderRadius: BorderRadius.circular(AppRadius.md),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Informações do Produto', style: AppTypography.h3),
                const SizedBox(height: AppSpacing.lg),
                
                // Name field
                TextField(
                  controller: nameController,
                  decoration: const InputDecoration(
                    labelText: 'Nome do Produto',
                    hintText: 'Digite o nome',
                  ),
                ),
                
                const SizedBox(height: AppSpacing.lg),
                
                // Price field
                TextField(
                  controller: priceController,
                  decoration: const InputDecoration(
                    labelText: 'Preço',
                    hintText: '0.00',
                    prefixText: 'R\$ ',
                  ),
                  keyboardType: TextInputType.number,
                ),
                
                const SizedBox(height: AppSpacing.lg),
                
                // Extracted text (debug)
                if (state.extractedText != null)
                  ExpansionTile(
                    title: Text(
                      'Texto Extraído',
                      style: AppTypography.caption,
                    ),
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(AppSpacing.md),
                        child: Text(
                          state.extractedText!,
                          style: AppTypography.small,
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ),
          
          const SizedBox(height: AppSpacing.xl),
          
          // Actions
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () {
                    ref.read(scannerControllerProvider.notifier).reset();
                  },
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: AppColors.border),
                  ),
                  child: const Text('Cancelar'),
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                flex: 2,
                child: ElevatedButton(
                  onPressed: () async {
                    final name = nameController.text.trim();
                    final price = double.tryParse(priceController.text) ?? 0.0;
                    
                    if (name.isEmpty || price <= 0) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Preencha nome e preço válidos'),
                          backgroundColor: AppColors.error,
                        ),
                      );
                      return;
                    }
                    
                    // Add to cart
                    final cartController = ref.read(cartControllerProvider.notifier);
                    await cartController.addItem(
                      name: name,
                      price: price,
                      imageUrl: state.imagePath,
                    );
                    
                    // Reset and go to cart
                    ref.read(scannerControllerProvider.notifier).reset();
                    ref.invalidate(cartItemsProvider);
                    
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Produto adicionado ao carrinho!'),
                          backgroundColor: AppColors.success,
                        ),
                      );
                      context.go('/cart');
                    }
                  },
                  child: const Text('Adicionar ao Carrinho'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _pickImage(
    BuildContext context,
    WidgetRef ref,
    ImageSource source,
  ) async {
    final picker = ImagePicker();
    final image = await picker.pickImage(source: source);
    
    if (image != null) {
      final controller = ref.read(scannerControllerProvider.notifier);
      await controller.processImage(image.path);
    }
  }
}
