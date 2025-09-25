
import React, { useState, useCallback, useMemo } from 'react';
import type { Product, OrderItem } from './types';
import { MOCK_PRODUCTS, TAX_RATE } from './constants';
import ProductCatalog from './components/ProductCatalog';
import OrderSummary from './components/OrderSummary';
import PaymentModal from './components/PaymentModal';
import ReceiptView from './components/ReceiptView';
import { SparklesIcon } from './components/Icons';

type AppView = 'pos' | 'receipt';

const App: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [view, setView] = useState<AppView>('pos');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ items: OrderItem[], totals: { subtotal: number; tax: number; total: number } } | null>(null);

  const subtotal = useMemo(() => {
    return orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [orderItems]);

  const tax = useMemo(() => {
    return subtotal * TAX_RATE;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  const addToOrder = useCallback((product: Product) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
    } else {
      setOrderItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  const removeFromOrder = useCallback((productId: number) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const clearOrder = useCallback(() => {
    setOrderItems([]);
  }, []);
  
  const handleCheckout = useCallback(() => {
    if(orderItems.length > 0) {
      setShowPaymentModal(true);
    }
  }, [orderItems.length]);

  const handlePaymentSuccess = useCallback(() => {
    setLastOrder({ 
        items: orderItems, 
        totals: { subtotal, tax, total }
    });
    clearOrder();
    setShowPaymentModal(false);
    setView('receipt');
  }, [orderItems, subtotal, tax, total, clearOrder]);

  const handleNewOrder = useCallback(() => {
    setLastOrder(null);
    setView('pos');
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-8 h-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-slate-700">Modern POS</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        {view === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProductCatalog onAddToCart={addToOrder} />
            </div>
            <div className="lg:col-span-1">
                <OrderSummary
                    items={orderItems}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeFromOrder}
                    onClearOrder={clearOrder}
                    onCheckout={handleCheckout}
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                />
            </div>
          </div>
        )}
        
        {view === 'receipt' && lastOrder && (
          <ReceiptView 
            order={lastOrder.items}
            totals={lastOrder.totals}
            onNewOrder={handleNewOrder}
          />
        )}
      </main>

      {showPaymentModal && (
        <PaymentModal
          total={total}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default App;
