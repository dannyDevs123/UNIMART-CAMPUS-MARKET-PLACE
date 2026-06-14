import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Grid3X3,
  LayoutList,
  MapPin,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, conditions, locations } from '../data/products';

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'newest' | 'rating';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [selectedCondition, setSelectedCondition] = useState('Any');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'All Items') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Condition
    if (selectedCondition !== 'Any') {
      filtered = filtered.filter((p) => p.condition === selectedCondition);
    }

    // Location
    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter((p) => p.location === selectedLocation);
    }

    // Price
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.seller.rating - a.seller.rating);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedCondition, selectedLocation, sortBy, priceRange]);

  const activeFiltersCount = [
    selectedCategory !== 'All Items',
    selectedCondition !== 'Any',
    selectedLocation !== 'All Locations',
    priceRange[0] > 0 || priceRange[1] < 10000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-surface pt-[72px]">
      {/* Header */}
      <div className="bg-white border-b border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">Marketplace</h1>
            <p className="text-on-surface-variant">
              Browse {products.length}+ items from verified students
            </p>
          </motion.div>

          {/* Search & Toolbar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
              />
              <input
                type="text"
                placeholder="Search items, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 
                         rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-4 
                         focus:ring-primary-container/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-on-surface"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all
                  ${
                    showFilters || activeFiltersCount > 0
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-on-surface border-outline-variant/50 hover:border-primary/50'
                  }`}
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none pl-4 pr-10 py-3 bg-white border border-outline-variant/50 
                           rounded-xl text-sm focus:outline-none focus:border-primary cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-4 md:px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 280 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 overflow-hidden"
              >
                <div className="w-[280px] space-y-6">
                  {/* Condition */}
                  <div>
                    <h3 className="font-semibold text-sm text-on-surface mb-3">Condition</h3>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedCondition(c)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                            ${
                              selectedCondition === c
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-on-surface-variant border-outline-variant/30 hover:border-primary/50'
                            }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-sm text-on-surface mb-3">Price Range (GHS)</h3>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0] || ''}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded-lg text-sm"
                      />
                      <span className="text-outline">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1] === 10000 ? '' : priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value) || 10000])
                        }
                        className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="font-semibold text-sm text-on-surface mb-3">Location</h3>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                      {locations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setSelectedLocation(loc)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                            ${
                              selectedLocation === loc
                                ? 'bg-primary-container/15 text-primary font-medium'
                                : 'text-on-surface-variant hover:bg-surface-container-low'
                            }`}
                        >
                          <MapPin size={14} />
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={() => {
                        setSelectedCategory('All Items');
                        setSelectedCondition('Any');
                        setSelectedLocation('All Locations');
                        setPriceRange([0, 10000]);
                      }}
                      className="w-full py-2.5 text-sm text-error hover:bg-error-container/10 rounded-lg transition-colors"
                    >
                      Reset all filters
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-on-surface-variant">
                <span className="font-semibold text-on-surface">{filteredProducts.length}</span>{' '}
                items found
              </p>
              <div className="flex items-center gap-1 bg-white rounded-lg border border-outline-variant/30 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-primary-container/15 text-primary' : 'text-outline'
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-primary-container/15 text-primary' : 'text-outline'
                  }`}
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Search size={48} className="mx-auto text-outline-variant mb-4" />
                <h3 className="text-lg font-semibold text-on-surface mb-2">No items found</h3>
                <p className="text-sm text-on-surface-variant">
                  Try adjusting your filters or search query
                </p>
              </motion.div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
