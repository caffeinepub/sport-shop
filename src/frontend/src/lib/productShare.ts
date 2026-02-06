import { type Product } from '../data/products';

interface ShareResult {
  success: boolean;
  message?: string;
}

export function buildProductLink(productId: string): string {
  const url = new URL(window.location.href);
  url.searchParams.set('productId', productId);
  return url.toString();
}

export async function shareProduct(product: Product): Promise<ShareResult> {
  const shareUrl = buildProductLink(product.id);
  const shareData = {
    title: product.name,
    text: `Check out ${product.name} - $${product.price.toFixed(2)}`,
    url: shareUrl,
  };

  // Check if Web Share API is available
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true };
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name === 'AbortError') {
        return { success: false };
      }
      // Fall through to clipboard fallback
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(shareUrl);
    return { success: true, message: 'Link copied to clipboard' };
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return { success: false, message: 'Failed to share product' };
  }
}
