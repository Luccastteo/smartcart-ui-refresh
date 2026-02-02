import 'package:supabase_flutter/supabase_flutter.dart';
import '../../domain/models/shopping_list.dart';
import '../../domain/models/shopping_list_item.dart';
import '../supabase_client.dart';

class ShoppingListRepository {
  final SupabaseClient _client = SupabaseService.client;

  // Get all lists for current user
  Future<List<ShoppingList>> getLists() async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    // For now, simple select. Later we can optimize with count/sum from list_items
    final response = await _client
        .from('shopping_lists')
        .select('''
          *,
          shopping_items(count, price_estimate)
        ''')
        .eq('user_id', userId)
        .order('created_at', ascending: false);

    return (response as List).map((e) {
      final items = e['shopping_items'] as List;
      final count = items.length;
      final total = items.fold<double>(0.0, (sum, item) {
        final price = (item['price_estimate'] as num?)?.toDouble() ?? 0.0;
        return sum + price;
      });

      return ShoppingList.fromJson({
        ...e,
        'item_count': count,
        'total_estimate': total,
      });
    }).toList();
  }

  // Create new list
  Future<ShoppingList> createList(String name) async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    final response = await _client
        .from('shopping_lists')
        .insert({
          'user_id': userId,
          'name': name,
        })
        .select()
        .single();

    return ShoppingList.fromJson(response);
  }

  // Delete list
  Future<void> deleteList(String id) async {
    await _client.from('shopping_lists').delete().eq('id', id);
  }

  // Get items for a list
  Future<List<ShoppingListItem>> getListItems(String listId) async {
    final response = await _client
        .from('shopping_items')
        .select()
        .eq('list_id', listId)
        .order('created_at', ascending: false);

    return (response as List).map((e) => ShoppingListItem.fromJson(e)).toList();
  }

  // Add item to list
  Future<ShoppingListItem> addItem({
    required String listId,
    required String name,
    double? price,
    double quantity = 1,
  }) async {
    final response = await _client
        .from('shopping_items')
        .insert({
          'list_id': listId,
          'name': name,
          'price_estimate': price,
          'quantity': quantity,
        })
        .select()
        .single();

    return ShoppingListItem.fromJson(response);
  }

  // Update item status
  Future<void> updateItemStatus(String itemId, String status) async {
    await _client
        .from('shopping_items')
        .update({'status': status})
        .eq('id', itemId);
  }

  // Delete item
  Future<void> deleteItem(String itemId) async {
    await _client.from('shopping_items').delete().eq('id', itemId);
  }
}
