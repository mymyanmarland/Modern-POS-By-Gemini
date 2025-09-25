
import React from 'react';
import type { OrderItem } from '../types';

interface ReceiptViewProps {
  order: OrderItem[];
  totals: {
    subtotal: number;
    tax: number;
    total: number;
  };
  onNewOrder: () => void;
}

const ReceiptView: React.FC<ReceiptViewProps> = ({ order, totals, onNewOrder }) => {
  const transactionId = React.useMemo(() => `TXN-${Date.now().toString().slice(-6)}`, []);
  const transactionDate = React.useMemo(() => new Date().toLocaleString(), []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <div className="text-center pb-8 border-b-2 border-dashed border-slate-300">
            <h2 className="text-3xl font-bold text-slate-800">Thank You!</h2>
            <p className="text-slate-500 mt-1">Your order has been processed.</p>
        </div>
        <div className="py-6 space-y-1 text-sm text-slate-600">
            <div className="flex justify-between"><span className="font-semibold">Transaction ID:</span> <span>{transactionId}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Date:</span> <span>{transactionDate}</span></div>
        </div>
        <div className="py-6 border-y-2 border-dashed border-slate-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h3>
            <div className="space-y-3">
                {order.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-slate-700">
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-slate-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                        </div>
                        <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="py-6 space-y-2">
            <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="font-medium">${totals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-slate-800 mt-2">
                <span>Total Paid</span>
                <span>${totals.total.toFixed(2)}</span>
            </div>
        </div>

        <div className="mt-8">
            <button
                onClick={onNewOrder}
                className="w-full bg-indigo-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-200"
            >
                Start New Order
            </button>
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default ReceiptView;
