import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
  type: 'buyer' | 'seller' | 'admin';
}

export default function DashboardLayout({ children, type }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar type={type} />
      <div className="md:ml-64 min-h-screen">
        <motion.main
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-8 max-w-7xl mx-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
