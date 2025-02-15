'use client'

import { IProduct } from "@/types/product"
import { createContext, useContext } from "react";
import { create } from "zustand";

interface CartStore {
  products: Array<IProduct>;
  addProduct: (product: IProduct) => void;
  removeProduct: (productId: string) => void;
}

const useCartStore = create<CartStore>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  removeProduct: (productId) => set((state) => ({ products: state.products.filter(product => product.id !== productId) }))
}))

const CartContext = createContext<ReturnType<typeof useCartStore> | null>(null)
export const CartStoreProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return <CartContext.Provider value={useCartStore()}>{children}</CartContext.Provider>
}

export const useCartBoundStore = (): CartStore => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartBoundStore must be used within CartStoreProvider")
  return context as CartStore
}