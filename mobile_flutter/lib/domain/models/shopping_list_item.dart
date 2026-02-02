class ShoppingListItem {
  final String id;
  final String listId;
  final String name;
  final double quantity;
  final double? priceEstimate;
  final String status;
  final DateTime createdAt;

  ShoppingListItem({
    required this.id,
    required this.listId,
    required this.name,
    this.quantity = 1,
    this.priceEstimate,
    this.status = 'pending',
    required this.createdAt,
  });

  factory ShoppingListItem.fromJson(Map<String, dynamic> json) {
    return ShoppingListItem(
      id: json['id'],
      listId: json['list_id'],
      name: json['name'],
      quantity: (json['quantity'] as num).toDouble(),
      priceEstimate: json['price_estimate'] != null ? (json['price_estimate'] as num).toDouble() : null,
      status: json['status'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'list_id': listId,
      'name': name,
      'quantity': quantity,
      'price_estimate': priceEstimate,
      'status': status,
      'created_at': createdAt.toIso8601String(),
    };
  }

  double get total => (priceEstimate ?? 0.0) * quantity;
}
