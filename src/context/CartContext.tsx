import React, { createContext, useContext, useEffect, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  meta?: Record<string, any>;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  // Drawer controls
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'liam-site:cart:v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as CartItem[];
    } catch (e) {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const [open, setOpen] = useState<boolean>(false);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);
  const toggleCart = () => setOpen(v => !v);

  const addItem = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, qty) } : i).filter(i => i.quantity > 0));
  };

  const clear = () => setItems([]);

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, total, open, openCart, closeCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

export default CartContext;
