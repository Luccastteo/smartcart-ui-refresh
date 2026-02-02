import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../theme/app_colors_v2.dart';
import '../../../l10n/app_strings.dart';
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
    final isDark = Theme.of(context).brightness == Brightness.dark;

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
            AppStrings.navCart,
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          actions: [
            Container(
              margin: const EdgeInsets.only(right: 16),
              decoration: BoxDecoration(
                color: isDark ? AppColorsV2.cardDark : Colors.white,
                borderRadius: BorderRadius.circular(12),
              ),
              child: IconButton(
                icon: const Icon(Icons.delete_outline, size: 20),
                onPressed: () => _showClearCartConfirm(context, controller, ref),
              ),
            ),
          ],
        ),
        body: cartItemsAsync.when(
          data: (items) {
            if (items.isEmpty) {
              return _buildEmptyState(context, controller, ref, isDark);
            }

            return Column(
              children: [
                Expanded(
                  child: RefreshIndicator(
                    onRefresh: () async => ref.invalidate(cartItemsProvider),
                    child: ListView.builder(
                      padding: const EdgeInsets.all(20),
                      itemCount: items.length,
                      itemBuilder: (context, index) {
                        return _buildPremiumCartItem(context, ref, items[index], controller, isDark);
                      },
                    ),
                  ),
                ),
                _buildPremiumTotalSection(context, ref, cartTotal, isDark),
              ],
            );
          },
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, stack) => Center(child: Text('Erro: $error')),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () => _showAddProductDialog(context, controller, ref),
          backgroundColor: AppColorsV2.cardPurple,
          child: const Icon(Icons.add, color: Colors.white),
        ),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context, CartController controller, WidgetRef ref, bool isDark) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.shopping_cart_outlined,
            size: 80,
            color: isDark ? AppColorsV2.textTertiaryDark : AppColorsV2.textTertiaryLight,
          ),
          const SizedBox(height: 16),
          Text(
            'Carrinho vazio',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Adicione produtos para começar',
            style: TextStyle(
              color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPremiumCartItem(
    BuildContext context,
    WidgetRef ref,
    CartItem item,
    CartController controller,
    bool isDark,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isDark ? AppColorsV2.cardDark : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: AppColorsV2.cardPurple.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.shopping_bag_outlined, color: AppColorsV2.cardPurple),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.name,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
                  ),
                ),
                Text(
                  CurrencyFormatter.format(item.price),
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppColorsV2.cardPurple,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          Row(
            children: [
              _buildQtyBtn(Icons.remove, () async {
                await controller.updateQuantity(item.id, item.quantity - 1);
                ref.invalidate(cartItemsProvider);
              }, isDark),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: Text(
                  '${item.quantity}',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
              _buildQtyBtn(Icons.add, () async {
                await controller.updateQuantity(item.id, item.quantity + 1);
                ref.invalidate(cartItemsProvider);
              }, isDark),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQtyBtn(IconData icon, VoidCallback onTap, bool isDark) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: BoxDecoration(
          color: isDark ? Colors.white.withOpacity(0.05) : Colors.black.withOpacity(0.05),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, size: 18),
      ),
    );
  }

  Widget _buildPremiumTotalSection(BuildContext context, WidgetRef ref, double total, bool isDark) {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
      decoration: BoxDecoration(
        color: isDark ? AppColorsV2.surfaceDark : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Total',
                style: TextStyle(
                  fontSize: 16,
                  color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
                ),
              ),
              Text(
                CurrencyFormatter.format(total),
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: total > 0 ? () => _handleCheckout(context, ref, total) : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColorsV2.cardPurple,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text(
                'Finalizar Compra',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _showClearCartConfirm(BuildContext context, CartController controller, WidgetRef ref) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Limpar Carrinho'),
        content: const Text('Deseja remover todos os itens?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancelar')),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Limpar')),
        ],
      ),
    );
    if (confirm == true) {
      await controller.clearCart();
      ref.invalidate(cartItemsProvider);
    }
  }

  void _showAddProductDialog(BuildContext context, CartController controller, WidgetRef ref) {
    final nameController = TextEditingController();
    final priceController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Novo Produto'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameController, decoration: const InputDecoration(labelText: 'Nome')),
            TextField(controller: priceController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Preço', prefixText: 'R\$ ')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancelar')),
          ElevatedButton(
            onPressed: () async {
              final price = double.tryParse(priceController.text) ?? 0.0;
              if (nameController.text.isNotEmpty && price > 0) {
                await controller.addItem(name: nameController.text, price: price);
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

  Future<void> _handleCheckout(BuildContext context, WidgetRef ref, double total) async {
    final user = ref.read(currentUserProvider);
    final paymentService = PaymentService();
    
    showDialog(context: context, barrierDismissible: false, builder: (context) => const Center(child: CircularProgressIndicator()));

    try {
      final pixData = await paymentService.createPixPayment(amount: total, email: user?.email ?? 'cliente@pagly.com');
      if (context.mounted) {
        Navigator.pop(context);
        context.push('/checkout/pix', extra: pixData);
      }
    } catch (e) {
      if (context.mounted) {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Erro: $e'), backgroundColor: AppColorsV2.error));
      }
    }
  }
}
