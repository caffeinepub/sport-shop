import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  addressLine: string;
  city: string;
  postalCode: string;
}

export interface CreateOrderRequest {
  customerInfo: CustomerInfo;
  items: OrderItem[];
}

export interface backendInterface {
  createOrder: (request: CreateOrderRequest) => Promise<string>;
}
