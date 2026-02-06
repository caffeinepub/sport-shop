import { useState } from 'react';
import { Plus, X, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProduct: (product: {
    name: string;
    price: number;
    description: string;
    images: string[];
  }) => void;
}

interface FormErrors {
  name?: string;
  price?: string;
  description?: string;
  images?: string[];
}

interface ImageLoadState {
  [index: number]: 'loading' | 'success' | 'error';
}

export function AddProductDialog({
  open,
  onOpenChange,
  onAddProduct,
}: AddProductDialogProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [imageLoadStates, setImageLoadStates] = useState<ImageLoadState>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [saveError, setSaveError] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImageUrls(['']);
    setImageLoadStates({});
    setErrors({});
    setSaveError(null);
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Product name must be at least 2 characters';
    }

    // Validate price
    const priceNum = parseFloat(price);
    if (!price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(priceNum) || !isFinite(priceNum)) {
      newErrors.price = 'Price must be a valid number';
    } else if (priceNum <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    // Validate description
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Validate image URLs
    const imageErrors: string[] = [];
    const nonEmptyUrls = imageUrls.filter((url) => url.trim() !== '');
    
    if (nonEmptyUrls.length === 0) {
      imageErrors.push('At least one image URL is required');
    } else {
      imageUrls.forEach((url, index) => {
        if (url.trim() !== '') {
          try {
            new URL(url.trim());
          } catch {
            imageErrors[index] = 'Invalid URL format';
          }
        }
      });
    }

    if (imageErrors.length > 0) {
      newErrors.images = imageErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    setSaveError(null);

    if (!validateForm()) {
      return;
    }

    try {
      const validImageUrls = imageUrls
        .map((url) => url.trim())
        .filter((url) => url !== '');

      onAddProduct({
        name: name.trim(),
        price: parseFloat(price),
        description: description.trim(),
        images: validImageUrls,
      });

      toast.success('Product added successfully');
      resetForm();
      onOpenChange(false);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : 'Failed to save product. Please try again.'
      );
    }
  };

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleRemoveImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
      // Clear error and load state for this index
      if (errors.images) {
        const newImageErrors = [...errors.images];
        newImageErrors.splice(index, 1);
        setErrors({ ...errors, images: newImageErrors.length > 0 ? newImageErrors : undefined });
      }
      const newLoadStates = { ...imageLoadStates };
      delete newLoadStates[index];
      setImageLoadStates(newLoadStates);
    }
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    
    // Clear error for this field when user types
    if (errors.images?.[index]) {
      const newImageErrors = [...errors.images];
      newImageErrors[index] = '';
      setErrors({ ...errors, images: newImageErrors });
    }

    // Reset load state when URL changes
    if (value.trim() === '') {
      const newLoadStates = { ...imageLoadStates };
      delete newLoadStates[index];
      setImageLoadStates(newLoadStates);
    }
  };

  const handleImageLoad = (index: number) => {
    setImageLoadStates(prev => ({ ...prev, [index]: 'success' }));
  };

  const handleImageError = (index: number) => {
    setImageLoadStates(prev => ({ ...prev, [index]: 'error' }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your catalog.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {saveError && (
            <Alert variant="destructive">
              <AlertDescription>{saveError}</AlertDescription>
            </Alert>
          )}

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="product-name">
              Product Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="product-name"
              placeholder="e.g., Basketball"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="product-price">
              Price ($) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="product-price"
              type="number"
              placeholder="e.g., 49.99"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors({ ...errors, price: undefined });
              }}
              className={errors.price ? 'border-destructive' : ''}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="product-description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="product-description"
              placeholder="Describe the product features and benefits..."
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description)
                  setErrors({ ...errors, description: undefined });
              }}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Image URLs */}
          <div className="space-y-3">
            <Label>
              Image URLs <span className="text-destructive">*</span>
            </Label>
            <p className="text-sm text-muted-foreground">
              Add at least one image URL for your product
            </p>

            {imageUrls.map((url, index) => (
              <div key={index} className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      className={
                        errors.images?.[index] ? 'border-destructive' : ''
                      }
                    />
                    {errors.images?.[index] && (
                      <p className="text-sm text-destructive">
                        {errors.images[index]}
                      </p>
                    )}
                  </div>
                  {imageUrls.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveImageUrl(index)}
                      aria-label="Remove image URL"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Image Preview */}
                {url.trim() !== '' && (
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-muted/30">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
                      {imageLoadStates[index] !== 'error' && (
                        <img
                          src={url.trim()}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onLoad={() => handleImageLoad(index)}
                          onError={() => handleImageError(index)}
                        />
                      )}
                      {imageLoadStates[index] === 'error' && (
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src="/assets/generated/product-placeholder.dim_256x256.png"
                            alt="Fallback"
                            className="w-full h-full object-cover opacity-50"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {imageLoadStates[index] === 'success' && (
                        <p className="text-sm text-muted-foreground">Preview loaded successfully</p>
                      )}
                      {imageLoadStates[index] === 'error' && (
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-destructive">
                            Failed to load image. Please check the URL. You can still save the product.
                          </p>
                        </div>
                      )}
                      {!imageLoadStates[index] && (
                        <p className="text-sm text-muted-foreground">Loading preview...</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {errors.images && typeof errors.images[0] === 'string' && !imageUrls.some(url => url.trim()) && (
              <p className="text-sm text-destructive">{errors.images[0]}</p>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddImageUrl}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Another Image URL
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
