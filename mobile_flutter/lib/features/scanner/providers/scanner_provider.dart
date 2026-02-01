import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/ocr_service.dart';

// OCR Service Provider
final ocrServiceProvider = Provider<OcrService>((ref) {
  return OcrService();
});

// Scanner State
class ScannerState {
  final String? imagePath;
  final String? extractedText;
  final String? productName;
  final double? productPrice;
  final bool isProcessing;
  final String? error;

  ScannerState({
    this.imagePath,
    this.extractedText,
    this.productName,
    this.productPrice,
    this.isProcessing = false,
    this.error,
  });

  ScannerState copyWith({
    String? imagePath,
    String? extractedText,
    String? productName,
    double? productPrice,
    bool? isProcessing,
    String? error,
  }) {
    return ScannerState(
      imagePath: imagePath ?? this.imagePath,
      extractedText: extractedText ?? this.extractedText,
      productName: productName ?? this.productName,
      productPrice: productPrice ?? this.productPrice,
      isProcessing: isProcessing ?? this.isProcessing,
      error: error ?? this.error,
    );
  }
}

// Scanner Controller
class ScannerController extends StateNotifier<ScannerState> {
  final OcrService _ocrService;

  ScannerController(this._ocrService) : super(ScannerState());

  Future<void> processImage(String imagePath) async {
    state = state.copyWith(
      imagePath: imagePath,
      isProcessing: true,
      error: null,
    );

    try {
      // Extract text
      final text = await _ocrService.extractTextFromImage(imagePath);
      
      // Parse product info
      final productInfo = _ocrService.parseProductInfo(text);

      state = state.copyWith(
        extractedText: text,
        productName: productInfo['name'] as String,
        productPrice: productInfo['price'] as double,
        isProcessing: false,
      );
    } catch (e) {
      state = state.copyWith(
        isProcessing: false,
        error: e.toString(),
      );
    }
  }

  void reset() {
    state = ScannerState();
  }
}

// Scanner Controller Provider
final scannerControllerProvider =
    StateNotifierProvider<ScannerController, ScannerState>((ref) {
  final ocrService = ref.watch(ocrServiceProvider);
  return ScannerController(ocrService);
});
