import React from "react";
import { motion } from "framer-motion";
import { Download, Plus, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { CardSurface } from "@/components/ui/CardSurface";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { IconButton } from "@/components/ui/IconButton";
import { AppContainer } from "@/components/ui/AppContainer";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface CategorySpend {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  progress: number;
}

interface FinancesScreenProps {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
  categorySpends: CategorySpend[];
  goals: Goal[];
  onExport: () => void;
  onAddTransaction: () => void;
}

export const FinancesScreen: React.FC<FinancesScreenProps> = ({
  balance,
  income,
  expenses,
  transactions,
  categorySpends,
  goals,
  onExport,
  onAddTransaction,
}) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <AppContainer>
      <Header
        title="Finanças"
        rightActions={
          <div className="flex gap-2">
            <IconButton icon={Download} onClick={onExport} />
            <IconButton icon={Plus} variant="lime" onClick={onAddTransaction} />
          </div>
        }
      />

      <div className="px-4 space-y-4">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-3 gap-2">
          <CardSurface className="text-center py-3 px-2">
            <p className="text-caption text-text-muted mb-1">Saldo</p>
            <p className="text-sm font-medium text-primary">
              {formatCurrency(balance)}
            </p>
          </CardSurface>

          <CardSurface className="text-center py-3 px-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ArrowUpRight size={12} className="text-primary" />
              <p className="text-caption text-text-muted">Entradas</p>
            </div>
            <p className="text-sm font-medium">{formatCurrency(income)}</p>
          </CardSurface>

          <CardSurface className="text-center py-3 px-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ArrowDownRight size={12} className="text-destructive" />
              <p className="text-caption text-text-muted">Saídas</p>
            </div>
            <p className="text-sm font-medium">{formatCurrency(expenses)}</p>
          </CardSurface>
        </div>

        {/* Gastos por Categoria */}
        <CardSurface>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} strokeWidth={1.5} className="text-text-secondary" />
            <h3 className="text-sm font-medium">Gastos por Categoria</h3>
          </div>

          <div className="space-y-3">
            {categorySpends.map((cat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{cat.name}</span>
                  <span className="text-caption text-text-muted">
                    {formatCurrency(cat.amount)}
                  </span>
                </div>
                <div className="category-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardSurface>

        {/* Metas */}
        <CardSurface>
          <h3 className="text-sm font-medium mb-4">Metas</h3>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{goal.name}</span>
                  <span className="text-caption text-text-muted">
                    {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                  </span>
                </div>
                <ProgressBar progress={goal.progress} />
              </div>
            ))}
          </div>
        </CardSurface>

        {/* Transações Recentes */}
        <div>
          <h3 className="text-sm font-medium mb-3">Transações Recentes</h3>
          <div className="space-y-2">
            {transactions.slice(0, 5).map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="list-item"
              >
                <div
                  className={`w-8 h-8 rounded-icon flex items-center justify-center ${
                    tx.type === "income"
                      ? "bg-primary/20"
                      : "bg-destructive/20"
                  }`}
                >
                  {tx.type === "income" ? (
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                  ) : (
                    <ArrowDownRight
                      size={16}
                      strokeWidth={1.5}
                      className="text-destructive"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{tx.description}</p>
                  <p className="text-caption text-text-muted">{tx.category}</p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      tx.type === "income" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {formatCurrency(Math.abs(tx.amount))}
                  </p>
                  <p className="text-caption text-text-muted">{tx.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppContainer>
  );
};
