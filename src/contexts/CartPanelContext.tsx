import { createContext, useContext, useState, type ReactNode } from 'react';

interface CartPanelContextValues {
  isCartOpen: boolean;
  setIsCartOpen: (arg: boolean) => void;
}

const CartPanelContext = createContext<CartPanelContextValues | null>(null);

export function useCartPanel() {
  const value = useContext(CartPanelContext);

  if (!value) {
    throw new Error('useCartPanel() must be used within CartPanelContextProvider');
  }

  return value;
}

export function CartPanelContextProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return <CartPanelContext value={{ isCartOpen, setIsCartOpen }}>{children}</CartPanelContext>;
}
