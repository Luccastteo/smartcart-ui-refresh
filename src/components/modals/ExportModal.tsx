import React from "react";
import { motion } from "framer-motion";
import { FileText, FileJson, X } from "lucide-react";
import { SmartModal } from "@/components/ui/SmartModal";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: "csv" | "json") => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
}) => {
  return (
    <SmartModal isOpen={isOpen} onClose={onClose} title="Exportar Dados">
      <div className="space-y-4">
        <p className="text-sm text-text-secondary">
          Escolha o formato para exportar seus dados.
        </p>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onExport("csv")}
          className="list-item w-full text-left"
        >
          <div className="w-10 h-10 rounded-icon bg-primary/20 flex items-center justify-center">
            <FileText size={18} strokeWidth={1.5} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Exportar CSV</p>
            <p className="text-caption text-text-muted">
              Compatível com Excel e Google Sheets
            </p>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onExport("json")}
          className="list-item w-full text-left"
        >
          <div className="w-10 h-10 rounded-icon bg-info/20 flex items-center justify-center">
            <FileJson size={18} strokeWidth={1.5} className="text-info" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Exportar JSON</p>
            <p className="text-caption text-text-muted">
              Para desenvolvedores e integrações
            </p>
          </div>
        </motion.button>
      </div>
    </SmartModal>
  );
};
