class CartItem {
  final String id;
  final String userId;
  final String name;
  final double price;
  final int quantity;
  final String? imageUrl;
  final DateTime createdAt;

  CartItem({
    required this.id,
    required this.userId,
    required this.name,
    required this.price,
    this.quantity = 1,
    this.imageUrl,
    required this.createdAt,
  });

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      name: json['name'] as String,
      price: (json['price'] as num).toDouble(),
      quantity: json['quantity'] as int? ?? 1,
      imageUrl: json['image_url'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_id': userId,
      'name': name,
      'price': price,
      'quantity': quantity,
      'image_url': imageUrl,
      'created_at': createdAt.toIso8601String(),
    };
  }

  CartItem copyWith({
    String? id,
    String? userId,
    String? name,
    double? price,
    int? quantity,
    String? imageUrl,
    DateTime? createdAt,
  }) {
    return CartItem(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      name: name ?? this.name,
      price: price ?? this.price,
      quantity: quantity ?? this.quantity,
      imageUrl: imageUrl ?? this.imageUrl,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  double get total => price * quantity;
}
