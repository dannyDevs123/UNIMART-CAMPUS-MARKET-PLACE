import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Heart,
  Menu,
  X,
  ShieldCheck,
  User,
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  GraduationCap,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Browse' },
  { href: '/seller-dashboard', label: 'Sell' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/30 shadow-sm">
      <div className="max-w-container-max mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-xl font-bold text-primary">UniMart</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div
              className={`relative w-full transition-all duration-300 ${
                searchFocused ? 'scale-105' : ''
              }`}
            >
              <Search
                size={18}
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                  searchFocused ? 'text-primary' : 'text-outline'
                }`}
              />
              <input
                type="text"
                placeholder="Search textbooks, electronics..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 
                         rounded-full text-sm text-on-surface placeholder:text-outline
                         focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary-container/20
                         transition-all duration-300"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive(link.href)
                      ? 'text-primary bg-primary-container/10'
                      : 'text-on-surface-variant hover:text-primary hover:bg-primary-container/5'
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="hidden sm:flex p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-white" />
            </button>
            <button className="hidden sm:flex p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-full transition-colors">
              <Heart size={20} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative ml-1">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-1 pr-1 py-1 rounded-full hover:bg-primary-container/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-primary border border-primary-container/50 overflow-hidden">
                  <img
                    src="/images/avatars/kwame.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-outline-variant/30 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-outline-variant/20">
                        <p className="font-semibold text-sm text-on-surface">Kwame Asante</p>
                        <p className="text-xs text-on-surface-variant">kwame.asante@st.edu.gh</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/buyer-dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          My Dashboard
                        </Link>
                        <Link
                          to="/seller-dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                        >
                          <ShoppingBag size={16} />
                          Seller Hub
                        </Link>
                      </div>
                      <div className="border-t border-outline-variant/20 py-1 mt-1">
                        <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/10 w-full transition-colors">
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-outline-variant/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-primary-container/10'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-outline-variant/20 space-y-1">
                <Link
                  to="/buyer-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-low"
                >
                  <User size={16} />
                  My Account
                </Link>
                <Link
                  to="/admin-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-low"
                >
                  <ShieldCheck size={16} />
                  Admin Panel
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
