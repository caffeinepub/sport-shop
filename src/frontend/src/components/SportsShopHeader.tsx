import { ShoppingCart } from 'lucide-react';

interface SportsShopHeaderProps {
  cartCount: number;
}

export function SportsShopHeader({ cartCount }: SportsShopHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Vikash Sports</h1>
        </div>
        
        <div className="flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
          <img 
            src="/assets/generated/cart-icon.dim_64x64.png" 
            alt="Cart" 
            className="h-6 w-6"
          />
          <span className="font-semibold text-sm">Cart: {cartCount}</span>
        </div>
      </div>
    </header>
  );
}
