import { ShoppingBag, History, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SportsShopHeaderProps {
  cartCount: number;
  favoritesCount: number;
  onNavigateToCart: () => void;
  onNavigateToOrderHistory: () => void;
  onNavigateToFavorites: () => void;
  onNavigateHome: () => void;
}

export function SportsShopHeader({ 
  cartCount, 
  favoritesCount,
  onNavigateToCart, 
  onNavigateToOrderHistory,
  onNavigateToFavorites,
  onNavigateHome 
}: SportsShopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity min-w-0"
        >
          <img
            src="/assets/generated/vikash-sports-logo.dim_256x256.png"
            alt="Vikash Sports logo"
            className="h-10 w-10 object-contain flex-shrink-0"
          />
          <h1 className="text-2xl font-bold tracking-tight truncate">Vikash Sports</h1>
        </button>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNavigateToFavorites}
            className="gap-2"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="ml-1 text-xs font-semibold">({favoritesCount})</span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onNavigateToOrderHistory}
            className="gap-2"
          >
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
          </Button>

          <button
            onClick={onNavigateToCart}
            className="flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 border border-primary/20 transition-all hover:bg-primary/20 hover:border-primary/30 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="View cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="font-semibold text-sm">Cart: {cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
