import 'package:supabase_flutter/supabase_flutter.dart';
import '../supabase_client.dart';

class AuthRepository {
  final SupabaseClient _client = SupabaseService.client;

  // Sign In
  Future<AuthResponse> signIn({
    required String email,
    required String password,
  }) async {
    return await _client.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  // Sign Up
  Future<AuthResponse> signUp({
    required String email,
    required String password,
    String? name,
  }) async {
    final response = await _client.auth.signUp(
      email: email,
      password: password,
      data: name != null ? {'name': name} : null,
    );
    return response;
  }

  // Sign Out
  Future<void> signOut() async {
    await _client.auth.signOut();
  }

  // Reset Password
  Future<void> resetPassword(String email) async {
    await _client.auth.resetPasswordForEmail(email);
  }

  // Get Current User
  User? getCurrentUser() {
    return _client.auth.currentUser;
  }

  // Auth State Stream
  Stream<AuthState> get authStateChanges {
    return _client.auth.onAuthStateChange;
  }

  // Check if authenticated
  bool get isAuthenticated => getCurrentUser() != null;
}
