'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chocolate } from '@/lib/data';

export interface CartItem {
  chocolate: Chocolate;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (chocolate: Chocolate, quantity?: number) => void;
  removeFromCart: (chocolateId: string) => void;
  updateQuantity: (chocolateId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  notification: string | null;
  dismissNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('chocolate_shop_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('chocolate_shop_cart', JSON.stringify(items));
      } catch {
        // Ignore storage errors
      }
    }
  }, [items, isLoaded]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const dismissNotification = () => setNotification(null);

  const addToCart = (chocolate: Chocolate, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.chocolate.id === chocolate.id);
      if (existing) {
        return prev.map((item) =>
          item.chocolate.id === chocolate.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { chocolate, quantity }];
    });
    showNotification(`Added ${chocolate.name} (${quantity}x) to your bag`);
  };

  const removeFromCart = (chocolateId: string) => {
    setItems((prev) => prev.filter((item) => item.chocolate.id !== chocolateId));
  };

  const updateQuantity = (chocolateId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(chocolateId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.chocolate.id === chocolateId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.chocolate.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        notification,
        dismissNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
