import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center
                   text-text-secondary disabled:opacity-40 transition-colors
                   active:bg-card"
      >
        <Minus size={14} strokeWidth={1.5} />
      </motion.button>

      <span className="w-8 text-center text-sm font-medium">{quantity}</span>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center
                   text-primary-foreground disabled:opacity-40 transition-colors"
      >
        <Plus size={14} strokeWidth={1.5} />
      </motion.button>
    </div>
  );
};
