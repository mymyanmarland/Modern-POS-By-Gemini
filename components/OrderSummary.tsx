import React from 'react';
import type { OrderItem } from '../types';
import { PlusIcon, MinusIcon, TrashIcon } from './Icons';
// Fix: Import TAX_RATE to resolve 'Cannot find name' error.
import { TAX_RATE } from '../constants';

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearOrder: () => void;
  onCheckout: () => void;
}

const OrderItemRow: React.FC<{ item: OrderItem; onUpdateQuantity: OrderSummaryProps['onUpdateQuantity']; }> = ({ item, onUpdateQuantity }) => {
  return (
    <div className="flex items-center gap-4 py-3">
      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
      <div className="flex-grow">
        <p className="font-semibold text-slate-800">{item.name}</p>
        <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
          <MinusIcon className="w-4 h-4" />
        </button>
        <span className="w-6 text-center font-medium">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      <p className="w-16 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, subtotal, tax, total, onUpdateQuantity, onRemoveItem, onClearOrder, onCheckout }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-700">Current Order</h2>
        <button
          onClick={onClearOrder}
          disabled={items.length === 0}
          className="text-sm font-medium text-red-500 hover:text-red-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
        >
          <TrashIcon className="w-4 h-4" /> Clear
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-200 pr-2">
        {items.length === 0 ? (
          <p className="text-slate-500 text-center py-10">Your cart is empty.</p>
        ) : (
          items.map(item => <OrderItemRow key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} />)
        )}
      </div>
      <div className="mt-6 pt-6 border-t border-slate-200 space-y-2">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-slate-800 mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full bg-indigo-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;