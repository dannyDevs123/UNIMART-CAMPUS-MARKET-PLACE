import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ArrowRight,
  Users,
  Lock,
  Handshake,
  Banknote,
  CheckCircle2,
  TrendingUp,
  Star,
  ChevronRight,
  BookOpen,
  Laptop,
  Smartphone,
  Armchair,
  Shirt,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const escrowSteps = [
  {
    icon: Banknote,
    title: 'Buyer Pays',
    desc: 'Funds are held securely in the UniMart Vault. The seller is notified to prepare the item.',
    status: 'completed' as const,
  },
  {
    icon: Lock,
    title: 'Escrow Hold',
    desc: 'Funds are secured and the seller drops off the item at a campus pickup point.',
    status: 'current' as const,
  },
  {
    icon: Handshake,
    title: 'Inspection',
    desc: 'Buyer inspects the item in person. 24-hour inspection window to verify condition.',
    status: 'pending' as const,
  },
  {
    icon: CheckCircle2,
    title: 'Funds Released',
    desc: 'Buyer approves, funds are released to seller instantly. Everyone wins!',
    status: 'pending' as const,
  },
];

const categories = [
  { icon: Laptop, label: 'Laptops', count: '45 items' },
  { icon: Smartphone, label: 'Phones', count: '82 items' },
  { icon: BookOpen, label: 'Textbooks', count: '120 items' },
  { icon: Armchair, label: 'Furniture', count: '38 items' },
  { icon: Shirt, label: 'Fashion', count: '95 items' },
  { icon: TrendingUp, label: 'Deals', count: '24 items' },
];

const featuredProducts = products.slice(0, 8);

