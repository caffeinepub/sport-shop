import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { type Product } from '../data/products';

interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderConfirmationViewProps {
  orderId: string;
  items: OrderItem[];
  onContinueShopping: () => void;
}

export function OrderConfirmationView({ orderId, items, onContinueShopping }: OrderConfirmationViewProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
          <span className="text-sm font-medium text-muted-foreground">Order ID</span>
          <span className="font-mono font-semibold">{orderId}</span>
        </div>

        <h2 className="font-semibold mb-4">Order Items</h2>
        <div className="space-y-3 mb-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-3">
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <img
                  src={product.images?.[0] || '/assets/generated/product-placeholder.dim_256x256.png'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Subtotal</span>
            <span className="text-xl font-bold text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onContinueShopping}
        className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ShoppingBag className="h-5 w-5" />
        Continue Shopping
      </button>
    </div>
  );
}
