'use client'

import Image from "next/image";
import React from "react";
import { IProduct } from "@/types/product";
import { useCartBoundStore } from "@/providers/CartStoreProvider";
import Link from "next/link";
import { CrossRounded } from "@/icons/CrossRounded";


export default function CartListing() {
  const cartStore = useCartBoundStore()
  return (
    <div className="my-10 space-y-5 max-w-xl mx-auto px-5">
      <h1 className="text-3xl text-center text-green-600 font-bold">Cart</h1>
      {cartStore.products.length ?
        <div className="flex justify-end">
          <Link href={'/'} className="text-green-600 font-bold">Add more</Link>
        </div>
        : null}
      {cartStore.products.length ?
        <ul className="flex flex-col gap-4">
          {cartStore.products
            .map((product: IProduct) => {
              return <li key={product.id} className="flex border p-3 space-x-5 relative">

                <div className="aspect-square relative w-full max-w-20">
                  <Image src={product.image} alt={`picture of ${product.name}`} fill />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="font-bold text-gray-600">{product.name}</h2>
                    <div className="font-bold">${product.price}</div>
                  </div>
                  <CrossRounded
                    className="cursor-pointer"
                    onClick={() => {
                      cartStore.removeProduct(product.id)
                    }} />
                </div>
              </li>
            })}
        </ul>
        : <div className="text-center space-y-3">
          <div className="mt-20"
          >
            No cart items
          </div>
          <div>
            <Link href={'/'} className="text-green-600 font-bold">Add some</Link>
          </div>
        </div>}
    </div>
  );
}