
import React from 'react';
import type { Product } from '../types';
import { PlusIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg hover:border-indigo-300">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-40 object-cover" 
        />
        <div 
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
           <button 
             onClick={() => onAddToCart(product)}
             className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             aria-label={`Add ${product.name} to order`}
            >
              <PlusIcon className="w-6 h-6" />
           </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 truncate">{product.name}</h3>
        <p className="text-slate-500 text-sm">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
