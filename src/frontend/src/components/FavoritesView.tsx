import { type Product } from '../data/products';
import { ArrowLeft, Heart, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FavoritesViewProps {
  products: Product[];
  onBack: () => void;
  onViewDetails: (productId: string) => void;
  onRemoveFavorite: (productId: string) => void;
}

export function FavoritesView({
  products,
  onBack,
  onViewDetails,
  onRemoveFavorite,
}: FavoritesViewProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Favorites</h1>
        <p className="text-muted-foreground">
          Products you've marked as favorites
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full bg-muted p-6 mb-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            No favorites yet
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Start adding products to your favorites to see them here.
          </p>
          <Button onClick={onBack}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/50"
            >
              <div
                className="aspect-square overflow-hidden bg-muted cursor-pointer"
                onClick={() => onViewDetails(product.id)}
              >
                <img
                  src={product.images?.[0] || '/assets/generated/product-placeholder.dim_256x256.png'}
                  alt={product.name || 'Unnamed product'}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3
                  className="text-lg font-semibold tracking-tight mb-1 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => onViewDetails(product.id)}
                >
                  {product.name || 'Unnamed product'}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onViewDetails(product.id)}
                      aria-label="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onRemoveFavorite(product.id)}
                      aria-label="Remove from favorites"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
