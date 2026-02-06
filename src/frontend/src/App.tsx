import { useState } from 'react';
import { SportsShopHeader } from './components/SportsShopHeader';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { OrderHistoryView } from './components/OrderHistoryView';
import { products, type Product } from './data/products';
import { Heart } from 'lucide-react';

type View = 'list' | 'details' | 'cart' | 'checkout' | 'orderConfirmation' | 'orderHistory';

// Cart item with quantity tracking
interface CartItem {
  product: Product;
  quantity: number;
}

// Order confirmation data
interface OrderConfirmation {
  orderId: string;
  items: CartItem[];
  subtotal: number;
}

// Stored order with timestamp
export interface StoredOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  timestamp: number;
  customerInfo: {
    fullName: string;
    email: string;
  };
}

function App() {
  const [cartItems, setCartItems] = useState<Map<string, CartItem>>(new Map());
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [orderHistory, setOrderHistory] = useState<StoredOrder[]>([]);

  // Calculate total cart count (sum of all quantities)
  const cartCount = Array.from(cartItems.values()).reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Add or increment product in cart
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const newItems = new Map(prevItems);
      const existing = newItems.get(product.id);
      
      if (existing) {
        newItems.set(product.id, {
          product,
          quantity: existing.quantity + 1,
        });
      } else {
        newItems.set(product.id, {
          product,
          quantity: 1,
        });
      }
      
      return newItems;
    });
  };

  // Increment quantity
  const handleIncrementQuantity = (productId: string) => {
    setCartItems((prevItems) => {
      const newItems = new Map(prevItems);
      const existing = newItems.get(productId);
      
      if (existing) {
        newItems.set(productId, {
          ...existing,
          quantity: existing.quantity + 1,
        });
      }
      
      return newItems;
    });
  };

  // Decrement quantity (minimum 0)
  const handleDecrementQuantity = (productId: string) => {
    setCartItems((prevItems) => {
      const newItems = new Map(prevItems);
      const existing = newItems.get(productId);
      
      if (existing) {
        const newQuantity = existing.quantity - 1;
        if (newQuantity <= 0) {
          newItems.delete(productId);
        } else {
          newItems.set(productId, {
            ...existing,
            quantity: newQuantity,
          });
        }
      }
      
      return newItems;
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const newItems = new Map(prevItems);
      newItems.delete(productId);
      return newItems;
    });
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems(new Map());
  };

  const handleViewDetails = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
    setCurrentView('list');
  };

  const handleNavigateToCart = () => {
    setCurrentView('cart');
  };

  const handleNavigateToOrderHistory = () => {
    setCurrentView('orderHistory');
  };

  const handleProceedToCheckout = () => {
    setCurrentView('checkout');
  };

  const handleBackToCart = () => {
    setCurrentView('cart');
  };

  const handleOrderSuccess = (orderId: string, customerName: string, customerEmail: string) => {
    // Calculate subtotal before clearing cart
    const cartItemsArray = Array.from(cartItems.values());
    const subtotal = cartItemsArray.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    // Store order confirmation data
    setOrderConfirmation({
      orderId,
      items: cartItemsArray,
      subtotal,
    });

    // Add to order history
    const newOrder: StoredOrder = {
      orderId,
      items: cartItemsArray,
      subtotal,
      timestamp: Date.now(),
      customerInfo: {
        fullName: customerName,
        email: customerEmail,
      },
    };
    setOrderHistory((prev) => [newOrder, ...prev]);

    // Clear cart
    handleClearCart();

    // Navigate to confirmation
    setCurrentView('orderConfirmation');
  };

  // Find the selected product
  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId) 
    : null;

  // Convert cart map to array for views
  const cartItemsArray = Array.from(cartItems.values());

  return (
    <div className="min-h-screen bg-background">
      <SportsShopHeader 
        cartCount={cartCount} 
        onNavigateToCart={handleNavigateToCart}
        onNavigateToOrderHistory={handleNavigateToOrderHistory}
        onNavigateHome={handleBackToList}
      />
      
      <main className="container py-8">
        {currentView === 'orderHistory' ? (
          // Order History View
          <OrderHistoryView
            orders={orderHistory}
            onBack={handleBackToList}
          />
        ) : currentView === 'orderConfirmation' ? (
          // Order Confirmation View
          <OrderConfirmationView
            orderId={orderConfirmation?.orderId || ''}
            items={orderConfirmation?.items || []}
            onContinueShopping={handleBackToList}
          />
        ) : currentView === 'checkout' ? (
          // Checkout View
          <CheckoutView
            items={cartItemsArray}
            onBack={handleBackToCart}
            onOrderSuccess={handleOrderSuccess}
          />
        ) : currentView === 'cart' ? (
          // Cart View
          <CartView
            items={cartItemsArray}
            onBack={handleBackToList}
            onIncrement={handleIncrementQuantity}
            onDecrement={handleDecrementQuantity}
            onRemove={handleRemoveFromCart}
            onProceedToCheckout={handleProceedToCheckout}
          />
        ) : currentView === 'details' ? (
          // Product Details View
          <ProductDetails 
            product={selectedProduct}
            onBack={handleBackToList}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            {/* Hero Section */}
            <div className="relative mb-12 overflow-hidden rounded-2xl">
              <img
                src="/assets/generated/sports-hero.dim_1600x600.png"
                alt="Vikash Sports Hero"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center">
                <div className="px-8 md:px-12 max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Gear Up for Victory
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Premium sports equipment for athletes of all levels
                  </p>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  Featured Products
                </h2>
                <p className="text-muted-foreground">
                  Browse our collection of high-quality sports gear
                </p>
              </div>
              
              <ProductList 
                products={products} 
                onAdd={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">
              © 2026. Built with <Heart className="inline h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
