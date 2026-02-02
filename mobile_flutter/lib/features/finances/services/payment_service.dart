import 'package:flutter/material.dart';
import '../../../data/supabase_client.dart';

class PaymentService {
  static final PaymentService _instance = PaymentService._internal();
  factory PaymentService() => _instance;
  PaymentService._internal();

  // Mock processing for now
  Future<bool> processPixPayment({
    required double amount,
    required String description,
  }) async {
    debugPrint('Processando pagamento via PIX: R\$ $amount');
    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));
    return true; // Success
  }

  Future<bool> processCardPayment({
    required double amount,
    required String cardNumber,
    required String expiry,
    required String cvv,
  }) async {
    debugPrint('Processando pagamento via Cartão: R\$ $amount');
    // Simulate API call
    await Future.delayed(const Duration(seconds: 3));
    return true; // Success
  }

  // Future integration point for Open Finance
  Future<List<Map<String, dynamic>>> getBankAccounts() async {
    // This will connect to an Open Finance API in the future
    return [
      {'bank': 'Nubank', 'balance': 1500.0, 'id': 'nu_01'},
      {'bank': 'Itaú', 'balance': 3450.50, 'id': 'itau_01'},
    ];
  }

  // Create a real PIX payment via Mercado Pago
  // IMPORTANT: In production, this call should happen via Supabase Edge Functions
  // for security. This structure is ready for that migration.
  Future<Map<String, dynamic>> createPixPayment({
    required double amount,
    required String email,
    String description = 'Compra no PAGLY',
  }) async {
    debugPrint('Iniciando criação de Pix Real: R\$ $amount para $email');

    try {
      final response = await SupabaseService.client.functions.invoke(
        'create-pix-payment',
        body: {
          'amount': amount,
          'email': email,
          'description': description,
        },
      );

      if (response.status != 200) {
        throw Exception(response.data['error'] ?? 'Erro desconhecido no servidor');
      }

      final data = response.data as Map<String, dynamic>;
      
      return {
        'id': data['id'].toString(),
        'status': data['status'],
        'qr_code': data['qr_code'],
        'qr_code_base64': data['qr_code_base64'],
        'amount': amount,
      };
    } catch (e) {
      debugPrint('Erro ao criar Pix Real: $e');
      // Fallback for demo/dev if function is not deployed or fails
      rethrow;
    }
  }
}
