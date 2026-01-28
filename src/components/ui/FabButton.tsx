import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FabButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export const FabButton: React.FC<FabButtonProps> = ({
  icon: Icon,
  onClick,
  className = "",
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`fab ${className}`}
    >
      <Icon size={24} strokeWidth={1.5} />
    </motion.button>
  );
};
