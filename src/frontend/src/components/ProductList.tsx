import { type Product } from '../data/products';
import { Plus, Eye, X, Heart, Star, Share2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductListProps {
  products: Product[];
  searchQuery: string;
  minPrice: string;
  maxPrice: string;
  onSearchChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClearFilters: () => void;
  onAdd: (product: Product) => void;
  onViewDetails: (productId: string) => void;
  onToggleLike: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  onShare: (product: Product) => void;
  isLiked: (productId: string) => boolean;
  isFavorited: (productId: string) => boolean;
}

export function ProductList({ 
  products, 
  searchQuery,
  minPrice,
  maxPrice,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
  onAdd, 
  onViewDetails,
  onToggleLike,
  onToggleFavorite,
  onShare,
  isLiked,
  isFavorited,
}: ProductListProps) {
  const hasActiveFilters = searchQuery !== '' || minPrice !== '' || maxPrice !== '';
  const [shareMessage, setShareMessage] = useState<{ productId: string; message: string } | null>(null);

  const handleShare = async (product: Product) => {
    await onShare(product);
    // Show message briefly
    setShareMessage({ productId: product.id, message: 'Link copied!' });
    setTimeout(() => {
      setShareMessage(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Filter Area */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filter Products</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear filters
              </Button>
            )}
          </div>
          
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Search Input */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            {/* Min Price Input */}
            <div className="space-y-2">
              <Label htmlFor="minPrice">Min price</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
              />
            </div>

            {/* Max Price Input */}
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max price</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="999.99"
                min="0"
                step="0.01"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <svg
              className="h-12 w-12 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">No products match your filters</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or price range to find what you're looking for.
          </p>
          {hasActiveFilters && (
            <Button onClick={onClearFilters} variant="outline">
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const liked = isLiked(product.id);
            const favorited = isFavorited(product.id);
            const showShareMessage = shareMessage?.productId === product.id;

            return (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/50"
              >
                <div 
                  className="aspect-square overflow-hidden bg-muted cursor-pointer"
                  onClick={() => onViewDetails(product.id)}
                >
                  <img
                    src={product.images?.[0] || '/assets/generated/product-placeholder.dim_256x256.png'}
                    alt={product.name || 'Unnamed product'}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                
                <div className="p-5">
                  <h3 
                    className="text-lg font-semibold tracking-tight mb-1 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => onViewDetails(product.id)}
                  >
                    {product.name || 'Unnamed product'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onViewDetails(product.id)}
                        aria-label="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        onClick={() => onAdd(product)}
                        size="sm"
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Reaction Controls */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleLike(product.id)}
                      className="flex-1 gap-2"
                      aria-label={liked ? 'Unlike' : 'Like'}
                    >
                      <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-xs">{liked ? 'Liked' : 'Like'}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleFavorite(product.id)}
                      className="flex-1 gap-2"
                      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`h-4 w-4 ${favorited ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                      <span className="text-xs">{favorited ? 'Favorited' : 'Favorite'}</span>
                    </Button>

                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(product)}
                        className="gap-2"
                        aria-label="Share"
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs">Share</span>
                      </Button>
                      {showShareMessage && (
                        <div className="absolute top-full right-0 mt-1 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap z-10">
                          {shareMessage.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
