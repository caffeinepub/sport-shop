import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderConfirmationViewProps {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  onContinueShopping: () => void;
}

export function OrderConfirmationView({
  orderId,
  items,
  subtotal,
  onContinueShopping,
}: OrderConfirmationViewProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground text-lg">
          Thank you for your purchase
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">Order ID</span>
            <span className="font-mono font-semibold">{orderId}</span>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold">Items Ordered</h3>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-muted-foreground">
                    ${item.product.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">${subtotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          size="lg"
          onClick={onContinueShopping}
          className="gap-2"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
