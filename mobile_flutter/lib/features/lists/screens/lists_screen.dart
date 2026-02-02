import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../theme/app_colors_v2.dart';
import '../../../l10n/app_strings.dart';
import '../../../core/utils/currency_formatter.dart';
import '../providers/lists_provider.dart';

class ListsScreen extends ConsumerWidget {
  const ListsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final listsAsync = ref.watch(shoppingListsProvider);
    final controller = ref.read(shoppingListControllerProvider.notifier);
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
            AppStrings.navLists,
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
                icon: const Icon(Icons.add, size: 20),
                onPressed: () => _showCreateListDialog(context, controller, ref),
              ),
            ),
          ],
        ),
        body: listsAsync.when(
          data: (lists) {
            if (lists.isEmpty) {
              return _buildEmptyState(context, isDark);
            }

            return RefreshIndicator(
              onRefresh: () async => ref.invalidate(shoppingListsProvider),
              child: ListView.builder(
                padding: const EdgeInsets.all(20),
                itemCount: lists.length,
                itemBuilder: (context, index) {
                  final list = lists[index];
                  return _buildListCard(context, list, isDark);
                },
              ),
            );
          },
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, stack) => Center(child: Text('Erro: $error')),
        ),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context, bool isDark) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.list_alt,
            size: 80,
            color: isDark ? AppColorsV2.textTertiaryDark : AppColorsV2.textTertiaryLight,
          ),
          const SizedBox(height: 16),
          Text(
            'Nenhuma lista encontrada',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Crie sua primeira lista de compras!',
            style: TextStyle(
              color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildListCard(BuildContext context, dynamic list, bool isDark) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: isDark ? AppColorsV2.cardDark : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColorsV2.borderDark : AppColorsV2.borderLight,
        ),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: AppColorsV2.brandGreen.withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Icon(Icons.shopping_cart_outlined, color: AppColorsV2.brandGreen),
        ),
        title: Text(
          list.name,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: isDark ? AppColorsV2.textPrimaryDark : AppColorsV2.textPrimaryLight,
          ),
        ),
        subtitle: Text(
          '${list.itemCount} itens • ${CurrencyFormatter.format(list.total)}',
          style: TextStyle(
            color: isDark ? AppColorsV2.textSecondaryDark : AppColorsV2.textSecondaryLight,
          ),
        ),
        trailing: const Icon(Icons.chevron_right),
        onTap: () => context.push('/lists/${list.id}'),
      ),
    );
  }

  void _showCreateListDialog(BuildContext context, ShoppingListController controller, WidgetRef ref) {
    final nameController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Nova Lista'),
        content: TextField(
          controller: nameController,
          autofocus: true,
          decoration: const InputDecoration(labelText: 'Nome da Lista'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancelar')),
          ElevatedButton(
            onPressed: () async {
              if (nameController.text.isNotEmpty) {
                await controller.createList(nameController.text);
                ref.invalidate(shoppingListsProvider);
                if (context.mounted) Navigator.pop(context);
              }
            },
            child: const Text('Criar'),
          ),
        ],
      ),
    );
  }
}
