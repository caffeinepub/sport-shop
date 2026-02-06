interface SportsShopHeaderProps {
  cartCount: number;
  onNavigateToCart: () => void;
}

export function SportsShopHeader({ cartCount, onNavigateToCart }: SportsShopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Vikash Sports</h1>
        </div>
        
        <button
          onClick={onNavigateToCart}
          className="flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 border border-primary/20 transition-all hover:bg-primary/20 hover:border-primary/30 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="View cart"
        >
          <img 
            src="/assets/generated/cart-icon.dim_64x64.png" 
            alt="Cart" 
            className="h-6 w-6"
          />
          <span className="font-semibold text-sm">Cart: {cartCount}</span>
        </button>
      </div>
    </header>
  );
}
