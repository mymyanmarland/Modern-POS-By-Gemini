
import React from 'react';
import { CashIcon, CreditCardIcon } from './Icons';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ total, onClose, onPaymentSuccess }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all duration-300 scale-95 animate-scale-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Confirm Payment</h2>
          <p className="text-slate-500 mt-2">Total Amount Due</p>
          <p className="text-5xl font-extrabold text-indigo-600 my-6">${total.toFixed(2)}</p>
        </div>
        
        <div className="space-y-4">
            <button
              onClick={onPaymentSuccess}
              className="w-full flex items-center justify-center gap-3 text-lg font-bold py-4 px-6 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <CashIcon className="w-7 h-7" /> Pay with Cash
            </button>
            <button
              onClick={onPaymentSuccess}
              className="w-full flex items-center justify-center gap-3 text-lg font-bold py-4 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <CreditCardIcon className="w-7 h-7" /> Pay with Card
            </button>
        </div>
        
        <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
            >
              Cancel Payment
            </button>
        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default PaymentModal;
