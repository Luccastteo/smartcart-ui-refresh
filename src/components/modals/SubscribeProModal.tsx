import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, Zap, Target, Building2 } from "lucide-react";
import { SmartModal } from "@/components/ui/SmartModal";

interface SubscribeProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const features = [
  { icon: Zap, text: "IA avançada para reconhecimento de preços" },
  { icon: Target, text: "Metas de economia ilimitadas" },
  { icon: Building2, text: "Open Finance - conecte todos seus bancos" },
  { icon: Check, text: "Exportação de relatórios em CSV/JSON" },
  { icon: Sparkles, text: "Insights personalizados de economia" },
];

export const SubscribeProModal: React.FC<SubscribeProModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
}) => {
  return (
    <SmartModal isOpen={isOpen} onClose={onClose} title="SmartCart PRO">
      <div className="space-y-6">
        {/* Header com gradiente */}
        <div className="card-hero p-6 text-center -mx-4 -mt-4 rounded-t-none">
          <Sparkles
            size={40}
            strokeWidth={1.5}
            className="text-primary-foreground mx-auto mb-3"
          />
          <h3 className="text-xl font-medium text-primary-foreground mb-1">
            Desbloqueie o SmartCart PRO
          </h3>
          <p className="text-sm text-primary-foreground/80">
            Tenha controle total das suas finanças
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-icon bg-primary/20 flex items-center justify-center flex-shrink-0">
                <feature.icon size={16} strokeWidth={1.5} className="text-primary" />
              </div>
              <span className="text-sm text-text-secondary">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Preço */}
        <div className="text-center py-4 border-y border-border">
          <p className="text-caption text-text-muted mb-1">Por apenas</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-light text-foreground">R$ 19,90</span>
            <span className="text-sm text-text-muted">/mês</span>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSubscribe}
          className="btn-lime w-full py-4 text-base"
        >
          Assinar PRO
        </motion.button>

        <p className="text-caption text-text-muted text-center">
          Cancele a qualquer momento. Sem compromisso.
        </p>
      </div>
    </SmartModal>
  );
};
