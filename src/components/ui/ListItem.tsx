import React from "react";
import { motion } from "framer-motion";
import { Check, Trash2 } from "lucide-react";

interface ListItemProps {
  title: string;
  subtitle?: string;
  price?: string;
  checked?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  showCheckbox?: boolean;
  showDelete?: boolean;
  leftIcon?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  price,
  checked = false,
  onToggle,
  onDelete,
  showCheckbox = false,
  showDelete = false,
  leftIcon,
  rightContent,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`list-item ${checked ? "opacity-60" : ""} ${className}`}
    >
      {showCheckbox && (
        <button
          onClick={onToggle}
          className={`checkbox-ios ${checked ? "checkbox-ios-checked" : ""}`}
        >
          {checked && <Check size={14} strokeWidth={2} className="text-primary-foreground" />}
        </button>
      )}

      {leftIcon && <div className="flex-shrink-0">{leftIcon}</div>}

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-normal ${checked ? "line-through" : ""} truncate`}>
          {title}
        </p>
        {subtitle && (
          <p className="text-caption text-text-muted truncate">{subtitle}</p>
        )}
      </div>

      {price && (
        <p className={`text-sm ${checked ? "text-text-muted" : "text-text-secondary"}`}>
          {price}
        </p>
      )}

      {rightContent}

      {showDelete && onDelete && (
        <button
          onClick={onDelete}
          className="p-2 text-destructive/70 active:text-destructive transition-colors"
        >
          <Trash2 size={18} strokeWidth={1.5} />
        </button>
      )}
    </motion.div>
  );
};
