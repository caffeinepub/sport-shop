import type { backendInterface, CartItem as BackendCartItem } from '../backend';
import type { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface FormData {
  fullName: string;
  email: string;
  addressLine: string;
  city: string;
  postalCode: string;
}

export async function createOrder(
  actor: backendInterface,
  items: CartItem[]
): Promise<bigint> {
  // Convert cart items to backend format
  const backendItems: BackendCartItem[] = items.map((item) => ({
    productId: BigInt(item.product.id),
    quantity: BigInt(item.quantity),
  }));

  // Calculate total in cents
  const totalCents = items.reduce(
    (total, item) => total + Math.round(item.product.price * 100) * item.quantity,
    0
  );

  // Create order via backend
  const orderId = await actor.createOrder(backendItems, BigInt(totalCents));

  return orderId;
}
