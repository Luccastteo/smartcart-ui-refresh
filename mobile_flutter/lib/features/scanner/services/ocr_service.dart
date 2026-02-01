import 'dart:io';
import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';

class OcrService {
  final _textRecognizer = TextRecognizer();

  Future<String> extractTextFromImage(String imagePath) async {
    final inputImage = InputImage.fromFilePath(imagePath);
    final recognizedText = await _textRecognizer.processImage(inputImage);
    return recognizedText.text;
  }

  Map<String, dynamic> parseProductInfo(String text) {
    String name = 'Produto';
    double price = 0.0;

    // Parse price (R$ 10,50 or 10.50)
    final priceRegex = RegExp(r'R?\$?\s*(\d+)[,.](\d{2})');
    final priceMatch = priceRegex.firstMatch(text);
    
    if (priceMatch != null) {
      final reais = priceMatch.group(1) ?? '0';
      final centavos = priceMatch.group(2) ?? '00';
      price = double.parse('$reais.$centavos');
    }

    // Parse name (first non-price line with more than 3 characters)
    final lines = text.split('\n');
    for (final line in lines) {
      final cleanLine = line.trim();
      if (cleanLine.length > 3 && !priceRegex.hasMatch(cleanLine)) {
        name = cleanLine;
        break;
      }
    }

    return {
      'name': name,
      'price': price,
    };
  }

  void dispose() {
    _textRecognizer.close();
  }
}
