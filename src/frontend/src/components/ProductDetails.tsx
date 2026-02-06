import { useState } from 'react';
import { type Product } from '../data/products';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

interface ProductDetailsProps {
  product: Product | null | undefined;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetails({ product, onBack, onAddToCart }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Handle product not found
  if (!product) {
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
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Product not found
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || ['/assets/generated/product-placeholder.dim_256x256.png'];
  const currentImage = images[selectedImageIndex] || images[0];

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src={currentImage}
              alt={`${product.name || 'Unnamed product'} - Image ${selectedImageIndex + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`overflow-hidden rounded-lg border-2 transition-all hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    selectedImageIndex === index
                      ? 'border-primary shadow-md'
                      : 'border-border'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {product.name || 'Unnamed product'}
            </h1>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-6 border-t border-border">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
