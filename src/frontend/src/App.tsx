import { useState } from 'react';
import { SportsShopHeader } from './components/SportsShopHeader';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { products, type Product } from './data/products';
import { Heart } from 'lucide-react';

function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleViewDetails = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  // Find the selected product
  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId) 
    : null;

  return (
    <div className="min-h-screen bg-background">
      <SportsShopHeader cartCount={cart.length} />
      
      <main className="container py-8">
        {selectedProductId ? (
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
                alt="Sports Shop Hero"
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
