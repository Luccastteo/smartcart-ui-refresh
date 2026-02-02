import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../data/repositories/shopping_list_repository.dart';
import '../../../domain/models/shopping_list.dart';
import '../../../domain/models/shopping_list_item.dart';

// Repository Provider
final shoppingListRepositoryProvider = Provider<ShoppingListRepository>((ref) {
  return ShoppingListRepository();
});

// Shopping Lists Provider
final shoppingListsProvider = StreamProvider<List<ShoppingList>>((ref) {
  final repository = ref.watch(shoppingListRepositoryProvider);
  return Stream.periodic(const Duration(seconds: 5))
      .asyncMap((_) => repository.getLists());
});

// Shopping List Controller
class ShoppingListController extends StateNotifier<AsyncValue<void>> {
  final ShoppingListRepository _repository;

  ShoppingListController(this._repository) : super(const AsyncValue.data(null));

  Future<void> createList(String name) async {
    state = const AsyncValue.loading();
    try {
      await _repository.createList(name);
      state = const AsyncValue.data(null);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> deleteList(String id) async {
    state = const AsyncValue.loading();
    try {
      await _repository.deleteList(id);
      state = const AsyncValue.data(null);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> addItemToList({
    required String listId,
    required String name,
    double? price,
    double quantity = 1,
  }) async {
    state = const AsyncValue.loading();
    try {
      await _repository.addItem(
        listId: listId,
        name: name,
        price: price,
        quantity: quantity,
      );
      state = const AsyncValue.data(null);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> updateItemStatus(String itemId, String status) async {
    try {
      await _repository.updateItemStatus(itemId, status);
    } catch (e) {
      // Handle error
    }
  }

  Future<void> deleteItem(String itemId) async {
    try {
      await _repository.deleteItem(itemId);
    } catch (e) {
      // Handle error
    }
  }
}

// Controller Provider
final shoppingListControllerProvider =
    StateNotifierProvider<ShoppingListController, AsyncValue<void>>((ref) {
  final repository = ref.watch(shoppingListRepositoryProvider);
  return ShoppingListController(repository);
});

// List Items Provider
final listItemsProvider = FutureProvider.family<List<ShoppingListItem>, String>((ref, listId) {
  final repository = ref.watch(shoppingListRepositoryProvider);
  return repository.getListItems(listId);
});
