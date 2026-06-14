import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  BadgeCheck,
  ChevronRight,
  CheckCircle2,
  Banknote,
  Handshake,
  Truck,
  Smartphone,
  Flag,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const escrowSteps = [
  { icon: Banknote, label: 'You Pay', desc: 'Funds held securely' },
  { icon: Smartphone, label: 'Mobile Money', desc: 'MTN, Telecel & more' },
  { icon: Truck, label: 'Delivery', desc: 'Inspect in person' },
  { icon: Handshake, label: 'Approve', desc: 'Funds released' },
];

const paymentMethods = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    shortLabel: 'MTN MoMo',
    color: 'bg-amber-500',
    textColor: 'text-amber-950',
    borderColor: 'border-amber-200 hover:border-amber-400',
    bgColor: 'bg-amber-50 hover:bg-amber-100',
  },
  {
    id: 'telecel',
    name: 'Telecel Cash',
    shortLabel: 'Telecel',
    color: 'bg-red-600',
    textColor: 'text-red-950',
    borderColor: 'border-red-200 hover:border-red-400',
    bgColor: 'bg-red-50 hover:bg-red-100',
  },
  {
    id: 'airteltigo',
    name: 'AT Money',
    shortLabel: 'AT Money',
    color: 'bg-blue-600',
    textColor: 'text-blue-950',
    borderColor: 'border-blue-200 hover:border-blue-400',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
  },
];

