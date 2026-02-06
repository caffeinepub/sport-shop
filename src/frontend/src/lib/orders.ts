import type { backendInterface } from '../backend';
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

// Local type definitions for order creation
interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

interface CustomerInfo {
  fullName: string;
  email: string;
  addressLine: string;
  city: string;
  postalCode: string;
}

interface CreateOrderRequest {
  customerInfo: CustomerInfo;
  items: OrderItem[];
}

export async function createOrder(
  actor: backendInterface,
  customerInfo: FormData,
  items: CartItem[]
): Promise<string> {
  const orderItems: OrderItem[] = items.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));

  const customerData: CustomerInfo = {
    fullName: customerInfo.fullName,
    email: customerInfo.email,
    addressLine: customerInfo.addressLine,
    city: customerInfo.city,
    postalCode: customerInfo.postalCode,
  };

  const request: CreateOrderRequest = {
    customerInfo: customerData,
    items: orderItems,
  };

  // Type assertion needed since backend interface is not yet implemented
  const orderId = await (actor as any).createOrder(request);

  return orderId;
}
