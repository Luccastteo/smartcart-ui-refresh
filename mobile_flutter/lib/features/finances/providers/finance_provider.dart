import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../data/repositories/finance_repository.dart';
import '../../../domain/models/transaction.dart';
import '../../../domain/models/bank_account.dart';

final financeRepositoryProvider = Provider<FinanceRepository>((ref) {
  return FinanceRepository();
});

final transactionsProvider = FutureProvider<List<Transaction>>((ref) {
  return ref.watch(financeRepositoryProvider).getTransactions();
});

final bankAccountsProvider = FutureProvider<List<BankAccount>>((ref) {
  return ref.watch(financeRepositoryProvider).getBankAccounts();
});

final financeSummaryProvider = Provider<Map<String, double>>((ref) {
  final transactions = ref.watch(transactionsProvider).value ?? [];
  
  double income = 0;
  double expenses = 0;
  
  for (var t in transactions) {
    if (t.type == 'income') {
      income += t.amount;
    } else {
      expenses += t.amount;
    }
  }
  
  return {
    'income': income,
    'expenses': expenses,
    'balance': income - expenses,
  };
});
