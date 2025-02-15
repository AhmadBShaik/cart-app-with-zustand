"use client";

import { IProduct } from "@/types/product";
import { createContext, useContext, useRef } from "react";
import { createStore } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { share, isSupported } from "shared-zustand";
import { useStore as useZustandStore } from "zustand";

interface CartStore {
  products: Array<IProduct>;
  addProduct: (product: IProduct) => void;
  removeProduct: (productId: string) => void;
}

const useCartStore = createStore<CartStore>()(
  subscribeWithSelector(persist((set) => ({
    products: [],
    addProduct: (product) =>
      set((state) => ({ products: [product, ...state.products] })),
    removeProduct: (productId) =>
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      })),
  }), {
    name: 'cart-storage'
  }))
);

const CartContext = createContext<typeof useCartStore | null>(null);
export const CartStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const cartStore = useRef(useCartStore);
  return (
    <CartContext.Provider value={cartStore.current}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartBoundStore = (): CartStore => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartBoundStore must be used within CartStoreProvider");
  return useZustandStore(context);
};

if ("BroadcastChannel" in globalThis || isSupported()) {
  // share the property "products" of the cart state with other tabs
  share("products", useCartStore);
}