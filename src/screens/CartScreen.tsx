import React from "react";
import { motion } from "framer-motion";
import { Download, Trash2, Camera } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { CardSurface } from "@/components/ui/CardSurface";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuantityControl } from "@/components/ui/QuantityControl";
import { FabButton } from "@/components/ui/FabButton";
import { IconButton } from "@/components/ui/IconButton";
import { AppContainer } from "@/components/ui/AppContainer";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface CartScreenProps {
  items: CartItem[];
  budget: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onExport: () => void;
  onScan: () => void;
  onFinalize: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  budget,
  onUpdateQuantity,
  onRemoveItem,
  onExport,
  onScan,
  onFinalize,
}) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const budgetPercentage = budget > 0 ? (total / budget) * 100 : 0;
  const isOverBudget = budgetPercentage > 100;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <AppContainer>
      <Header
        title="Carrinho"
        rightActions={
          <IconButton icon={Download} onClick={onExport} />
        }
      />

      <div className="px-4 space-y-4">
        {/* Card Orçamento */}
        <CardSurface>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Orçamento</span>
            <span
              className={`text-sm font-medium ${
                isOverBudget ? "text-destructive" : "text-primary"
              }`}
            >
              {Math.round(budgetPercentage)}%
            </span>
          </div>
          <ProgressBar
            progress={Math.min(budgetPercentage, 100)}
            variant={isOverBudget ? "danger" : "lime"}
            height="md"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-caption text-text-muted">
              {formatCurrency(total)} de {formatCurrency(budget)}
            </span>
          </div>
        </CardSurface>

        {/* Lista de Itens */}
        <div className="space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="list-item"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-normal truncate">{item.name}</p>
                <p className="text-caption text-text-muted">{item.category}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </span>

                <QuantityControl
                  quantity={item.quantity}
                  onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
                />

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 text-destructive/60 active:text-destructive transition-colors"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Card Total */}
        {items.length > 0 && (
          <CardSurface className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Total</span>
              <span className="text-xl font-medium text-primary">
                {formatCurrency(total)}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onFinalize}
              className="btn-lime w-full"
            >
              Finalizar Compra
            </motion.button>
          </CardSurface>
        )}

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">Seu carrinho está vazio</p>
            <p className="text-caption text-text-subtle mt-1">
              Escaneie produtos para adicionar
            </p>
          </div>
        )}
      </div>

      <FabButton icon={Camera} onClick={onScan} />
    </AppContainer>
  );
};
