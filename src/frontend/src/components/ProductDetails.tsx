import { useState } from 'react';
import { type Product } from '../data/products';
import { ArrowLeft, ShoppingCart, Heart, Star, Share2, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductImageLightbox } from './ProductImageLightbox';

interface ProductDetailsProps {
  product: Product | null | undefined;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onToggleLike: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  onShare: (product: Product) => void;
  isLiked: (productId: string) => boolean;
  isFavorited: (productId: string) => boolean;
}

export function ProductDetails({ 
  product, 
  onBack, 
  onAddToCart,
  onToggleLike,
  onToggleFavorite,
  onShare,
  isLiked,
  isFavorited,
}: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  // Safe image handling with fallback
  const images = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : ['/assets/generated/product-placeholder.dim_256x256.png'];
  
  // Ensure selected index is in range
  const safeIndex = Math.min(selectedImageIndex, images.length - 1);
  const currentImage = images[safeIndex];
  const liked = isLiked(product.id);
  const favorited = isFavorited(product.id);
  const hasMultipleImages = images.length > 1;

  const handleShare = async () => {
    await onShare(product);
    setShareMessage('Link copied to clipboard');
    setTimeout(() => {
      setShareMessage(null);
    }, 2000);
  };

  const handlePreviousImage = () => {
    if (safeIndex > 0) {
      setSelectedImageIndex(safeIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (safeIndex < images.length - 1) {
      setSelectedImageIndex(safeIndex + 1);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/generated/product-placeholder.dim_256x256.png';
  };

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
          <div className="relative overflow-hidden rounded-2xl border border-border bg-muted group">
            <img
              src={currentImage}
              alt={`${product.name || 'Unnamed product'} - Image ${safeIndex + 1}`}
              className="w-full h-auto object-cover"
              onError={handleImageError}
            />
            
            {/* Fullscreen Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="View fullscreen"
            >
              <Maximize2 className="h-5 w-5" />
            </button>

            {/* Previous/Next Controls for Multiple Images */}
            {hasMultipleImages && (
              <>
                {safeIndex > 0 && (
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}
                {safeIndex < images.length - 1 && (
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {hasMultipleImages && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`overflow-hidden rounded-lg border-2 transition-all hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    safeIndex === index
                      ? 'border-primary shadow-md ring-2 ring-primary/20'
                      : 'border-border'
                  }`}
                  aria-label={`View image ${index + 1}`}
                  aria-current={safeIndex === index ? 'true' : 'false'}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                    onError={handleImageError}
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

            {/* Reaction Controls */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
              <Button
                variant="outline"
                onClick={() => onToggleLike(product.id)}
                className="flex-1 gap-2"
                aria-label={liked ? 'Unlike' : 'Like'}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => onToggleFavorite(product.id)}
                className="flex-1 gap-2"
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star className={`h-5 w-5 ${favorited ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                <span>{favorited ? 'Favorited' : 'Favorite'}</span>
              </Button>

              <div className="relative">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="gap-2"
                  aria-label="Share"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </Button>
                {shareMessage && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-foreground text-background text-sm rounded whitespace-nowrap z-10">
                    {shareMessage}
                  </div>
                )}
              </div>
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

      {/* Lightbox */}
      <ProductImageLightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        images={images}
        currentIndex={safeIndex}
        onNavigate={setSelectedImageIndex}
        productName={product.name || 'Product'}
      />
    </div>
  );
}
