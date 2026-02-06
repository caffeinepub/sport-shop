import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { type Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartViewProps {
  items: CartItem[];
  onBack: () => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export function CartView({ items, onBack, onIncrement, onDecrement, onRemove, onProceedToCheckout }: CartViewProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="rounded-full bg-muted p-6 mb-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Add some products to your cart to get started with your order.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      <div className="space-y-6 mb-8">
        {items.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex gap-4 p-4 rounded-xl border border-border bg-card"
          >
            <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images?.[0] || '/assets/generated/product-placeholder.dim_256x256.png'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                ${product.price.toFixed(2)} each
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background">
                  <button
                    onClick={() => onDecrement(product.id)}
                    className="p-2 hover:bg-muted transition-colors rounded-l-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onIncrement(product.id)}
                    className="p-2 hover:bg-muted transition-colors rounded-r-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => onRemove(product.id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Remove from cart"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-primary">
                ${(product.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-semibold">Subtotal</span>
          <span className="text-2xl font-bold text-primary">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <button
          onClick={onProceedToCheckout}
          className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
