import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ProductImageLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  productName: string;
}

export function ProductImageLightbox({
  open,
  onOpenChange,
  images,
  currentIndex,
  onNavigate,
  productName,
}: ProductImageLightboxProps) {
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      } else if (e.key === 'ArrowLeft' && hasMultipleImages && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && hasMultipleImages && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, currentIndex, images.length, hasMultipleImages, onNavigate, onOpenChange]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (open) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }
    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close Button */}
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </Button>
          </DialogClose>

          {/* Previous Button */}
          {hasMultipleImages && currentIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {/* Main Image */}
          <div className="flex items-center justify-center w-full h-full p-16">
            <img
              src={images[currentIndex]}
              alt={`${productName} - Image ${currentIndex + 1} of ${images.length}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Next Button */}
          {hasMultipleImages && currentIndex < images.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-4 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
