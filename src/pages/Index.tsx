import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Navigation
import { TabBar } from "@/components/navigation/TabBar";

// Screens
import { HomeScreen } from "@/screens/HomeScreen";
import { ListScreen } from "@/screens/ListScreen";
import { CartScreen } from "@/screens/CartScreen";
import { FinancesScreen } from "@/screens/FinancesScreen";
import { WalletScreen } from "@/screens/WalletScreen";

// Modals
import { ScanModal } from "@/components/modals/ScanModal";
import { NewGoalModal } from "@/components/modals/NewGoalModal";
import { NewTransactionModal } from "@/components/modals/NewTransactionModal";
import { ConnectBankModal } from "@/components/modals/ConnectBankModal";
import { SubscribeProModal } from "@/components/modals/SubscribeProModal";
import { ExportModal } from "@/components/modals/ExportModal";

// Types
interface ShoppingListItem {
  id: string;
  name: string;
  estimatedPrice?: number;
  checked: boolean;
}

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  progress: number;
  variant: "lime" | "blue";
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface BankAccount {
  id: string;
  name: string;
  balance: number;
  connected: boolean;
}

// Mock Data
const initialShoppingList: ShoppingListItem[] = [
  { id: "1", name: "Arroz Integral 1kg", estimatedPrice: 8.99, checked: false },
  { id: "2", name: "Feijão Preto 1kg", estimatedPrice: 7.49, checked: false },
  { id: "3", name: "Azeite Extra Virgem", estimatedPrice: 24.90, checked: true },
];

const initialCart: CartItem[] = [];

const initialGoals: Goal[] = [
  { id: "1", name: "Emergência", current: 2500, target: 5000, progress: 50, variant: "lime" },
  { id: "2", name: "Viagem", current: 1200, target: 8000, progress: 15, variant: "blue" },
];

const initialTransactions: Transaction[] = [
  { id: "1", description: "Salário", amount: 3500, type: "income", category: "Trabalho", date: "Hoje" },
  { id: "2", description: "Supermercado", amount: 245.50, type: "expense", category: "Alimentação", date: "Ontem" },
  { id: "3", description: "Uber", amount: 32.90, type: "expense", category: "Transporte", date: "Ontem" },
  { id: "4", description: "Netflix", amount: 45.90, type: "expense", category: "Lazer", date: "23/01" },
];

const categorySpends = [
  { name: "Alimentação", amount: 580, percentage: 45, color: "#a3e635" },
  { name: "Transporte", amount: 320, percentage: 25, color: "#60a5fa" },
  { name: "Lazer", amount: 200, percentage: 15, color: "#f87171" },
  { name: "Outros", amount: 190, percentage: 15, color: "#737373" },
];

