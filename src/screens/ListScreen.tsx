import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { CardSurface } from "@/components/ui/CardSurface";
import { AppContainer } from "@/components/ui/AppContainer";

interface ShoppingListItem {
  id: string;
  name: string;
  estimatedPrice?: number;
  checked: boolean;
}

interface ListScreenProps {
  items: ShoppingListItem[];
  onAddItem: (name: string) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export const ListScreen: React.FC<ListScreenProps> = ({
  items,
  onAddItem,
  onToggleItem,
  onDeleteItem,
}) => {
  const [newItemName, setNewItemName] = useState("");

  const pendingItems = items.filter((item) => !item.checked);
  const completedItems = items.filter((item) => item.checked);

  const totalEstimate = items
    .filter((i) => !i.checked)
    .reduce((acc, item) => acc + (item.estimatedPrice || 0), 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleAddItem = () => {
    if (newItemName.trim()) {
      onAddItem(newItemName.trim());
      setNewItemName("");
    }
  };

  return (
    <AppContainer>
      <Header
        title="Lista de Compras"
        rightActions={
          <span className="text-sm text-primary font-medium">
            {completedItems.length}/{items.length}
          </span>
        }
      />

      <div className="px-4 space-y-4">
        {/* Input para adicionar item */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            placeholder="Adicionar item..."
            className="input-ios flex-1"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddItem}
            className="icon-btn-lime"
          >
            <Plus size={20} strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* Itens Pendentes */}
        <div className="space-y-2">
          <AnimatePresence>
            {pendingItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="list-item"
              >
                <button
                  onClick={() => onToggleItem(item.id)}
                  className="checkbox-ios"
                >
                  {item.checked && (
                    <Check size={14} strokeWidth={2} className="text-primary-foreground" />
                  )}
                </button>
                <span className="flex-1 text-sm">{item.name}</span>
                {item.estimatedPrice !== undefined && (
                  <span className="text-sm text-text-muted">
                    {formatCurrency(item.estimatedPrice)}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Itens Concluídos */}
        {completedItems.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-caption text-text-muted uppercase tracking-wider">
              Concluídos ({completedItems.length})
            </h3>
            <AnimatePresence>
              {completedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="list-item"
                >
                  <button
                    onClick={() => onToggleItem(item.id)}
                    className="checkbox-ios checkbox-ios-checked"
                  >
                    <Check size={14} strokeWidth={2} className="text-primary-foreground" />
                  </button>
                  <span className="flex-1 text-sm line-through text-text-muted">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Card Estimativa */}
        <CardSurface className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Estimativa:</span>
          <span className="text-lg font-medium text-primary">
            {formatCurrency(totalEstimate)}
          </span>
        </CardSurface>
      </div>
    </AppContainer>
  );
};
