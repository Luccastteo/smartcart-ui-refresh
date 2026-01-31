const GOOGLE_VISION_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY;
const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`;

/**
 * Converte URI de imagem para base64
 */
async function imageToBase64(uri: string): Promise<string> {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Extrai texto de uma imagem usando Google Cloud Vision API
 */
export async function extractTextFromImage(imageUri: string): Promise<string> {
    try {
        console.log('🔍 Iniciando OCR...');
        console.log('🔑 API Key:', GOOGLE_VISION_API_KEY ? 'Configurada ✅' : 'NÃO CONFIGURADA ❌');

        // Converter imagem para base64
        const base64 = await imageToBase64(imageUri);
        console.log('📤 Base64 gerado, tamanho:', base64.length);
        console.log('📤 Enviando para Google Vision API...');

        // Chamar Google Vision API
        const response = await fetch(VISION_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requests: [
                    {
                        image: { content: base64 },
                        features: [{ type: 'TEXT_DETECTION', maxResults: 10 }]
                    }
                ]
            })
        });

        const data = await response.json();
        console.log('📥 Status HTTP:', response.status);
        console.log('📥 Resposta completa:', JSON.stringify(data, null, 2));

        // Verificar se há erro da API
        if (data.responses && data.responses[0].error) {
            console.error('❌ Erro da Google Vision API:', data.responses[0].error);
            throw new Error(`Google Vision API Error: ${data.responses[0].error.message}`);
        }

        if (data.responses && data.responses[0].textAnnotations) {
            const detections = data.responses[0].textAnnotations;
            const fullText = detections[0].description;
            console.log('✅ Texto extraído:', fullText);
            return fullText;
        }

        console.log('⚠️ Nenhuma anotação de texto encontrada na resposta');
        throw new Error('Nenhum texto detectado na imagem');
    } catch (error) {
        console.error('❌ Erro no OCR:', error);
        throw error;
    }
}

/**
 * Extrai nome e preço do produto a partir do texto OCR
 */
export function parseProductInfo(text: string): { name: string; price: number } {
    console.log('🔍 Parseando texto:', text);

    // Extrair preço (formatos: R$ 10,30 ou 10,30 ou R$10.30)
    const priceRegex = /R?\$?\s*(\d+)[,.](\d{2})/;
    const priceMatch = text.match(priceRegex);

    let price = 0;
    if (priceMatch) {
        price = parseFloat(`${priceMatch[1]}.${priceMatch[2]}`);
        console.log('💰 Preço encontrado:', price);
    } else {
        console.log('⚠️ Preço não encontrado, usando 0');
    }

    // Extrair nome do produto
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    let name = 'Produto';

    // Pegar primeira linha que não seja preço e tenha mais de 3 caracteres
    for (const line of lines) {
        const cleanLine = line.trim();
        if (!cleanLine.match(priceRegex) && cleanLine.length > 3) {
            name = cleanLine;
            console.log('📦 Nome encontrado:', name);
            break;
        }
    }

    return { name, price };
}
