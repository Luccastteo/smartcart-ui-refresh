import React from "react";
import { motion } from "framer-motion";
import { Home, ListTodo, ShoppingCart, PieChart, Wallet, LucideIcon } from "lucide-react";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
}

interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const tabs: TabItem[] = [
  { id: "home", label: "Início", icon: Home },
  { id: "list", label: "Lista", icon: ListTodo },
  { id: "cart", label: "Carrinho", icon: ShoppingCart },
  { id: "finances", label: "Finanças", icon: PieChart },
  { id: "wallet", label: "Carteira", icon: Wallet },
];

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  cartCount = 0,
}) => {
  return (
    <nav className="tab-bar">
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(tab.id)}
              className={`tab-item ${isActive ? "tab-item-active" : ""} relative`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={1.5} />
                {tab.id === "cart" && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive 
                                 text-white text-[10px] font-medium rounded-full 
                                 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-normal">{tab.label}</span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 
                           rounded-full bg-primary"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
