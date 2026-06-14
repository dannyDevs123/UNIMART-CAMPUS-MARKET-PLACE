import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Lock,
  Truck,
  Zap,
  Eye,
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { products } from '../data/products';

interface EscrowOrder {
  id: string;
  product: typeof products[0];
  status: 'payment_pending' | 'in_escrow' | 'shipped' | 'inspection' | 'completed' | 'disputed';
  statusLabel: string;
  date: string;
  total: number;
  timeline: { label: string; time: string; completed: boolean }[];
}

const mockOrders: EscrowOrder[] = [
  {
    id: 'ESC-2024-001',
    product: products[0],
    status: 'inspection',
    statusLabel: 'Inspection Period',
    date: '2024-01-15',
    total: 5200,
    timeline: [
      { label: 'Payment sent', time: 'Jan 15, 10:30 AM', completed: true },
      { label: 'Funds in escrow', time: 'Jan 15, 10:35 AM', completed: true },
      { label: 'Seller shipped', time: 'Jan 16, 2:00 PM', completed: true },
      { label: 'Inspect item', time: 'Due Jan 18', completed: false },
      { label: 'Release funds', time: 'Pending', completed: false },
    ],
  },
  {
    id: 'ESC-2024-002',
    product: products[5],
    status: 'in_escrow',
    statusLabel: 'In Escrow',
    date: '2024-01-17',
    total: 180,
    timeline: [
      { label: 'Payment sent', time: 'Jan 17, 9:00 AM', completed: true },
      { label: 'Funds in escrow', time: 'Jan 17, 9:05 AM', completed: true },
      { label: 'Seller shipped', time: 'Pending', completed: false },
      { label: 'Inspect item', time: 'Pending', completed: false },
      { label: 'Release funds', time: 'Pending', completed: false },
    ],
  },
];

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  payment_pending: { color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
  in_escrow: { color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Lock },
  shipped: { color: 'text-blue-600', bg: 'bg-blue-50', icon: Truck },
  inspection: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Eye },
  completed: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
  disputed: { color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle },
};

const wishlistItems = [products[2], products[7], products[10]];

const quickStats = [
  { label: 'Active Orders', value: '2', icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Wishlist', value: '8', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
  { label: 'Saved Searches', value: '3', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout type="buyer">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">My Dashboard</h1>
        <p className="text-on-surface-variant mt-1">Manage your purchases and escrow transactions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-premium border border-outline-variant/10"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 border border-outline-variant/20 mb-6 w-fit">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'orders'
              ? 'bg-primary text-white shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          My Orders
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'wishlist'
              ? 'bg-primary text-white shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Wishlist
        </button>
      </div>

      {activeTab === 'orders' ? (
        <div className="space-y-6">
          {/* Active Escrow Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary rounded-2xl p-6 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">You have an item to inspect</h3>
                <p className="text-sm text-white/70 mt-0.5">
                  iPhone 13 Pro - Inspection window closes in 18 hours
                </p>
              </div>
              <button className="ml-auto px-5 py-2.5 bg-white text-primary rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors">
                Inspect Now
              </button>
            </div>
          </motion.div>

          {/* Orders List */}
          {mockOrders.map((order, i) => {
            const status = statusConfig[order.status];
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-premium border border-outline-variant/10 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-outline-variant/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
                        <img
                          src={order.product.image}
                          alt={order.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-on-surface-variant mb-0.5">{order.id}</p>
                        <Link
                          to={`/product/${order.product.id}`}
                          className="font-semibold text-on-surface hover:text-primary transition-colors"
                        >
                          {order.product.title}
                        </Link>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                            <status.icon size={12} />
                            {order.statusLabel}
                          </span>
                          <span className="text-xs text-on-surface-variant">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {order.status === 'inspection' && (
                        <>
                          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-white border border-outline-variant text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-low transition-colors">
                            Report Issue
                          </button>
                        </>
                      )}
                      {order.status === 'in_escrow' && (
                        <button className="px-4 py-2 bg-white border border-outline-variant text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-low transition-colors">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-6">
                  <div className="flex items-center justify-between relative">
                    {/* Progress line */}
                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-surface-container-high">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${
                            (order.timeline.filter((t) => t.completed).length /
                              order.timeline.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>

                    {order.timeline.map((step, idx) => (
                      <div key={step.label} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            step.completed
                              ? 'bg-primary border-primary text-white'
                              : 'bg-white border-outline-variant text-outline'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <span className="text-xs">{idx + 1}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-on-surface-variant mt-2 text-center max-w-[60px]">
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Wishlist */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-premium border border-outline-variant/10 group"
            >
              <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm text-on-surface line-clamp-1 hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-primary mt-1">
                  {formatPrice(product.price)}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-container transition-colors">
                    Buy Now
                  </button>
                  <button className="p-2.5 border border-outline-variant rounded-xl text-on-surface-variant hover:text-error hover:border-error transition-colors">
                    <Heart size={16} className="fill-error text-error" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
