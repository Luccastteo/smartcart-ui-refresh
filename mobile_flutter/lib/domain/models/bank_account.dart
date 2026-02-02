import 'package:flutter/material.dart';

class BankAccount {
  final String id;
  final String userId;
  final String bankName;
  final String accountType; // e.g., 'checking', 'savings', 'credit_card'
  final double balance;
  final String? cardNumberLast4;
  final Color? color;

  BankAccount({
    required this.id,
    required this.userId,
    required this.bankName,
    required this.accountType,
    required this.balance,
    this.cardNumberLast4,
    this.color,
  });

  factory BankAccount.fromJson(Map<String, dynamic> json) {
    return BankAccount(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      bankName: json['bank_name'] as String,
      accountType: json['account_type'] as String,
      balance: (json['balance'] as num).toDouble(),
      cardNumberLast4: json['card_number_last_4'] as String?,
      color: json['color_hex'] != null 
          ? Color(int.parse(json['color_hex'].toString().replaceAll('#', '0xFF'), radix: 16))
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'bank_name': bankName,
      'account_type': accountType,
      'balance': balance,
      'card_number_last_4': cardNumberLast4,
      'color_hex': color?.value.toRadixString(16).padLeft(8, '0').replaceFirst('ff', '#'),
    };
  }
}