export default function Home() {
  return (
    <div className="overflow-x-hidden transform-gpu will-change-transform bg-surface">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden transform-gpu">
        {/* Decorative elements — desktop only; blur filters cause mobile Chrome compositing glitches */}
        <div className="hidden md:block absolute top-20 right-0 w-[600px] h-[600px] bg-[#eef0ff] rounded-full pointer-events-none" />
        <div className="hidden md:block absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#e8ebff] rounded-full pointer-events-none" />

        <div className="max-w-container-max mx-auto px-4 md:px-6 py-20 relative z-10 transform-gpu">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white border border-outline-variant/30 
                         px-4 py-2 rounded-full text-sm text-primary font-medium shadow-sm mb-8"
              >
                <ShieldCheck size={16} />
                Safe Deals. Smart Students.
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface leading-tight mb-6">
                Buy & Sell{' '}
                <span className="text-primary relative">
                  Safely
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,8 Q50,0 100,8 T200,8"
                      fill="none"
                      stroke="#8792fe"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                on Campus
              </h1>

              <p className="text-lg text-on-surface-variant leading-relaxed mb-8 max-w-lg">
                The student-only marketplace with secure mobile money checkout. Browse verified
                listings — sellers work directly with UniMart administration to list products.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 
                           rounded-xl font-semibold hover:bg-primary-container transition-all duration-200
                           shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Start Browsing
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/seller-dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary border border-outline-variant/50 
                           px-8 py-3.5 rounded-xl font-semibold hover:bg-surface-container-low transition-all duration-200
                           hover:border-primary/30"
                >
                  Sell with UniMart
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-xs font-bold text-primary"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">2,500+ students</p>
                  <p className="text-xs text-on-surface-variant">trading safely this semester</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 ml-4 px-3 py-1.5 bg-emerald-50 rounded-full">
                  <TrendingUp size={14} className="text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">94% satisfaction</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img
                  src="/images/hero-marketplace.jpg"
                  alt="UniMart Marketplace"
                  className="rounded-3xl shadow-2xl shadow-primary/10 w-full object-cover aspect-[4/3]"
                />
                {/* Floating card - Escrow */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-lg border border-outline-variant/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Lock size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface">GHS 450.00</p>
                      <p className="text-[10px] text-on-surface-variant">In Escrow Vault</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card - Verified */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-lg border border-outline-variant/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <ShieldCheck size={18} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface">Verified Student</p>
                      <p className="text-[10px] text-on-surface-variant">Kwame A.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-outline-variant/20 transform-gpu">
        <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { label: 'Active Listings', value: '1,240+' },
              { label: 'Safe Trades', value: '8,500+' },
              { label: 'Verified Students', value: '3,200+' },
              { label: 'Escrow Protected', value: '100%' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                {...staggerItem}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-on-surface-variant mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-surface transform-gpu will-change-transform">
        <div className="max-w-container-max mx-auto px-4 md:px-6 transform-gpu">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
              Browse by Category
            </h2>
            <p className="text-on-surface-variant">Find exactly what you need for campus life</p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transform-gpu"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                {...staggerItem}
                transition={{ delay: i * 0.08 }}
                className="transform-gpu"
              >
                <Link
                  to="/marketplace"
                  className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-outline-variant/20 
                           hover:border-primary/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300 group transform-gpu"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#eef0ff] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <cat.icon size={22} />
                  </div>
                  <span className="font-semibold text-sm text-on-surface">{cat.label}</span>
                  <span className="text-xs text-on-surface-variant">{cat.count}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-[#eff4ff] transform-gpu">
        <div className="max-w-container-max mx-auto px-4 md:px-6 transform-gpu">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">
                Trending Now
              </h2>
              <p className="text-on-surface-variant">Most popular items this week</p>
            </div>
            <Link
              to="/marketplace"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-container transition-colors"
            >
              View all
              <ChevronRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              View all items
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How Escrow Works */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden transform-gpu">
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#f0f2ff] rounded-full pointer-events-none" />

        <div className="max-w-container-max mx-auto px-4 md:px-6 relative z-10 transform-gpu">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#eef0ff] text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <ShieldCheck size={16} />
              UniMart Escrow
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-4">
              How Safe Deals Work
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
              Our transparent escrow process protects both buyers and sellers every step of the way.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {escrowSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative flex gap-6 mb-8 last:mb-0"
              >
                {/* Timeline line */}
                {i < escrowSteps.length - 1 && (
                  <div className="absolute left-5 top-14 w-0.5 h-12 bg-outline-variant/30" />
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${
                      step.status === 'completed'
                        ? 'bg-emerald-500 text-white'
                        : step.status === 'current'
                        ? 'bg-primary text-white pulse-ring'
                        : 'bg-surface-container-high text-outline border-2 border-outline-variant'
                    }`}
                >
                  <step.icon size={18} />
                </div>

                {/* Content */}
                <div
                  className={`rounded-2xl p-6 flex-1 border border-outline-variant/10 bg-white shadow-sm transform-gpu ${
                    step.status === 'current' ? 'border-primary/30 bg-[#f5f6ff]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-on-surface">{step.title}</h3>
                    {step.status === 'current' && (
                      <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Current
                      </span>
                    )}
                    {step.status === 'completed' && (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Why UniMart */}
      <section className="py-16 md:py-24 bg-surface transform-gpu">
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
              Why Students Trust UniMart
            </h2>
            <p className="text-on-surface-variant">Built for campus life, backed by real security</p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: ShieldCheck,
                title: 'Escrow Protection',
                desc: 'Your money stays in our vault until you confirm the item is exactly as described. No more risky cash meetups.',
              },
              {
                icon: Users,
                title: 'Verified Students Only',
                desc: 'Every user is verified with a valid .edu email. Trade with confidence knowing you are dealing with real students.',
              },
              {
                icon: Star,
                title: 'Rating System',
                desc: 'Rate your experience after every trade. Build reputation as a trusted buyer or seller on campus.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-outline-variant/10 shadow-premium hover:shadow-card-hover 
                         hover:-translate-y-1 transition-all duration-300 transform-gpu"
              >
                <div className="w-12 h-12 rounded-xl bg-[#eef0ff] flex items-center justify-center text-primary mb-5">
                  <item.icon size={22} />
                </div>
                <h3 className="font-semibold text-lg text-on-surface mb-3">{item.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 transform-gpu">
        <div className="max-w-container-max mx-auto px-4 md:px-6 transform-gpu">
          <motion.div
            {...fadeUp}
            className="relative bg-primary rounded-3xl p-10 md:p-16 overflow-hidden text-center transform-gpu"
          >
            {/* Decorative elements — solid fills only, no blur on mobile */}
            <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-[#4f46b8] rounded-full opacity-40" />
            <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-[#6366d4] rounded-full opacity-30" />

            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Browse campus deals and pay securely with mobile money. Want to sell? Contact our
                administration team to list your products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3.5 
                           rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  Browse Items
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/seller-dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-[#4f46b8] text-white border border-[#6366d4] 
                           px-8 py-3.5 rounded-xl font-semibold hover:bg-[#4338ca] transition-all duration-200"
                >
                  Contact Administration
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
