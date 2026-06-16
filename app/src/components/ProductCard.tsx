import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, ShieldCheck, Star, Clock, BadgeCheck } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const badgeColors: Record<string, string> = {
  'Hot Deal': 'bg-amber-50 text-amber-700 border-amber-200',
  'Verified Seller': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Fast Selling': 'bg-orange-50 text-orange-700 border-orange-200',
  'New Item': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Premium': 'bg-purple-50 text-purple-700 border-purple-200',
  'Bundle Deal': 'bg-pink-50 text-pink-700 border-pink-200',
  'Quick Sale': 'bg-rose-50 text-rose-700 border-rose-200',
  negotiable: 'bg-blue-50 text-blue-700 border-blue-200',
};

const conditionColors: Record<string, string> = {
  New: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Like New': 'bg-sky-50 text-sky-700 border-sky-200',
  Good: 'bg-blue-50 text-blue-700 border-blue-200',
  Fair: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-card-hover 
                 transition-all duration-300 hover:-translate-y-1 border border-outline-variant/10 transform-gpu"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-surface-container-low">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-surface-container-high" />
        )}
        <img
          src={product.image}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold border ${
                badgeColors[badge] || 'bg-gray-50 text-gray-600 border-gray-200'
              }`}
            >
              {badge === 'Verified Seller' && <BadgeCheck size={10} />}
              {badge}
            </span>
          ))}
        </div>

        {/* Escrow badge */}
        {product.escrow && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold bg-indigo-600 text-white">
              <ShieldCheck size={10} />
              Escrow
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200
            ${isWishlisted ? 'bg-error text-white' : 'bg-white text-on-surface-variant hover:text-error border border-outline-variant/20'}`}
        >
          <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
        </button>

        {/* Price tag on hover */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-3 py-1.5 bg-white rounded-lg text-sm font-bold text-primary border border-outline-variant/20 shadow-sm">
            {formatPrice(product.price)}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm text-on-surface line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2.5">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-on-surface-variant line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Condition & Location */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
              conditionColors[product.condition] || conditionColors.Good
            }`}
          >
            {product.condition}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-on-surface-variant">
            <MapPin size={10} />
            {product.location}
          </span>
        </div>

        {/* Seller info */}
        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-container/30 flex items-center justify-center text-[10px] font-bold text-primary">
              {product.seller.initials}
            </div>
            <span className="text-xs text-on-surface-variant truncate max-w-[80px]">
              {product.seller.name}
            </span>
            {product.seller.verified && (
              <BadgeCheck size={12} className="text-primary fill-primary" />
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-amber-500 fill-amber-500" />
            <span className="text-[11px] font-medium text-on-surface">{product.seller.rating}</span>
          </div>
        </div>

        {/* Delivery info */}
        <div className="flex items-center gap-3 mt-2.5 text-[10px] text-on-surface-variant">
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {product.postedAt}
          </span>
          <span>{product.delivery}</span>
        </div>
      </div>
    </motion.article>
  );
}
