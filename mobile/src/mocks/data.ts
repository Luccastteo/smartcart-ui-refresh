// Mock data for products
export const MOCK_PRODUCTS = [
    { id: '1', name: 'Café Melitta 500g', price: 18.90, barcode: '7891234567890', category: 'Alimentos' },
    { id: '2', name: 'Leite Integral 1L', price: 4.50, barcode: '7891234567891', category: 'Laticínios' },
    { id: '3', name: 'Pão de Forma', price: 8.90, barcode: '7891234567892', category: 'Padaria' },
    { id: '4', name: 'Arroz Tipo 1 5kg', price: 24.90, barcode: '7891234567893', category: 'Alimentos' },
    { id: '5', name: 'Feijão Preto 1kg', price: 7.50, barcode: '7891234567894', category: 'Alimentos' },
];

// Mock data for payment methods
export const MOCK_PAYMENT_METHODS = [
    { id: 'pix', type: 'pix', title: 'PIX', subtitle: 'Pagamento instantâneo' },
    { id: 'card', type: 'card', title: 'Cartão de Crédito', subtitle: '**** **** **** 1234' },
    { id: 'bank', type: 'bank', title: 'Saldo Bancário', subtitle: 'Nubank - R$ 1.250,00' },
];
