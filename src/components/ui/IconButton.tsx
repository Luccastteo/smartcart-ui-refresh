import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "lime" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  badge?: number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  badge,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const variantClasses = {
    default: "icon-btn",
    lime: "icon-btn-lime",
    ghost: "flex items-center justify-center text-text-secondary transition-all duration-200 active:opacity-70",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className} relative`}
    >
      <Icon size={iconSizes[size]} strokeWidth={1.5} />
      {badge !== undefined && badge > 0 && (
        <span className="notification-badge">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </motion.button>
  );
};
