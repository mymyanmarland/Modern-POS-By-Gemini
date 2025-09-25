
import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart }) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);
  
  const CategoryButton: React.FC<{ category: string }> = ({ category }) => {
    const isActive = category === selectedCategory;
    const baseClasses = "px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
    const activeClasses = "bg-indigo-500 text-white shadow";
    const inactiveClasses = "bg-white text-slate-600 hover:bg-slate-100";
    return (
        <button 
            onClick={() => setSelectedCategory(category)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {category}
        </button>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-700">Products</h2>
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-slate-200">
        {categories.map(cat => (
          <CategoryButton key={cat} category={cat} />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
