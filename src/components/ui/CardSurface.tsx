import React from "react";
import { motion } from "framer-motion";

interface CardSurfaceProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "hero" | "action";
}

export const CardSurface: React.FC<CardSurfaceProps> = ({
  children,
  className = "",
  onClick,
  variant = "default",
}) => {
  const baseClasses = {
    default: "card-surface p-4",
    hero: "card-hero p-5",
    action: "card-action",
  };

  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`${baseClasses[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
