import { useState, useEffect } from 'react';

const STORAGE_KEY = 'vikash-sports-hero-image';
const DEFAULT_HERO = 'option-a';

export type HeroImageOption = 'option-a' | 'option-b' | 'option-c';

export function useHeroImagePreference() {
  const [selectedHero, setSelectedHero] = useState<HeroImageOption>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['option-a', 'option-b', 'option-c'].includes(stored)) {
        return stored as HeroImageOption;
      }
    } catch (error) {
      console.error('Failed to read hero image preference:', error);
    }
    return DEFAULT_HERO;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, selectedHero);
    } catch (error) {
      console.error('Failed to save hero image preference:', error);
    }
  }, [selectedHero]);

  return {
    selectedHero,
    setSelectedHero,
  };
}
