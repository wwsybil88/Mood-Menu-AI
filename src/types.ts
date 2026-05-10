export interface Dish {
  name: string;
  reason: string;
  vibe: string;
  description: string;
  tags: string[];
  imageUrl: string;
  selfCareTip: string;
  ingredients: string[];
  instructions: string[];
}

export interface LiteraryQuote {
  text: string;
  source: string;
  category: 'zh' | 'en' | 'jk' | 'eu' | 'la'; // Chinese, English/American, Japanese/Korean, European, Latin American
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  name: string;
  introduction: string;
  taste: string;
  recipe: string[];
  moodEffect: string;
}

export interface UserHistoryItem {
  timestamp: number;
  mood: string;
  emotions: { name: string; percentage: number; color: string }[];
  dish: Dish;
}

export interface MoodAnalysis {
  emotions: {
    name: string;
    percentage: number;
    color: string;
  }[];
  dish: Dish;
}

export type Language = 'en' | 'zh';
