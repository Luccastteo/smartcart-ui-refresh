class ShoppingList {
  final String id;
  final String userId;
  final String name;
  final DateTime createdAt;
  final int itemCount;
  final double total;

  ShoppingList({
    required this.id,
    required this.userId,
    required this.name,
    required this.createdAt,
    this.itemCount = 0,
    this.total = 0.0,
  });

  factory ShoppingList.fromJson(Map<String, dynamic> json) {
    return ShoppingList(
      id: json['id'],
      userId: json['user_id'],
      name: json['name'],
      createdAt: DateTime.parse(json['created_at']),
      // These will be calculated or fetched from a view/joined query if needed
      itemCount: json['item_count'] ?? 0,
      total: (json['total_estimate'] as num?)?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'name': name,
      'created_at': createdAt.toIso8601String(),
    };
  }
}
