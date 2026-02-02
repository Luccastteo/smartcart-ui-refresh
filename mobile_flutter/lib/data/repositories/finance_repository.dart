import 'package:supabase_flutter/supabase_flutter.dart';
import '../../domain/models/transaction.dart';
import '../../domain/models/bank_account.dart';
import '../supabase_client.dart';

class FinanceRepository {
  final SupabaseClient _client = SupabaseService.client;

  // --- Transactions ---

  Future<List<Transaction>> getTransactions() async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    final response = await _client
        .from('transactions')
        .select()
        .eq('user_id', userId)
        .order('date', ascending: false);

    return (response as List).map((e) => Transaction.fromJson(e)).toList();
  }

  Future<Transaction> createTransaction({
    required String title,
    required double amount,
    required String category,
    required String type,
    String? description,
    DateTime? date,
  }) async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    final response = await _client
        .from('transactions')
        .insert({
          'user_id': userId,
          'title': title,
          'amount': amount,
          'category': category,
          'type': type,
          'description': description,
          'date': (date ?? DateTime.now()).toIso8601String(),
        })
        .select()
        .single();

    return Transaction.fromJson(response);
  }

  // --- Bank Accounts ---

  Future<List<BankAccount>> getBankAccounts() async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    final response = await _client
        .from('bank_accounts')
        .select()
        .eq('user_id', userId);

    return (response as List).map((e) => BankAccount.fromJson(e)).toList();
  }

  Future<BankAccount> createBankAccount({
    required String bankName,
    required String accountType,
    required double balance,
    String? cardNumberLast4,
    String? colorHex,
  }) async {
    final userId = _client.auth.currentUser?.id;
    if (userId == null) throw Exception('User not authenticated');

    final response = await _client
        .from('bank_accounts')
        .insert({
          'user_id': userId,
          'bank_name': bankName,
          'account_type': accountType,
          'balance': balance,
          'card_number_last_4': cardNumberLast4,
          'color_hex': colorHex,
        })
        .select()
        .single();

    return BankAccount.fromJson(response);
  }
}
