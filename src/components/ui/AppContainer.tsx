import React from "react";
import { motion } from "framer-motion";

interface AppContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const AppContainer: React.FC<AppContainerProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen bg-background pb-20 safe-area-inset-top ${className}`}
    >
      {children}
    </motion.div>
  );
};
