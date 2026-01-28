import React from "react";
import { motion } from "framer-motion";
import { Building2, Check, X } from "lucide-react";
import { SmartModal } from "@/components/ui/SmartModal";

interface ConnectBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (bankId: string) => void;
}

const banks = [
  { id: "nubank", name: "Nubank", connected: false },
  { id: "itau", name: "Itaú", connected: false },
  { id: "bradesco", name: "Bradesco", connected: false },
  { id: "santander", name: "Santander", connected: false },
  { id: "bb", name: "Banco do Brasil", connected: false },
  { id: "caixa", name: "Caixa Econômica", connected: false },
  { id: "inter", name: "Banco Inter", connected: false },
  { id: "c6", name: "C6 Bank", connected: false },
];

export const ConnectBankModal: React.FC<ConnectBankModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  return (
    <SmartModal isOpen={isOpen} onClose={onClose} title="Conectar Banco">
      <div className="space-y-4">
        <p className="text-sm text-text-secondary">
          Conecte suas contas bancárias via Open Finance para consolidar seus
          saldos automaticamente.
        </p>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar">
          {banks.map((bank, index) => (
            <motion.button
              key={bank.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onConnect(bank.id)}
              className="list-item w-full text-left"
            >
              <div className="w-10 h-10 rounded-icon bg-muted flex items-center justify-center">
                <Building2 size={18} strokeWidth={1.5} className="text-text-secondary" />
              </div>

              <span className="flex-1 text-sm">{bank.name}</span>

              {bank.connected ? (
                <div className="flex items-center gap-1 text-primary">
                  <Check size={16} strokeWidth={1.5} />
                  <span className="text-caption">Conectado</span>
                </div>
              ) : (
                <span className="text-caption text-text-muted">Conectar</span>
              )}
            </motion.button>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-caption text-text-muted text-center">
            Suas credenciais são protegidas via Open Finance.
            <br />
            Nunca armazenamos suas senhas.
          </p>
        </div>
      </div>
    </SmartModal>
  );
};
