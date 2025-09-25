
import type { Product } from './types';

export const TAX_RATE = 0.08; // 8% sales tax

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Espresso", price: 3.00, category: "Coffee", imageUrl: "https://picsum.photos/seed/espresso/400" },
  { id: 2, name: "Latte", price: 4.50, category: "Coffee", imageUrl: "https://picsum.photos/seed/latte/400" },
  { id: 3, name: "Cappuccino", price: 4.50, category: "Coffee", imageUrl: "https://picsum.photos/seed/cappuccino/400" },
  { id: 4, name: "Croissant", price: 3.50, category: "Pastry", imageUrl: "https://picsum.photos/seed/croissant/400" },
  { id: 5, name: "Muffin", price: 3.00, category: "Pastry", imageUrl: "https://picsum.photos/seed/muffin/400" },
  { id: 6, name: "Avocado Toast", price: 8.50, category: "Food", imageUrl: "https://picsum.photos/seed/toast/400" },
  { id: 7, name: "Orange Juice", price: 4.00, category: "Drinks", imageUrl: "https://picsum.photos/seed/oj/400" },
  { id: 8, name: "Iced Tea", price: 3.50, category: "Drinks", imageUrl: "https://picsum.photos/seed/icedtea/400" },
  { id: 9, name: "Bagel & Cream Cheese", price: 4.50, category: "Food", imageUrl: "https://picsum.photos/seed/bagel/400" },
  { id: 10, name: "Americano", price: 3.25, category: "Coffee", imageUrl: "https://picsum.photos/seed/americano/400" },
  { id: 11, name: "Pain au Chocolat", price: 4.00, category: "Pastry", imageUrl: "https://picsum.photos/seed/painchoc/400" },
  { id: 12, name: "Granola Bowl", price: 7.50, category: "Food", imageUrl: "https://picsum.photos/seed/granola/400" },
  { id: 13, name: "Cold Brew", price: 4.75, category: "Coffee", imageUrl: "https://picsum.photos/seed/coldbrew/400" },
  { id: 14, name: "Scone", price: 3.25, category: "Pastry", imageUrl: "https://picsum.photos/seed/scone/400" },
  { id: 15, name: "Breakfast Burrito", price: 9.00, category: "Food", imageUrl: "https://picsum.photos/seed/burrito/400" },
  { id: 16, name: "Kombucha", price: 5.00, category: "Drinks", imageUrl: "https://picsum.photos/seed/kombucha/400" },
];
