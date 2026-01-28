import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  notificationCount?: number;
  showProBadge?: boolean;
  rightActions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showNotification = false,
  notificationCount = 0,
  showProBadge = false,
  rightActions,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 pt-4 pb-2"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {subtitle && (
            <p className="text-text-muted text-sm mb-0.5">{subtitle}</p>
          )}
          <div className="flex items-center gap-2">
            <h1 className="text-title-large text-foreground">{title}</h1>
            {showProBadge && (
              <span className="pill-badge pill-lime">PRO</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rightActions}
          {showNotification && (
            <button className="icon-btn relative">
              <Bell size={20} strokeWidth={1.5} />
              {notificationCount > 0 && (
                <span className="notification-badge">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};
