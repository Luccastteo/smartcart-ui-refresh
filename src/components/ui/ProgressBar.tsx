import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: "lime" | "blue" | "danger";
  height?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = "lime",
  height = "sm",
  showLabel = false,
  className = "",
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: "h-1",
    md: "h-2",
  };

  const colorClasses = {
    lime: "bg-primary",
    blue: "bg-info",
    danger: "bg-destructive",
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`progress-bar ${heightClasses[height]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`progress-bar-fill ${colorClasses[variant]}`}
        />
      </div>
      {showLabel && (
        <p className="text-caption text-text-muted mt-1">
          {Math.round(clampedProgress)}%
        </p>
      )}
    </div>
  );
};
