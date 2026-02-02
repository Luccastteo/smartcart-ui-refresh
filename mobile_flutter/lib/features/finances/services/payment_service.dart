import 'package:flutter/material.dart';

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
    debugPrint('Iniciando criação de Pix: R\$ $amount para $email');
    
    // Simulate Edge Function / API Call latency
    await Future.delayed(const Duration(seconds: 2));

    // This is the structure returned by Mercado Pago API
    return {
      'id': 'pix_${DateTime.now().millisecondsSinceEpoch}',
      'status': 'pending',
      'qr_code': '00020101021226850014br.gov.bcb.pix0123pagly-pix-mock-test-key520400005303986540$amount.005802BR5910PAGLY_APP6009SAO_PAULO62070503***6304d1e2',
      'qr_code_base64': 'iVBORw0KGgoAAAANSUhEUgA...', // Mock base64
      'amount': amount,
    };
  }
}
