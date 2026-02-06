import { Package, ArrowLeft, Loader2 } from 'lucide-react';
import { useGetCallerOrders } from '../hooks/useOrders';
import { products as seededProducts } from '../data/products';

interface OrderHistoryViewProps {
  onBack: () => void;
}

export function OrderHistoryView({ onBack }: OrderHistoryViewProps) {
  const { data: orders, isLoading, error } = useGetCallerOrders();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </button>

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Loader2 className="h-12 w-12 text-muted-foreground animate-spin mb-4" />
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </button>

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full bg-destructive/10 p-6 mb-6">
            <Package className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Failed to load orders
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {error instanceof Error ? error.message : 'An error occurred while loading your orders.'}
          </p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </button>

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full bg-muted p-6 mb-6">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            No orders yet
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You haven't placed any orders yet. Start shopping to see your order history here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </button>

      <h1 className="text-3xl font-bold tracking-tight mb-8">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          // Convert timestamp from nanoseconds to milliseconds
          const timestampMs = Number(order.timestamp) / 1_000_000;
          const totalDollars = Number(order.totalCents) / 100;

          return (
            <div
              key={order.orderId.toString()}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-mono font-semibold">#{order.orderId.toString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">
                    {new Date(timestampMs).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(timestampMs).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-3">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => {
                    // Find product from seeded catalog
                    const product = seededProducts.find(
                      (p) => p.id === item.productId.toString()
                    );
                    const quantity = Number(item.quantity);

                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={product?.images?.[0] || '/assets/generated/product-placeholder.dim_256x256.png'}
                            alt={product?.name || 'Product'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {product?.name || `Product #${item.productId.toString()}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {quantity}
                            {product && ` × $${product.price.toFixed(2)}`}
                          </p>
                        </div>
                        {product && (
                          <div className="text-right">
                            <p className="font-semibold">
                              ${(product.price * quantity).toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  ${totalDollars.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
