import { type Product } from '../data/products';
import { Plus, Eye } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAdd: (product: Product) => void;
  onViewDetails: (productId: string) => void;
}

export function ProductList({ products, onAdd, onViewDetails }: ProductListProps) {
  return (
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
                <button
                  onClick={() => onViewDetails(product.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-secondary/80 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => onAdd(product)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
