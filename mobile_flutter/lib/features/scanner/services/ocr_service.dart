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
      final matches = priceRegex.allMatches(line);
      for (final match in matches) {
        String pStr = match.group(1)!;
        // Normalize: remove thousands dots, replace comma with dot
        pStr = pStr.replaceAll('.', '').replaceAll(',', '.');
        final pVal = double.tryParse(pStr);
        if (pVal != null && pVal > 0) foundPrices.add(pVal);
      }
    }

    if (foundPrices.isNotEmpty) {
      // Find the most likely price (often the largest or the first if it's a tag)
      price = foundPrices.first;
      print('OCR Found Prices: $foundPrices -> Selected: $price');
    }

    // 2. Better name detection
    final noiseKeywords = [
      'CNPJ', 'IE', 'DATA', 'VALOR', 'PREÇO', 'TOTAL', 'ITEM', 'PAGAR', 'CUPOM', 'FISCAL',
      'OBRIGADO', 'VOLTE', 'SEMPRE', 'CLIENTE', 'ENDEREÇO', 'TEL:', 'CONTRIBUINTE'
    ];
    
    for (final line in lines) {
      final cleanLine = line.trim();
      if (cleanLine.length < 3) continue;
      
      final upperLine = cleanLine.toUpperCase();
      
      // Skip if it's just numbers (like codes or dates)
      if (RegExp(r'^\d+[\d\s\-\/\.]*$').hasMatch(cleanLine)) continue;
      
      // Skip if contains noise keywords
      bool isNoise = false;
      for (final kw in noiseKeywords) {
        if (upperLine.contains(kw)) {
          isNoise = true;
          break;
        }
      }
      if (isNoise) continue;

      // Skip lines that are likely just prices
      if (priceRegex.hasMatch(cleanLine)) continue;

      // The first "clean" line is usually the product name
      name = cleanLine;
      break;
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
