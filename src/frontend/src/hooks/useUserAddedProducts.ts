import { useState, useEffect } from 'react';
import { products as seededProducts, type Product } from '../data/products';

const STORAGE_KEY = 'vikash-sports-user-products';

interface UserProduct extends Product {
  isUserAdded: boolean;
}

function loadUserProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    // Silent fallback on load - only show errors on save
    console.error('Failed to load user products from localStorage:', error);
  }
  return [];
}

function saveUserProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    throw new Error('Failed to save product. Storage may be full.');
  }
}

function generateUniqueId(existingIds: Set<string>): string {
  // Generate IDs with 'user-' prefix to avoid collisions with seeded products
  let id: string;
  do {
    id = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  } while (existingIds.has(id));
  return id;
}

export function useUserAddedProducts() {
  const [userProducts, setUserProducts] = useState<Product[]>(loadUserProducts);

  // Merge seeded and user products
  const mergedProducts = [...seededProducts, ...userProducts];

  // Get all existing IDs for collision detection
  const existingIds = new Set(mergedProducts.map((p) => p.id));

  const addProduct = (productData: Omit<Product, 'id'>): void => {
    const newProduct: Product = {
      ...productData,
      id: generateUniqueId(existingIds),
    };

    const updatedUserProducts = [...userProducts, newProduct];
    
    // Atomic: only update state after successful persistence
    saveUserProducts(updatedUserProducts);
    setUserProducts(updatedUserProducts);
  };

  // Persist user products whenever they change
  useEffect(() => {
    try {
      saveUserProducts(userProducts);
    } catch (error) {
      // Silent on effect - errors are thrown from addProduct
    }
  }, [userProducts]);

  return {
    products: mergedProducts,
    addProduct,
  };
}
