import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodItem } from '@/data/foodData';
import { useAuth } from './AuthContext';

export interface CartItem extends FoodItem {
  quantity: number;
}

export type OrderStatus = 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: OrderStatus;
  paymentMethod: 'cod' | 'upi' | 'card';
  deliveryAddress: string;
  estimatedDelivery: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (paymentMethod: 'cod' | 'upi' | 'card', deliveryAddress: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
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

  const placeOrder = (paymentMethod: 'cod' | 'upi' | 'card', deliveryAddress: string): Order | null => {
    if (!user || items.length === 0) return null;

    const estimatedMinutes = 30 + Math.floor(Math.random() * 15);
    const estimatedDelivery = new Date(Date.now() + estimatedMinutes * 60 * 1000).toISOString();

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      userId: user.id,
      items: [...items],
      total: totalPrice,
      date: new Date().toISOString(),
      status: 'confirmed',
      paymentMethod,
      deliveryAddress,
      estimatedDelivery
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem(`healthfood_orders_${user.id}`, JSON.stringify(updatedOrders));
    clearCart();

    // Simulate order status progression
    simulateOrderProgress(newOrder.id);

    return newOrder;
  };

  const simulateOrderProgress = (orderId: string) => {
    // Preparing after 5 seconds
    setTimeout(() => {
      updateOrderStatus(orderId, 'preparing');
    }, 5000);

    // Out for delivery after 15 seconds
    setTimeout(() => {
      updateOrderStatus(orderId, 'out_for_delivery');
    }, 15000);

    // Delivered after 30 seconds
    setTimeout(() => {
      updateOrderStatus(orderId, 'delivered');
    }, 30000);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => {
      const updated = prev.map(o => 
        o.id === orderId ? { ...o, status } : o
      );
      if (user) {
        localStorage.setItem(`healthfood_orders_${user.id}`, JSON.stringify(updated));
      }
      return updated;
    });
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
      updateOrderStatus,
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
