import React from "react";

interface PillBadgeProps {
  children: React.ReactNode;
  variant?: "lime" | "danger" | "info" | "muted";
  className?: string;
}

export const PillBadge: React.FC<PillBadgeProps> = ({
  children,
  variant = "lime",
  className = "",
}) => {
  const variantClasses = {
    lime: "border-primary text-primary",
    danger: "bg-destructive/20 border-destructive/30 text-destructive",
    info: "border-info text-info",
    muted: "border-text-muted text-text-muted",
  };

  return (
    <span className={`pill-badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
