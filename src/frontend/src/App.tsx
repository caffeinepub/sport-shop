import { useState, useEffect } from 'react';
import { SportsShopHeader } from './components/SportsShopHeader';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { OrderHistoryView } from './components/OrderHistoryView';
import { FavoritesView } from './components/FavoritesView';
import { AddProductDialog } from './components/AddProductDialog';
import { type Product } from './data/products';
import { Heart, Plus } from 'lucide-react';
import { useProductReactions } from './hooks/useProductReactions';
import { shareProduct } from './lib/productShare';
import { useHeroImagePreference, type HeroImageOption } from './hooks/useHeroImagePreference';
import { useUserAddedProducts } from './hooks/useUserAddedProducts';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { useQueryClient } from '@tanstack/react-query';

type View = 'list' | 'details' | 'cart' | 'checkout' | 'orderConfirmation' | 'orderHistory' | 'favorites';

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

const HERO_OPTIONS: { value: HeroImageOption; label: string; src: string }[] = [
  {
    value: 'option-a',
    label: 'Style A',
    src: '/assets/generated/sports-hero-option-a.dim_1600x600.png',
  },
  {
    value: 'option-b',
    label: 'Style B',
    src: '/assets/generated/sports-hero-option-b.dim_1600x600.png',
  },
  {
    value: 'option-c',
    label: 'Style C',
    src: '/assets/generated/sports-hero-option-c.dim_1600x600.png',
  },
];

function App() {
  const queryClient = useQueryClient();
  const [cartItems, setCartItems] = useState<Map<string, CartItem>>(new Map());
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Hero image preference
  const { selectedHero, setSelectedHero } = useHeroImagePreference();

  // User-added products (merged with seeded products)
  const { products, addProduct } = useUserAddedProducts();

  // Product reactions (likes and favorites)
  const {
    toggleLike,
    toggleFavorite,
    isLiked,
    isFavorited,
    getFavoriteIds,
  } = useProductReactions();

  // Calculate total cart count (sum of all quantities)
  const cartCount = Array.from(cartItems.values()).reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Get favorites count
  const favoritesCount = getFavoriteIds().length;

  // Get favorited products from merged catalog
  const favoritedProducts = products.filter((product) =>
    getFavoriteIds().includes(product.id)
  );

  // Filter products based on search and price range
  const filteredProducts = products.filter((product) => {
    // Search filter (case-insensitive match against name and description)
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchLower === '' || 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower);

    // Price range filter
    const min = minPrice === '' ? -Infinity : parseFloat(minPrice);
    const max = maxPrice === '' ? Infinity : parseFloat(maxPrice);
    const matchesPrice = product.price >= min && product.price <= max;

    return matchesSearch && matchesPrice;
  });

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
  };

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
    // Update URL with product ID
    const url = new URL(window.location.href);
    url.searchParams.set('productId', productId);
    window.history.pushState({}, '', url.toString());
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
    setCurrentView('list');
    // Clear product ID from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('productId');
    window.history.pushState({}, '', url.toString());
  };

  const handleNavigateToCart = () => {
    setCurrentView('cart');
  };

  const handleNavigateToOrderHistory = () => {
    setCurrentView('orderHistory');
  };

  const handleNavigateToFavorites = () => {
    setCurrentView('favorites');
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

    // Invalidate orders query to refetch from backend
    queryClient.invalidateQueries({ queryKey: ['callerOrders'] });

    // Clear cart
    handleClearCart();

    // Navigate to confirmation
    setCurrentView('orderConfirmation');
  };

  const handleShare = async (product: Product) => {
    await shareProduct(product);
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    try {
      addProduct(productData);
    } catch (error) {
      throw error; // Re-throw to be caught by dialog
    }
  };

  // Handle deep linking on initial load
  useEffect(() => {
    const url = new URL(window.location.href);
    const productId = url.searchParams.get('productId');
    
    if (productId) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSelectedProductId(productId);
        setCurrentView('details');
      }
    }
  }, [products]);

  // Find the selected product from merged catalog
  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId) 
    : null;

  // Convert cart map to array for views
  const cartItemsArray = Array.from(cartItems.values());

  // Get current hero image source
  const currentHeroSrc = HERO_OPTIONS.find((opt) => opt.value === selectedHero)?.src || HERO_OPTIONS[0].src;

  return (
    <div className="min-h-screen bg-background">
      <SportsShopHeader 
        cartCount={cartCount}
        favoritesCount={favoritesCount}
        onNavigateToCart={handleNavigateToCart}
        onNavigateToOrderHistory={handleNavigateToOrderHistory}
        onNavigateToFavorites={handleNavigateToFavorites}
        onNavigateHome={handleBackToList}
      />
      
      <main className="container py-8">
        {currentView === 'favorites' ? (
          // Favorites View
          <FavoritesView
            products={favoritedProducts}
            onBack={handleBackToList}
            onViewDetails={handleViewDetails}
            onRemoveFavorite={toggleFavorite}
          />
        ) : currentView === 'orderHistory' ? (
          // Order History View
          <OrderHistoryView onBack={handleBackToList} />
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
            onToggleLike={toggleLike}
            onToggleFavorite={toggleFavorite}
            onShare={handleShare}
            isLiked={isLiked}
            isFavorited={isFavorited}
          />
        ) : (
          <>
            {/* Hero Section */}
            <div className="relative mb-8 overflow-hidden rounded-2xl">
              <img
                src={currentHeroSrc}
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

            {/* Hero Image Selector */}
            <div className="mb-12 flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Hero Style:</span>
              {HERO_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedHero === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedHero(option.value)}
                  className="transition-all"
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Products Section */}
            <section>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">
                    Featured Products
                  </h2>
                  <p className="text-muted-foreground">
                    Browse our collection of high-quality sports gear
                  </p>
                </div>
                <Button
                  onClick={() => setAddProductDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </div>
              
              <ProductList 
                products={filteredProducts}
                searchQuery={searchQuery}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onSearchChange={setSearchQuery}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                onClearFilters={handleClearFilters}
                onAdd={handleAddToCart}
                onViewDetails={handleViewDetails}
                onToggleLike={toggleLike}
                onToggleFavorite={toggleFavorite}
                onShare={handleShare}
                isLiked={isLiked}
                isFavorited={isFavorited}
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

      {/* Add Product Dialog */}
      <AddProductDialog
        open={addProductDialogOpen}
        onOpenChange={setAddProductDialogOpen}
        onAddProduct={handleAddProduct}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;
