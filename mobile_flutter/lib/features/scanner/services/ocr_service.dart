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
    print('OCR Raw Text: $text');
    String name = 'Produto';
    double price = 0.0;

    final lines = text.split('\n').map((l) => l.trim()).where((l) => l.isNotEmpty).toList();
    
    // 1. Better price detection
    // Matches R$ 10,00, $10.00, 10,00, 1.250,99 etc.
    final priceRegex = RegExp(r'(?:R?\$?\s*)(\d{1,3}(?:\.\d{3})*,\d{2}|\d+[\.,]\d{2})');
    
    List<double> foundPrices = [];
    for (final line in lines) {
      final match = priceRegex.firstMatch(line);
      if (match != null) {
        String pStr = match.group(1)!;
        // Normalize: remove thousands dots, replace comma with dot
        pStr = pStr.replaceAll('.', '').replaceAll(',', '.');
        final pVal = double.tryParse(pStr);
        if (pVal != null) foundPrices.add(pVal);
      }
    }

    if (foundPrices.isNotEmpty) {
      // Usually the price of interest is the largest one found in a single product line
      // or the first one if it's a shelf tag.
      price = foundPrices.first;
      print('OCR Found Prices: $foundPrices -> Selected: $price');
    }

    // 2. Better name detection
    // We look for lines that look like product names:
    // - Long enough (> 3 chars)
    // - Not just numbers
    // - Not a price
    // - Not common receipt "noise"
    final noiseKeywords = ['CNPJ', 'IE', 'DATA', 'VALOR', 'PREÇO', 'TOTAL', 'ITEM', 'TOTAL', 'PAGAR'];
    
    for (final line in lines) {
      final cleanLine = line.toUpperCase();
      
      // Skip lines with too many numbers or symbols
      if (RegExp(r'\d{5,}').hasMatch(line)) continue; 
      
      // Skip if contains noise keywords
      bool isNoise = false;
      for (final kw in noiseKeywords) {
        if (cleanLine.contains(kw)) {
          isNoise = true;
          break;
        }
      }
      if (isNoise) continue;

      // Skip if it contains a price
      if (priceRegex.hasMatch(line)) continue;

      // First good-looking line is often the product name (in tags/receipts)
      if (line.length > 3) {
        name = line;
        break;
      }
    }

    print('OCR Final Guess - Name: $name, Price: $price');

    return {
      'name': name,
      'price': price,
    };
  }

  void dispose() {
    _textRecognizer.close();
  }
}
