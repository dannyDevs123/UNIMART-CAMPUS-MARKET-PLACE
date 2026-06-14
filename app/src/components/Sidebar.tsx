import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Receipt,
  MessageSquare,
  Settings,
  Shield,
  LogOut,
  GraduationCap,
  Gavel,
  Truck,
  AlertTriangle,
} from 'lucide-react';

interface SidebarProps {
  type: 'buyer' | 'seller' | 'admin';
}

const sidebarConfig = {
  buyer: {
    title: 'Student Hub',
    subtitle: 'Verified .edu account',
    links: [
      { href: '/buyer-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/marketplace', label: 'Browse', icon: ShoppingBag },
      { href: '#', label: 'Purchases', icon: Receipt },
      { href: '#', label: 'Messages', icon: MessageSquare, badge: 3 },
      { href: '#', label: 'Settings', icon: Settings },
    ],
  },
  seller: {
    title: 'Seller Hub',
    subtitle: 'Manage your listings',
    links: [
      { href: '/seller-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/marketplace', label: 'Browse', icon: ShoppingBag },
      { href: '#', label: 'My Listings', icon: Receipt },
      { href: '#', label: 'Messages', icon: MessageSquare, badge: 2 },
      { href: '#', label: 'Settings', icon: Settings },
    ],
  },
  admin: {
    title: 'UniMart Admin',
    subtitle: 'Operations Dashboard',
    links: [
      { href: '/admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '#', label: 'Inspections', icon: Gavel },
      { href: '#', label: 'Deliveries', icon: Truck },
      { href: '#', label: 'Transactions', icon: Receipt },
      { href: '#', label: 'Fraud Alerts', icon: AlertTriangle, badge: 2 },
      { href: '#', label: 'Settings', icon: Settings },
    ],
  },
};

export default function Sidebar({ type }: SidebarProps) {
  const location = useLocation();
  const config = sidebarConfig[type];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-outline-variant/30 z-40">
      {/* Header */}
      <div className="p-6 pb-4">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <GraduationCap size={18} />
          </div>
          <span className="text-lg font-bold text-primary">UniMart</span>
        </Link>
        <h2 className="font-semibold text-on-surface">{config.title}</h2>
        <p className="text-xs text-on-surface-variant mt-0.5">{config.subtitle}</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {config.links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.label}
              to={link.href}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${
                  isActive
                    ? 'bg-primary-container/15 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
              {link.badge && (
                <span className="ml-auto bg-error text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {link.badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-outline-variant/20 space-y-1">
        <Link
          to="#"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors"
        >
          <Shield size={18} />
          <span>Safety Center</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-error hover:bg-error-container/10 transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
