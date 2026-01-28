import React from "react";
import { motion } from "framer-motion";
import { Plus, Check, Building2, Sparkles } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { CardSurface } from "@/components/ui/CardSurface";
import { PillBadge } from "@/components/ui/PillBadge";
import { IconButton } from "@/components/ui/IconButton";
import { AppContainer } from "@/components/ui/AppContainer";

interface BankAccount {
  id: string;
  name: string;
  balance: number;
  connected: boolean;
  logo?: string;
}

interface WalletScreenProps {
  totalBalance: number;
  accounts: BankAccount[];
  isPro: boolean;
  onConnectBank: () => void;
  onSubscribePro: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  totalBalance,
  accounts,
  isPro,
  onConnectBank,
  onSubscribePro,
}) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const connectedAccounts = accounts.filter((a) => a.connected);

  return (
    <AppContainer>
      <Header
        title="Carteira"
        rightActions={
          <PillBadge variant="info">Open Finance</PillBadge>
        }
      />

      <div className="px-4 space-y-4">
        {/* Hero Card Saldo Consolidado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CardSurface variant="hero" className="p-5">
            <p className="text-sm text-primary-foreground/80 mb-1">
              Saldo Consolidado
            </p>
            <p className="text-[32px] font-light text-primary-foreground">
              {formatCurrency(totalBalance)}
            </p>
            <p className="text-caption text-primary-foreground/60 mt-2">
              {connectedAccounts.length} conta{connectedAccounts.length !== 1 ? "s" : ""} conectada{connectedAccounts.length !== 1 ? "s" : ""}
            </p>
          </CardSurface>
        </motion.div>

        {/* Seção Contas */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Contas</h3>
            <button
              onClick={onConnectBank}
              className="flex items-center gap-1 text-sm text-primary font-medium active:opacity-70"
            >
              <Plus size={14} strokeWidth={1.5} />
              Conectar
            </button>
          </div>

          {connectedAccounts.length === 0 ? (
            <CardSurface className="text-center py-8">
              <Building2
                size={40}
                strokeWidth={1}
                className="text-text-muted mx-auto mb-3"
              />
              <p className="text-sm text-text-secondary mb-1">
                Nenhuma conta conectada
              </p>
              <p className="text-caption text-text-muted mb-4">
                Conecte seus bancos para ver tudo em um só lugar
              </p>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onConnectBank}
                className="btn-outline-lime mx-auto"
              >
                Conectar Banco
              </motion.button>
            </CardSurface>
          ) : (
            <div className="space-y-2">
              {connectedAccounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="list-item"
                >
                  <div className="w-10 h-10 rounded-icon bg-muted flex items-center justify-center">
                    <Building2 size={18} strokeWidth={1.5} className="text-text-secondary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-normal">{account.name}</p>
                    <div className="flex items-center gap-1">
                      <Check size={12} className="text-primary" />
                      <span className="text-caption text-primary">Conectado</span>
                    </div>
                  </div>

                  <span className="text-sm font-medium">
                    {formatCurrency(account.balance)}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Card Assinar PRO */}
        {!isPro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CardSurface className="border-primary/30 gradient-lime-subtle">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-icon bg-primary/20 flex items-center justify-center">
                  <Sparkles size={18} strokeWidth={1.5} className="text-primary" />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-1">Assine o SmartCart PRO</h4>
                  <p className="text-caption text-text-secondary mb-3">
                    Desbloqueie recursos avançados: IA para preços, metas ilimitadas,
                    Open Finance e mais.
                  </p>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onSubscribePro}
                    className="btn-lime w-full"
                  >
                    Assinar PRO
                  </motion.button>
                </div>
              </div>
            </CardSurface>
          </motion.div>
        )}
      </div>
    </AppContainer>
  );
};