type PaymentStep = 'idle' | 'processing' | 'pin-prompt' | 'success';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('idle');

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface pt-[72px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-on-surface mb-2">Product not found</h2>
          <Link to="/marketplace" className="text-primary hover:underline">
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const selectedMethod = paymentMethods.find((method) => method.id === selectedPayment);
  const isPaymentBusy = paymentStep === 'processing' || paymentStep === 'pin-prompt';

  const handlePayment = () => {
    if (!selectedPayment || isPaymentBusy || paymentStep === 'success') return;

    setPaymentStep('processing');

    window.setTimeout(() => {
      setPaymentStep('pin-prompt');

      window.setTimeout(() => {
        setPaymentStep('success');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface pt-[72px]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-outline" />
            <Link
              to="/marketplace"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              Marketplace
            </Link>
            <ChevronRight size={14} className="text-outline" />
            <span className="text-on-surface font-medium truncate">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-premium border border-outline-variant/10">
              {/* Main Image */}
              <div className="aspect-square relative overflow-hidden bg-surface-container-low">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-error text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                    -{discount}%
                  </div>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-premium border border-outline-variant/10">
              <h2 className="text-lg font-bold text-on-surface mb-4">Description</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                {product.description}
              </p>

              {/* Specs */}
              {Object.keys(product.specs).length > 0 && (
                <div className="mt-6 pt-6 border-t border-outline-variant/20">
                  <h3 className="font-semibold text-sm text-on-surface mb-4">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl"
                      >
                        <span className="text-xs text-on-surface-variant">{key}</span>
                        <span className="text-sm font-medium text-on-surface">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Escrow Process */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-premium border border-outline-variant/10">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck size={20} className="text-primary" />
                <h2 className="text-lg font-bold text-on-surface">Escrow Protection</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {escrowSteps.map((step, i) => (
                  <div key={step.label} className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2
                      ${i === 0 ? 'bg-primary text-white' : 'bg-surface-container-high text-outline'}`}
                    >
                      <step.icon size={18} />
                    </div>
                    <p className="text-xs font-semibold text-on-surface">{step.label}</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-[88px] space-y-6">
              {/* Title & Price Card */}
              <div className="bg-white rounded-2xl p-6 shadow-premium border border-outline-variant/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-on-surface leading-tight">
                      {product.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border
                        ${
                          product.condition === 'New'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : product.condition === 'Like New'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {product.condition}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                        <MapPin size={12} />
                        {product.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-2.5 rounded-xl transition-all ${
                        isWishlisted
                          ? 'bg-error text-white'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-error-container/10 hover:text-error'
                      }`}
                    >
                      <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                    </button>
                    <button className="p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-on-surface-variant line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-sm font-semibold text-emerald-600">{discount}% off</span>
                    </>
                  )}
                </div>

                {/* Escrow Badge */}
                {product.escrow && (
                  <div className="flex items-start gap-3 p-4 bg-primary-container/10 rounded-xl border border-primary-container/20 mb-6">
                    <ShieldCheck size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-on-surface">UniMart Escrow Protected</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Your payment is held securely until you inspect and approve the item.
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowPaymentOptions((prev) => !prev)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 
                             rounded-xl font-semibold hover:bg-primary-container transition-all duration-200
                             shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Smartphone size={18} />
                    Buy
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${showPaymentOptions ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: showPaymentOptions ? 'auto' : 0,
                      opacity: showPaymentOptions ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low/50 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-on-surface">Choose payment method</p>
                        <span className="text-xs font-medium text-primary">{formatPrice(product.price)}</span>
                      </div>
                      <div className="grid gap-2">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            disabled={isPaymentBusy || paymentStep === 'success'}
                            onClick={() => setSelectedPayment(method.id)}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200
                              ${method.borderColor} ${method.bgColor}
                              ${selectedPayment === method.id ? 'ring-2 ring-primary ring-offset-1' : ''}
                              disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            <div
                              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${method.color}`}
                            >
                              {method.shortLabel.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold ${method.textColor}`}>{method.name}</p>
                              <p className="text-xs text-on-surface-variant">Pay securely via mobile money</p>
                            </div>
                            {selectedPayment === method.id && (
                              <CheckCircle2 size={18} className="flex-shrink-0 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                      {paymentStep === 'success' ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center"
                        >
                          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                            <CheckCircle2 size={28} />
                          </div>
                          <h4 className="text-base font-bold text-emerald-950">Order Placed Successfully!</h4>
                          <p className="mt-2 text-sm leading-relaxed text-emerald-800">
                            Your funds are securely held in escrow.
                          </p>
                          {selectedMethod && (
                            <p className="mt-3 text-xs font-medium text-emerald-700">
                              Paid via {selectedMethod.shortLabel} · {formatPrice(product.price)}
                            </p>
                          )}
                        </motion.div>
                      ) : (
                        <button
                          type="button"
                          onClick={handlePayment}
                          disabled={!selectedPayment || isPaymentBusy}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-semibold transition-all duration-200
                                     hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {paymentStep === 'processing' ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Processing secure channel...
                            </>
                          ) : selectedPayment ? (
                            `Pay ${formatPrice(product.price)} via ${selectedMethod?.shortLabel}`
                          ) : (
                            'Select a payment method'
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white text-on-surface-variant border border-outline-variant/30 
                             py-3 rounded-xl text-sm font-medium hover:bg-surface-container-low hover:text-error 
                             hover:border-error/30 transition-all duration-200"
                  >
                    <Flag size={16} />
                    Report Listing
                  </button>
                  <a
                    href="#safety-guidelines"
                    className="block w-full text-center text-sm font-medium text-primary hover:text-primary-container transition-colors py-1"
                  >
                    View Safety Guidelines
                  </a>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 pt-6 border-t border-outline-variant/20 flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <Truck size={14} />
                    {product.delivery}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    Posted {product.postedAt}
                  </span>
                </div>
              </div>

              {/* Seller Card */}
              <div className="bg-white rounded-2xl p-6 shadow-premium border border-outline-variant/10">
                <h3 className="font-semibold text-sm text-on-surface mb-4">About the Seller</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary-container/30 flex items-center justify-center text-lg font-bold text-primary overflow-hidden">
                    {product.seller.avatar ? (
                      <img
                        src={product.seller.avatar}
                        alt={product.seller.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      product.seller.initials
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-on-surface">{product.seller.name}</span>
                      {product.seller.verified && (
                        <BadgeCheck size={16} className="text-primary fill-primary" />
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      {product.seller.department} &bull; Joined {product.seller.joinDate}
                    </p>
                  </div>
                  {product.seller.online && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-emerald-700">Online</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-surface-container-low rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span className="font-bold text-sm text-on-surface">
                        {product.seller.rating}
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant">{product.seller.reviewCount} reviews</p>
                  </div>
                  <div className="text-center p-3 bg-surface-container-low rounded-xl">
                    <p className="font-bold text-sm text-on-surface">{product.seller.itemsSold}</p>
                    <p className="text-[10px] text-on-surface-variant">Items sold</p>
                  </div>
                  <div className="text-center p-3 bg-surface-container-low rounded-xl">
                    <p className="font-bold text-sm text-on-surface">
                      {product.seller.verified ? 'Yes' : 'No'}
                    </p>
                    <p className="text-[10px] text-on-surface-variant">Verified</p>
                  </div>
                </div>
              </div>

              {/* Safety Tips */}
              <div
                id="safety-guidelines"
                className="bg-amber-50 rounded-2xl p-5 border border-amber-200/50 scroll-mt-24"
              >
                <h3 className="font-semibold text-sm text-amber-800 mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Safety Tips
                </h3>
                <ul className="space-y-2">
                  {[
                    'Always pay through UniMart mobile money options',
                    'Inspect the item before approving',
                    'Meet in public campus locations',
                    'Report suspicious listings immediately',
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-xs text-amber-700">
                      <CheckCircle2 size={12} className="flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-on-surface mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {paymentStep === 'pin-prompt' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-outline-variant/20 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white">
                    <Smartphone size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface">Mobile Money</p>
                    <p className="text-[10px] text-on-surface-variant">now</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary-container/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                  Push
                </span>
              </div>
              <div className="px-4 py-5">
                <p className="text-sm font-semibold text-on-surface">UniMart Escrow</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  Enter your MoMo PIN on your device to approve{' '}
                  <span className="font-bold text-primary">{formatPrice(product.price)}</span>.
                </p>
                {selectedMethod && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-container-low p-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-bold text-white ${selectedMethod.color}`}
                    >
                      {selectedMethod.shortLabel.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface">{selectedMethod.name}</p>
                      <p className="text-[10px] text-on-surface-variant">Awaiting PIN approval...</p>
                    </div>
                    <Loader2 size={16} className="ml-auto animate-spin text-primary" />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
