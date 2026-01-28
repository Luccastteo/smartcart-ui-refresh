import React, { useState } from "react";
import { motion } from "framer-motion";
import { SmartModal } from "@/components/ui/SmartModal";

interface NewGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: { name: string; target: number }) => void;
}

export const NewGoalModal: React.FC<NewGoalModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  const handleSave = () => {
    if (name.trim() && target) {
      onSave({
        name: name.trim(),
        target: parseFloat(target),
      });
      setName("");
      setTarget("");
      onClose();
    }
  };

  return (
    <SmartModal isOpen={isOpen} onClose={onClose} title="Nova Meta">
      <div className="space-y-4">
        <div>
          <label className="text-caption text-text-muted uppercase tracking-wider block mb-2">
            Nome da Meta
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Viagem, Emergência..."
            className="input-ios"
          />
        </div>

        <div>
          <label className="text-caption text-text-muted uppercase tracking-wider block mb-2">
            Valor Alvo
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              R$
            </span>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="0,00"
              className="input-ios pl-10"
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={!name.trim() || !target}
          className="btn-lime w-full disabled:opacity-50"
        >
          Criar Meta
        </motion.button>
      </div>
    </SmartModal>
  );
};
