import * as SecureStore from 'expo-secure-store';

// MOCK DATA for Demo Mode
const MOCK_LISTS = [
    { id: '1', title: 'Compras do Mês', createdAt: new Date().toISOString(), items: [] },
    { id: '2', title: 'Churrasco Fim de Ano', createdAt: new Date().toISOString(), items: [] }
];

const MOCK_TRANSACTIONS = [
    { id: '1', description: 'Salário', amount: 5000, type: 'IN', date: new Date().toISOString() },
    { id: '2', description: 'Supermercado', amount: 450.50, type: 'OUT', date: new Date().toISOString() }
];

export const api = {
    // Lists
    getLists: async () => {
        return MOCK_LISTS;
    },
    createList: async (title: string) => {
        const newList = { id: Math.random().toString(), title, createdAt: new Date().toISOString(), items: [] };
        MOCK_LISTS.push(newList); // Add to mock array so it persists
        return newList;
    },

    // Products (Scanner)
    getProduct: async (barcode: string) => {
        // Mock product lookup
        if (barcode === '7891000053508') return { name: 'Coca-Cola 2L', price: 9.99 };
        return { name: 'Produto Exemplo', price: 15.50 };
    },

    // Finances
    getBalance: async () => {
        return { balance: 4549.50 };
    },
    getTransactions: async () => {
        return MOCK_TRANSACTIONS;
    },
};
