import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../theme/colors.dart';
import '../../../theme/typography.dart';
import '../../../theme/spacing.dart';
import '../../../core/utils/currency_formatter.dart';
import '../../../domain/models/cart_item.dart';
import '../providers/cart_provider.dart';
import '../../finances/services/payment_service.dart';
import '../../auth/providers/auth_provider.dart';

class CartScreen extends ConsumerWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartItemsAsync = ref.watch(cartItemsProvider);
    final cartTotal = ref.watch(cartTotalProvider);
    final controller = ref.read(cartControllerProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Carrinho'),
        actions: [
          IconButton(
            icon: const Icon(Icons.delete_outline),
            onPressed: () async {
              final confirm = await showDialog<bool>(
                context: context,
                builder: (context) => AlertDialog(
                  title: const Text('Limpar Carrinho'),
                  content: const Text('Deseja remover todos os itens?'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context, false),
                      child: const Text('Cancelar'),
                    ),
                    TextButton(
                      onPressed: () => Navigator.pop(context, true),
                      child: const Text('Limpar'),
                    ),
                  ],
                ),
              );
              if (confirm == true) {
                await controller.clearCart();
                ref.invalidate(cartItemsProvider);
              }
            },
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddProductDialog(context, controller, ref),
        backgroundColor: AppColors.accent,
        child: const Icon(Icons.add, color: AppColors.textOnBrand),
      ),
      body: cartItemsAsync.when(
        data: (items) {
          if (items.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.shopping_cart_outlined,
                    size: 64,
                    color: AppColors.muted,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Text(
                    'Carrinho vazio',
                    style: AppTypography.h3,
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Adicione produtos para começar',
                    style: AppTypography.caption,
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  ElevatedButton.icon(
                    onPressed: () => _showAddProductDialog(context, controller, ref),
                    icon: const Icon(Icons.add),
                    label: const Text('Adicionar Produto'),
                  ),
                ],
              ),
            );
          }

          return Column(
            children: [
              Expanded(
                child: RefreshIndicator(
                  onRefresh: () async {
                    ref.invalidate(cartItemsProvider);
                  },
                  child: ListView.builder(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    itemCount: items.length,
                    itemBuilder: (context, index) {
                      final item = items[index];
                      return _buildCartItem(
                        context,
                        ref,
                        item,
                        controller,
                      );
                    },
                  ),
                ),
              ),
              _buildTotalSection(context, ref, cartTotal),
            ],
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 64, color: AppColors.error),
              const SizedBox(height: AppSpacing.lg),
              Text('Erro: ${error.toString()}', style: AppTypography.caption),
              const SizedBox(height: AppSpacing.lg),
              ElevatedButton(
                onPressed: () => ref.invalidate(cartItemsProvider),
                child: const Text('Tentar Novamente'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showAddProductDialog(
    BuildContext context,
    CartController controller,
    WidgetRef ref,
  ) {
    final nameController = TextEditingController();
    final priceController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Novo Produto'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              autofocus: true,
              decoration: const InputDecoration(
                labelText: 'Nome do Produto',
                hintText: 'Ex: Leite Integral',
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            TextField(
              controller: priceController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Preço',
                hintText: '0.00',
                prefixText: r'R$ ',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              final name = nameController.text.trim();
              final price = double.tryParse(priceController.text) ?? 0.0;
              if (name.isNotEmpty && price > 0) {
                await controller.addItem(name: name, price: price);
                ref.invalidate(cartItemsProvider);
                if (context.mounted) Navigator.pop(context);
              }
            },
            child: const Text('Adicionar'),
          ),
        ],
      ),
    );
  }

  Widget _buildCartItem(
    BuildContext context,
    WidgetRef ref,
    CartItem item,
    CartController controller,
  ) {
    return Card(
      margin: const EdgeInsets.only(bottom: AppSpacing.md),
      color: AppColors.surfaceCard,
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Row(
          children: [
            // Image placeholder
            Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                color: AppColors.surfaceHighlight,
                borderRadius: BorderRadius.circular(AppRadius.sm),
              ),
              child: const Icon(
                Icons.shopping_bag_outlined,
                color: AppColors.accent,
              ),
            ),
            const SizedBox(width: AppSpacing.md),
            
            // Item info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.name, style: AppTypography.bodyMedium),
                  const SizedBox(height: 4),
                  Text(
                    CurrencyFormatter.format(item.price),
                    style: AppTypography.caption.copyWith(
                      color: AppColors.accent,
                    ),
                  ),
                ],
              ),
            ),
            
            // Quantity controls
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.remove_circle_outline),
                  onPressed: () async {
                    await controller.updateQuantity(
                      item.id,
                      item.quantity - 1,
                    );
                    ref.invalidate(cartItemsProvider);
                  },
                  iconSize: 24,
                  color: AppColors.textSecondary,
                ),
                Text('${item.quantity}', style: AppTypography.bodyMedium),
                IconButton(
                  icon: const Icon(Icons.add_circle_outline),
                  onPressed: () async {
                    await controller.updateQuantity(
                      item.id,
                      item.quantity + 1,
                    );
                    ref.invalidate(cartItemsProvider);
                  },
                  iconSize: 24,
                  color: AppColors.accent,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTotalSection(BuildContext context, WidgetRef ref, double total) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: const BoxDecoration(
        color: AppColors.surfaceCard,
        border: Border(top: BorderSide(color: AppColors.border)),
      ),
      child: SafeArea(
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Total', style: AppTypography.h3),
                Text(
                  CurrencyFormatter.format(total),
                  style: AppTypography.h3.copyWith(color: AppColors.accent),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.md),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: total > 0
                    ? () async {
                        final user = ref.read(currentUserProvider);
                        final paymentService = PaymentService();
                        
                        // Show loading
                        showDialog(
                          context: context,
                          barrierDismissible: false,
                          builder: (context) => const Center(
                            child: CircularProgressIndicator(),
                          ),
                        );

                        try {
                          final pixData = await paymentService.createPixPayment(
                            amount: total,
                            email: user?.email ?? 'cliente@pagly.com',
                          );
                          
                          if (context.mounted) {
                            Navigator.pop(context); // Close loading
                            context.push('/checkout/pix', extra: pixData);
                          }
                        } catch (e) {
                          if (context.mounted) {
                            Navigator.pop(context); // Close loading
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text('Erro ao criar PIX: $e')),
                            );
                          }
                        }
                      }
                    : null,
                child: const Text('Finalizar Compra'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
