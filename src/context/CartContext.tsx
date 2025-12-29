import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodItem } from '@/data/foodData';
import { useAuth } from './AuthContext';

interface CartItem extends FoodItem {
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const storedOrders = localStorage.getItem(`healthfood_orders_${user.id}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } else {
      setOrders([]);
    }
    setItems([]);
  }, [user]);

  const addToCart = (item: FoodItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const placeOrder = () => {
    if (!user || items.length === 0) return;

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      userId: user.id,
      items: [...items],
      total: totalPrice,
      date: new Date().toISOString()
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem(`healthfood_orders_${user.id}`, JSON.stringify(updatedOrders));
    clearCart();
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
