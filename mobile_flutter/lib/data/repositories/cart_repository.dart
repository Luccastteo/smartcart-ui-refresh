import 'package:supabase_flutter/supabase_flutter.dart';
import '../../domain/models/cart_item.dart';
import '../supabase_client.dart';

class CartRepository {
  final SupabaseClient _client = SupabaseService.client;

  // Get all cart items for current user
  Future<List<CartItem>> getCartItems() async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    final response = await _client
        .from('cart_items')
        .select()
        .eq('user_id', userId)
        .order('created_at', ascending: false);

    return (response as List).map((e) => CartItem.fromJson(e)).toList();
  }

  // Add item to cart
  Future<CartItem> addItem({
    required String name,
    required double price,
    int quantity = 1,
    String? imageUrl,
  }) async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    final data = {
      'user_id': userId,
      'name': name,
      'price': price,
      'quantity': quantity,
      'image_url': imageUrl,
    };

    final response = await _client
        .from('cart_items')
        .insert(data)
        .select()
        .single();

    return CartItem.fromJson(response);
  }

  // Update item quantity
  Future<void> updateQuantity(String itemId, int quantity) async {
    if (quantity <= 0) {
      await deleteItem(itemId);
      return;
    }

    await _client
        .from('cart_items')
        .update({'quantity': quantity})
        .eq('id', itemId);
  }

  // Delete item
  Future<void> deleteItem(String itemId) async {
    await _client.from('cart_items').delete().eq('id', itemId);
  }

  // Clear cart
  Future<void> clearCart() async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    await _client.from('cart_items').delete().eq('user_id', userId);
  }

  // Get cart total
  Future<double> getCartTotal() async {
    final items = await getCartItems();
    return items.fold<double>(0.0, (double sum, item) => sum + item.total);
  }
}
