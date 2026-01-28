import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Camera, ShoppingCart, ChevronRight, Target } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { CardSurface } from "@/components/ui/CardSurface";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AppContainer } from "@/components/ui/AppContainer";

interface HomeScreenProps {
  balance: number;
  income: number;
  expenses: number;
  goals: Array<{
    id: string;
    name: string;
    progress: number;
    variant: "lime" | "blue";
  }>;
  shoppingListPreview: Array<{
    id: string;
    name: string;
    checked: boolean;
  }>;
  shoppingListTotal: { completed: number; total: number };
  cartTotal: number;
  onScan: () => void;
  onGoToCart: () => void;
  onGoToList: () => void;
  onAddGoal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  balance,
  income,
  expenses,
  goals,
  shoppingListPreview,
  shoppingListTotal,
  cartTotal,
  onScan,
  onGoToCart,
  onGoToList,
  onAddGoal,
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
        title="SmartCart"
        subtitle="Olá! 👋"
        showNotification
        notificationCount={2}
        showProBadge
      />

      <div className="px-4 space-y-4">
        {/* Hero Card - Saldo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CardSurface variant="hero" className="p-5">
            <p className="text-sm text-primary-foreground/80 mb-1">Saldo Atual</p>
            <p className="text-[32px] font-light text-primary-foreground mb-4">
              {formatCurrency(balance)}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <ArrowUpRight size={14} className="text-primary-foreground" />
                </div>
                <span className="text-sm text-primary-foreground/90">
                  {formatCurrency(income)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <ArrowDownRight size={14} className="text-primary-foreground" />
                </div>
                <span className="text-sm text-primary-foreground/90">
                  {formatCurrency(expenses)}
                </span>
              </div>
            </div>
          </CardSurface>
        </motion.div>

        {/* Metas de Economia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CardSurface>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={18} strokeWidth={1.5} className="text-text-secondary" />
                <h3 className="text-sm font-medium">Metas de Economia</h3>
              </div>
              <button
                onClick={onAddGoal}
                className="text-sm text-primary font-medium active:opacity-70"
              >
                + Nova
              </button>
            </div>

            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-text-secondary">{goal.name}</span>
                    <span className="text-caption text-text-muted">
                      {goal.progress}%
                    </span>
                  </div>
                  <ProgressBar progress={goal.progress} variant={goal.variant} />
                </div>
              ))}
            </div>
          </CardSurface>
        </motion.div>

        {/* Grid de Ações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <CardSurface variant="action" onClick={onScan}>
            <div className="w-12 h-12 rounded-icon bg-primary flex items-center justify-center mb-3">
              <Camera size={22} strokeWidth={1.5} className="text-primary-foreground" />
            </div>
            <h4 className="text-sm font-medium mb-0.5">Escanear</h4>
            <p className="text-caption text-text-muted">IA reconhece preços</p>
          </CardSurface>

          <CardSurface variant="action" onClick={onGoToCart}>
            <div className="w-12 h-12 rounded-icon bg-muted flex items-center justify-center mb-3">
              <ShoppingCart size={22} strokeWidth={1.5} className="text-text-secondary" />
            </div>
            <h4 className="text-sm font-medium mb-0.5">Carrinho</h4>
            <p className="text-caption text-text-muted">{formatCurrency(cartTotal)}</p>
          </CardSurface>
        </motion.div>

        {/* Preview Lista de Compras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CardSurface>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Lista de Compras</h3>
              <span className="text-caption text-primary">
                {shoppingListTotal.completed}/{shoppingListTotal.total}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              {shoppingListPreview.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-1.5"
                >
                  <div
                    className={`w-4 h-4 rounded border ${
                      item.checked
                        ? "bg-primary border-primary"
                        : "border-border"
                    } flex items-center justify-center`}
                  >
                    {item.checked && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        className="text-primary-foreground"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      item.checked ? "line-through text-text-muted" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={onGoToList}
              className="flex items-center gap-1 text-sm text-primary font-medium active:opacity-70"
            >
              Ver lista
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </CardSurface>
        </motion.div>
      </div>
    </AppContainer>
  );
};
