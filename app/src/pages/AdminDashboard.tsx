import { motion } from 'framer-motion';
import {
  AlertTriangle,
  DollarSign,
  Package,
  Clock,
  Gavel,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

// Stats data
const stats = [
  {
    label: 'Total Escrow Volume',
    value: 'GHS 142,500',
    change: '+12.5%',
    up: true,
    icon: DollarSign,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    label: 'Active Transactions',
    value: '342',
    change: '45 requiring action',
    up: true,
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Pending Inspections',
    value: '18',
    change: '3 high priority',
    up: false,
    icon: Gavel,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    label: 'Fraud Alerts',
    value: '2',
    change: 'Requires review',
    up: false,
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
];

// Recent transactions
const recentTxns = [
  { id: 'TXN-001', buyer: 'Kwame A.', seller: 'Abena M.', amount: 5200, status: 'in_escrow', date: 'Jan 15, 10:30 AM' },
  { id: 'TXN-002', buyer: 'Kofi O.', seller: 'Sarah J.', amount: 8500, status: 'completed', date: 'Jan 14, 3:45 PM' },
  { id: 'TXN-003', buyer: 'Efua B.', seller: 'Michael A.', amount: 450, status: 'disputed', date: 'Jan 14, 11:20 AM' },
  { id: 'TXN-004', buyer: 'Nana Y.', seller: 'Daniel O.', amount: 280, status: 'inspection', date: 'Jan 13, 9:15 AM' },
  { id: 'TXN-005', buyer: 'Grace A.', seller: 'Ama S.', amount: 180, status: 'completed', date: 'Jan 12, 4:00 PM' },
];

// Inspection queue
const inspections = [
  { id: 'INS-001', product: 'iPhone 13 Pro', seller: 'Kwame A.', buyer: 'Abena M.', amount: 5200, priority: 'high', status: 'awaiting_buyer', timeLeft: '18 hours' },
  { id: 'INS-002', product: 'MacBook Pro 14"', seller: 'Sarah J.', buyer: 'Kofi O.', amount: 8500, priority: 'high', status: 'awaiting_seller', timeLeft: '6 hours' },
  { id: 'INS-003', product: 'NutriBullet Pro', seller: 'Nana Y.', buyer: 'Grace A.', amount: 280, priority: 'normal', status: 'in_progress', timeLeft: '2 days' },
];

// Fraud alerts
const fraudAlerts = [
  { id: 'ALERT-001', type: 'Suspicious Payment', user: 'User_4821', desc: 'Multiple failed payment attempts from different cards', severity: 'high', time: '10 mins ago' },
  { id: 'ALERT-002', type: 'Account Takeover', user: 'User_2156', desc: 'Login from unusual location (Nigeria) after password change', severity: 'medium', time: '1 hour ago' },
];

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  in_escrow: { bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'In Escrow' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Completed' },
  disputed: { bg: 'bg-red-50', text: 'text-red-700', label: 'Disputed' },
  inspection: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Inspection' },
};

// Weekly volume chart
function VolumeChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const volumes = [8500, 12000, 6800, 15200, 18500, 14200, 9800];
  const maxVol = Math.max(...volumes);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-premium border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-on-surface">Weekly Escrow Volume</h3>
        <select className="text-sm text-on-surface-variant bg-surface-container-low rounded-lg px-3 py-1.5 border-none">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>
      <div className="flex items-end justify-between gap-2 h-40">
        {volumes.map((vol, i) => (
          <div key={days[i]} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(vol / maxVol) * 100}%` }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="w-full max-w-[40px] bg-primary-container/30 rounded-t-lg relative group cursor-pointer hover:bg-primary-container/50 transition-colors"
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                GHS {vol.toLocaleString()}
              </div>
            </motion.div>
            <span className="text-[10px] text-on-surface-variant">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout type="admin">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">Operations Dashboard</h1>
        <p className="text-on-surface-variant mt-1">Monitor escrow operations and platform health</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-premium border border-outline-variant/10"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                  stat.up ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-on-surface">{stat.value}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Volume Chart */}
          <VolumeChart />

          {/* Inspection Queue */}
          <div className="bg-white rounded-2xl shadow-premium border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gavel size={18} className="text-primary" />
                <h3 className="font-semibold text-on-surface">Inspection Queue</h3>
              </div>
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                {inspections.length} pending
              </span>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {inspections.map((ins, i) => (
                <motion.div
                  key={ins.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 hover:bg-surface-container-low/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-on-surface-variant">{ins.id}</span>
                        {ins.priority === 'high' && (
                          <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold rounded-full uppercase">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-sm text-on-surface">{ins.product}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Seller: {ins.seller} &bull; Buyer: {ins.buyer}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">{formatPrice(ins.amount)}</p>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1">
                          <Clock size={10} />
                          {ins.timeLeft} left
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors">
                          Resolve
                        </button>
                        <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-colors">
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-premium border border-outline-variant/10 overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h3 className="font-semibold text-on-surface">Recent Transactions</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-8 pr-3 py-1.5 bg-surface-container-low rounded-lg text-xs w-40 focus:outline-none focus:ring-2 focus:ring-primary-container/30"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/10">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-on-surface-variant uppercase">
                      ID
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-on-surface-variant uppercase">
                      Buyer
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-on-surface-variant uppercase">
                      Seller
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-on-surface-variant uppercase">
                      Amount
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-on-surface-variant uppercase">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-on-surface-variant uppercase">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentTxns.map((tx) => {
                    const style = statusStyles[tx.status];
                    return (
                      <tr key={tx.id} className="border-b border-outline-variant/5 hover:bg-surface-container-low/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-on-surface">{tx.id}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{tx.buyer}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant">{tx.seller}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-on-surface">
                          {formatPrice(tx.amount)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                            {style.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-on-surface-variant">{tx.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Fraud Alerts */}
          <div className="bg-white rounded-2xl shadow-premium border border-error/20 overflow-hidden">
            <div className="p-5 border-b border-error/10 bg-error/5 flex items-center gap-2">
              <AlertTriangle size={18} className="text-error" />
              <h3 className="font-semibold text-on-surface">Fraud Alerts</h3>
              <span className="ml-auto bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {fraudAlerts.length}
              </span>
            </div>
            <div className="divide-y divide-error/5">
              {fraudAlerts.map((alert) => (
                <div key={alert.id} className="p-5 hover:bg-error/5 transition-colors">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        alert.severity === 'high'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      <AlertTriangle size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-on-surface">{alert.type}</p>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            alert.severity === 'high'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mb-2">{alert.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-on-surface-variant">{alert.time}</span>
                        <div className="flex gap-1.5">
                          <button className="px-2.5 py-1 bg-error text-white rounded text-[10px] font-medium hover:bg-error/80 transition-colors">
                            Block
                          </button>
                          <button className="px-2.5 py-1 bg-surface-container-low text-on-surface-variant rounded text-[10px] font-medium hover:bg-surface-container-high transition-colors">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Health */}
          <div className="bg-white rounded-2xl p-6 shadow-premium border border-outline-variant/10">
            <h3 className="font-semibold text-on-surface mb-4">Platform Health</h3>
            <div className="space-y-4">
              {[
                { label: 'Escrow Success Rate', value: 98.2, color: 'bg-emerald-500' },
                { label: 'Dispute Resolution', value: 94.5, color: 'bg-blue-500' },
                { label: 'User Verification', value: 96.8, color: 'bg-indigo-500' },
                { label: 'Avg. Resolution Time', value: 4.2, color: 'bg-amber-500', suffix: 'hrs' },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-on-surface-variant">{metric.label}</span>
                    <span className="text-xs font-semibold text-on-surface">
                      {metric.value}{metric.suffix || '%'}
                    </span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((metric.value / 100) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-primary rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="relative z-10">
              <h3 className="font-semibold text-sm text-white/80 mb-4">Today's Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">New Transactions</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Completed</span>
                  <span className="font-bold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Disputes</span>
                  <span className="font-bold text-amber-300">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Volume</span>
                  <span className="font-bold">GHS 18,200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
