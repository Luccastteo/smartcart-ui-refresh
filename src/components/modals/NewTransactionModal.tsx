import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SmartModal } from "@/components/ui/SmartModal";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: {
    description: string;
    amount: number;
    type: "income" | "expense";
    category: string;
  }) => void;
}

const categories = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Outros",
];

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSave = () => {
    if (description.trim() && amount) {
      onSave({
        description: description.trim(),
        amount: parseFloat(amount),
        type,
        category,
      });
      setDescription("");
      setAmount("");
      setType("expense");
      setCategory(categories[0]);
      onClose();
    }
  };

  return (
    <SmartModal isOpen={isOpen} onClose={onClose} title="Nova Transação">
      <div className="space-y-4">
        {/* Tipo */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setType("expense")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-colors ${
              type === "expense"
                ? "border-destructive bg-destructive/10 text-destructive"
                : "border-border text-text-muted"
            }`}
          >
            <ArrowDownRight size={18} strokeWidth={1.5} />
            Saída
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setType("income")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-colors ${
              type === "income"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-text-muted"
            }`}
          >
            <ArrowUpRight size={18} strokeWidth={1.5} />
            Entrada
          </motion.button>
        </div>

        <div>
          <label className="text-caption text-text-muted uppercase tracking-wider block mb-2">
            Descrição
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Supermercado..."
            className="input-ios"
          />
        </div>

        <div>
          <label className="text-caption text-text-muted uppercase tracking-wider block mb-2">
            Valor
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              R$
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              className="input-ios pl-10"
            />
          </div>
        </div>

        <div>
          <label className="text-caption text-text-muted uppercase tracking-wider block mb-2">
            Categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={!description.trim() || !amount}
          className="btn-lime w-full disabled:opacity-50"
        >
          Adicionar
        </motion.button>
      </div>
    </SmartModal>
  );
};