const Index = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState("home");

  // Modal States
  const [showScanModal, setShowScanModal] = useState(false);
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [showConnectBankModal, setShowConnectBankModal] = useState(false);
  const [showSubscribeProModal, setShowSubscribeProModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Data States
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(initialShoppingList);
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [isPro, setIsPro] = useState(false);

  // Computed Values
  const balance = 3175.60;
  const income = 3500.00;
  const expenses = 324.40;
  const budget = 500;
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalBankBalance = bankAccounts.reduce((acc, a) => acc + a.balance, 0) || balance;

  // Shopping List Handlers
  const handleAddListItem = (name: string) => {
    const newItem: ShoppingListItem = {
      id: Date.now().toString(),
      name,
      estimatedPrice: Math.random() * 20 + 5,
      checked: false,
    };
    setShoppingList([...shoppingList, newItem]);
    toast.success("Item adicionado à lista");
  };

  const handleToggleListItem = (id: string) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDeleteListItem = (id: string) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  // Cart Handlers
  const handleProductScanned = (product: { name: string; price: number; category: string }) => {
    const existingItem = cart.find((item) => item.name === product.name);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.success("Item removido");
  };

  const handleFinalizeCart = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description: "Compras no Supermercado",
      amount: total,
      type: "expense",
      category: "Alimentação",
      date: "Hoje",
    };
    setTransactions([newTransaction, ...transactions]);
    setCart([]);
    toast.success("Compra finalizada!");
  };

  // Goal Handlers
  const handleAddGoal = (goal: { name: string; target: number }) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: goal.name,
      current: 0,
      target: goal.target,
      progress: 0,
      variant: goals.length % 2 === 0 ? "lime" : "blue",
    };
    setGoals([...goals, newGoal]);
    toast.success("Meta criada!");
  };

  // Transaction Handlers
  const handleAddTransaction = (tx: {
    description: string;
    amount: number;
    type: "income" | "expense";
    category: string;
  }) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description: tx.description,
      amount: tx.amount,
      type: tx.type,
      category: tx.category,
      date: "Hoje",
    };
    setTransactions([newTransaction, ...transactions]);
    toast.success("Transação adicionada!");
  };

  // Bank Handlers
  const handleConnectBank = (bankId: string) => {
    const bankNames: Record<string, string> = {
      nubank: "Nubank",
      itau: "Itaú",
      bradesco: "Bradesco",
      santander: "Santander",
      bb: "Banco do Brasil",
      caixa: "Caixa Econômica",
      inter: "Banco Inter",
      c6: "C6 Bank",
    };

    const newAccount: BankAccount = {
      id: bankId,
      name: bankNames[bankId] || bankId,
      balance: Math.random() * 5000 + 500,
      connected: true,
    };

    setBankAccounts([...bankAccounts, newAccount]);
    setShowConnectBankModal(false);
    toast.success(`${newAccount.name} conectado!`);
  };

  // Export Handler
  const handleExport = (format: "csv" | "json") => {
    toast.success(`Exportando como ${format.toUpperCase()}...`);
    setShowExportModal(false);
  };

  // Pro Handler
  const handleSubscribePro = () => {
    setIsPro(true);
    setShowSubscribeProModal(false);
    toast.success("Bem-vindo ao SmartCart PRO! 🎉");
  };

  // Render Screen based on active tab
  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            balance={balance}
            income={income}
            expenses={expenses}
            goals={goals.map((g) => ({
              id: g.id,
              name: g.name,
              progress: g.progress,
              variant: g.variant,
            }))}
            shoppingListPreview={shoppingList.slice(0, 3)}
            shoppingListTotal={{
              completed: shoppingList.filter((i) => i.checked).length,
              total: shoppingList.length,
            }}
            cartTotal={cartTotal}
            onScan={() => setShowScanModal(true)}
            onGoToCart={() => setActiveTab("cart")}
            onGoToList={() => setActiveTab("list")}
            onAddGoal={() => setShowNewGoalModal(true)}
          />
        );
      case "list":
        return (
          <ListScreen
            items={shoppingList}
            onAddItem={handleAddListItem}
            onToggleItem={handleToggleListItem}
            onDeleteItem={handleDeleteListItem}
          />
        );
      case "cart":
        return (
          <CartScreen
            items={cart}
            budget={budget}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onExport={() => setShowExportModal(true)}
            onScan={() => setShowScanModal(true)}
            onFinalize={handleFinalizeCart}
          />
        );
      case "finances":
        return (
          <FinancesScreen
            balance={balance}
            income={income}
            expenses={expenses}
            transactions={transactions}
            categorySpends={categorySpends}
            goals={goals}
            onExport={() => setShowExportModal(true)}
            onAddTransaction={() => setShowNewTransactionModal(true)}
          />
        );
      case "wallet":
        return (
          <WalletScreen
            totalBalance={totalBankBalance}
            accounts={bankAccounts}
            isPro={isPro}
            onConnectBank={() => setShowConnectBankModal(true)}
            onSubscribePro={() => setShowSubscribeProModal(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>

      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={cart.length}
      />

      {/* Modals */}
      <ScanModal
        isOpen={showScanModal}
        onClose={() => setShowScanModal(false)}
        onProductScanned={handleProductScanned}
      />

      <NewGoalModal
        isOpen={showNewGoalModal}
        onClose={() => setShowNewGoalModal(false)}
        onSave={handleAddGoal}
      />

      <NewTransactionModal
        isOpen={showNewTransactionModal}
        onClose={() => setShowNewTransactionModal(false)}
        onSave={handleAddTransaction}
      />

      <ConnectBankModal
        isOpen={showConnectBankModal}
        onClose={() => setShowConnectBankModal(false)}
        onConnect={handleConnectBank}
      />

      <SubscribeProModal
        isOpen={showSubscribeProModal}
        onClose={() => setShowSubscribeProModal(false)}
        onSubscribe={handleSubscribePro}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default Index;
