import React, { Suspense } from "react";
import ProductListing from "@/components/ProductListing";

export default function Home() {
  return <Suspense>
    <ProductListing />
  </Suspense>
}