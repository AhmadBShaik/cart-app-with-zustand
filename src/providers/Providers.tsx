'use client'
import { JSX, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartStoreProvider } from "./CartStoreProvider";

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: ReactNode }): JSX.Element => {
  return <CartStoreProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </CartStoreProvider>

}