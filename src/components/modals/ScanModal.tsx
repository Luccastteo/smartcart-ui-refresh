import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, X, Loader2 } from "lucide-react";
import { SmartModal } from "@/components/ui/SmartModal";

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductScanned: (product: { name: string; price: number; category: string }) => void;
}

const mockProducts = [
  { name: "Arroz Integral 1kg", price: 8.99, category: "Alimentos" },
  { name: "Feijão Preto 1kg", price: 7.49, category: "Alimentos" },
  { name: "Azeite Extra Virgem 500ml", price: 24.90, category: "Alimentos" },
  { name: "Leite Integral 1L", price: 5.99, category: "Laticínios" },
  { name: "Queijo Mussarela 200g", price: 12.80, category: "Laticínios" },
  { name: "Café 500g", price: 18.90, category: "Bebidas" },
  { name: "Sabonete Dove", price: 4.50, category: "Higiene" },
  { name: "Detergente 500ml", price: 2.99, category: "Limpeza" },
];

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  onProductScanned,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<typeof mockProducts[0] | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      setScannedProduct(randomProduct);
      setIsScanning(false);
    }, 2000);
  };

  const handleAddProduct = () => {
    if (scannedProduct) {
      onProductScanned(scannedProduct);
      setScannedProduct(null);
      onClose();
    }
  };

  const handleClose = () => {
    setScannedProduct(null);
    setIsScanning(false);
    onClose();
  };

  return (
    <SmartModal isOpen={isOpen} onClose={handleClose} title="Escanear Produto">
      <div className="space-y-6">
        {/* Área da Câmera */}
        <div className="relative aspect-[4/3] bg-black/80 rounded-card overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {isScanning ? (
              <div className="text-center">
                <div className="w-48 h-48 border-2 border-primary rounded-lg relative mb-4">
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-primary"
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">IA analisando...</span>
                </div>
              </div>
            ) : scannedProduct ? (
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Camera size={24} className="text-primary" />
                </div>
                <p className="text-lg font-medium text-foreground mb-1">
                  {scannedProduct.name}
                </p>
                <p className="text-2xl font-light text-primary">
                  R$ {scannedProduct.price.toFixed(2)}
                </p>
                <p className="text-caption text-text-muted mt-1">
                  {scannedProduct.category}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Camera size={48} strokeWidth={1} className="text-text-muted mx-auto mb-3" />
                <p className="text-sm text-text-muted">
                  Posicione o produto na câmera
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Botões */}
        {scannedProduct ? (
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setScannedProduct(null)}
              className="flex-1 btn-ghost border border-border"
            >
              Escanear Outro
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddProduct}
              className="flex-1 btn-lime"
            >
              Adicionar
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleScan}
            disabled={isScanning}
            className="btn-lime w-full flex items-center justify-center gap-2"
          >
            <Camera size={18} strokeWidth={1.5} />
            {isScanning ? "Escaneando..." : "Iniciar Escaneamento"}
          </motion.button>
        )}
      </div>
    </SmartModal>
  );
};
