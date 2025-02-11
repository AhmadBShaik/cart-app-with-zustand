'use client'
import { JSX, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: ReactNode }): JSX.Element => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}