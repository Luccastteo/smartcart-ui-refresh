import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SmartModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showHandle?: boolean;
  showClose?: boolean;
}

export const SmartModal: React.FC<SmartModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showHandle = true,
  showClose = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content"
          >
            {showHandle && <div className="modal-handle" />}

            {(title || showClose) && (
              <div className="flex items-center justify-between px-4 pb-4">
                {title && (
                  <h2 className="text-title-medium text-foreground">{title}</h2>
                )}
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-2 text-text-muted active:text-foreground transition-colors"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            )}

            <div className="px-4 pb-8">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
