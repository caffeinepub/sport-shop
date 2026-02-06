import { useState, useEffect } from 'react';

interface ProductReactions {
  likes: Set<string>;
  favorites: Set<string>;
}

const STORAGE_KEY = 'vikash-sports-reactions';

function loadReactions(): ProductReactions {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        likes: new Set(parsed.likes || []),
        favorites: new Set(parsed.favorites || []),
      };
    }
  } catch (error) {
    console.error('Failed to load reactions from localStorage:', error);
  }
  return { likes: new Set(), favorites: new Set() };
}

function saveReactions(reactions: ProductReactions): void {
  try {
    const toStore = {
      likes: Array.from(reactions.likes),
      favorites: Array.from(reactions.favorites),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    console.error('Failed to save reactions to localStorage:', error);
  }
}

export function useProductReactions() {
  const [reactions, setReactions] = useState<ProductReactions>(loadReactions);

  useEffect(() => {
    saveReactions(reactions);
  }, [reactions]);

  const toggleLike = (productId: string) => {
    setReactions((prev) => {
      const newLikes = new Set(prev.likes);
      if (newLikes.has(productId)) {
        newLikes.delete(productId);
      } else {
        newLikes.add(productId);
      }
      return { ...prev, likes: newLikes };
    });
  };

  const toggleFavorite = (productId: string) => {
    setReactions((prev) => {
      const newFavorites = new Set(prev.favorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return { ...prev, favorites: newFavorites };
    });
  };

  const isLiked = (productId: string): boolean => {
    return reactions.likes.has(productId);
  };

  const isFavorited = (productId: string): boolean => {
    return reactions.favorites.has(productId);
  };

  const getFavoriteIds = (): string[] => {
    return Array.from(reactions.favorites);
  };

  return {
    toggleLike,
    toggleFavorite,
    isLiked,
    isFavorited,
    getFavoriteIds,
  };
}
