import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../data/repositories/cart_repository.dart';
import '../../../domain/models/cart_item.dart';
import '../../../data/repositories/finance_repository.dart';
import '../../finances/providers/finance_provider.dart';

// Cart Repository Provider
final cartRepositoryProvider = Provider<CartRepository>((ref) {
  return CartRepository();
});

// Cart Items Provider
final cartItemsProvider = StreamProvider<List<CartItem>>((ref) {
  final repository = ref.watch(cartRepositoryProvider);
  
  // Return a stream that updates every 2 seconds
  return Stream.periodic(const Duration(seconds: 2))
      .asyncMap((_) => repository.getCartItems());
});

// Cart Total Provider
final cartTotalProvider = Provider<double>((ref) {
  final cartItems = ref.watch(cartItemsProvider);
  return cartItems.when(
    data: (List<CartItem> items) => 
        items.fold<double>(0.0, (double sum, CartItem item) => sum + item.total),
    loading: () => 0.0,
    error: (_, __) => 0.0,
  );
});

// Cart Controller
class CartController extends StateNotifier<AsyncValue<void>> {
  final CartRepository _repository;
  final FinanceRepository _financeRepository;

  CartController(this._repository, this._financeRepository) : super(const AsyncValue.data(null));

  Future<void> addItem({
    required String name,
    required double price,
    int quantity = 1,
    String? imageUrl,
  }) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.addItem(
        name: name,
        price: price,
        quantity: quantity,
        imageUrl: imageUrl,
      );
    });
  }

  Future<void> updateQuantity(String itemId, int quantity) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.updateQuantity(itemId, quantity);
    });
  }

  Future<void> deleteItem(String itemId) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.deleteItem(itemId);
    });
  }

  Future<void> checkout(double total) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      // 1. Record the transaction
      await _financeRepository.createTransaction(
        title: 'Compra SmartCart',
        amount: total,
        category: 'groceries',
        type: 'expense',
        description: 'Compra realizada via app',
      );
      
      // 2. Clear the cart
      await _repository.clearCart();
    });
  }

  Future<void> clearCart() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repository.clearCart();
    });
  }
}

// Cart Controller Provider
final cartControllerProvider =
    StateNotifierProvider<CartController, AsyncValue<void>>((ref) {
  final repository = ref.watch(cartRepositoryProvider);
  final financeRepository = ref.watch(financeRepositoryProvider);
  return CartController(repository, financeRepository);
});
