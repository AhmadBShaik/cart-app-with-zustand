'use client'

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import axios from 'axios'
import Image from "next/image";
import React from "react";
import { IProduct } from "@/types/product";
import { useCartBoundStore } from "@/providers/CartStoreProvider";
import { Basket, Cart } from "@/icons";
import Link from "next/link";


export default function ProductListing() {

  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = Number(searchParams.get('current_page'))
  const perPage = Number(searchParams.get('per_page'))
  const current_page = !isNaN(currentPage) && currentPage !== 0 ? currentPage : 1
  const per_page = !isNaN(perPage) && currentPage !== 0 ? perPage : 4
  const fetchProducts = async () => {
    const response = await axios.get(`/api/products?current_page=${current_page}&per_page=${per_page}`)
    return response
  }
  const response = useQuery({
    queryKey: ['products', currentPage, perPage],
    queryFn: fetchProducts
  })
  const perPageOptions = [
    { value: 4, label: 4 },
    { value: 6, label: 6 },
    { value: 8, label: 8 },
    { value: 10, label: 10 },
  ]

  const handlePrevClick = (): void => {
    router.push(`/?current_page=${current_page - 1}&per_page=${per_page}`)
  }
  const handleNextClick = (): void => {
    router.push(`/?current_page=${current_page + 1}&per_page=${per_page}`)

  }
  const handleSelectedPerPageOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    router.push(`/?current_page=1&per_page=${e.target.value}`)

  }
  const cartStore = useCartBoundStore()

  return (
    <div className="my-10 space-y-5 max-w-xl mx-auto px-5">
      <h1 className="text-3xl text-center text-green-600 font-bold">Products</h1>
      <div className="flex justify-end">
        <Link href={'/cart'} className="relative inline-block"><Cart className="size-10" /> <div className="text-sm bg-green-500 text-white rounded px-0.5 absolute -top-2 right-0 min-w-4 text-center">{cartStore.products.length}</div></Link>
      </div>
      {response.isLoading ? <div>Loading...</div> :
        <React.Fragment>
          <ul className="grid grid-cols-2 gap-4">
            {
              response.data
                ?.data
                ?.data
                .products
                .map((product: IProduct) => {
                  const isAdded = cartStore.products.find(existingProduct => existingProduct.id === product.id)
                  return <li key={product.id} className="border p-3 space-y-3 relative">

                    <div className="aspect-square relative">
                      <Image src={product.image} alt={`picture of ${product.name}`} fill />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="font-bold text-gray-600">{product.name}</h2>
                        <div className="font-bold">${product.price}</div>
                      </div>
                      {/* add / remove the product from the store */}
                      <div className={`rounded-full p-1.5 flex items-center justify-center cursor-pointer ${!!isAdded ? 'bg-green-600' : 'bg-gray-200'}`} onClick={() => {
                        if (!isAdded) {
                          cartStore.addProduct(product)
                        } else {
                          cartStore.removeProduct(product.id)
                        }
                      }} >
                        <Basket isSelected={!!isAdded} width={20} height={20} />
                      </div>
                    </div>
                  </li>
                })
            }
          </ul>
          <div className="pt-5 flex flex-col md:flex-row gap-5 justify-between items-center">
            <label className="flex justify-center items-center">

              <select className="py-2.5 px-2 cursor-pointer"
                value={per_page}
                onChange={handleSelectedPerPageOption}
              >
                {perPageOptions
                  .map(option =>
                    <option value={option.value} key={`option-${option.value}`}>
                      {option.label}
                    </option>
                  )}
              </select>
              <div>&nbsp;products per page</div>

            </label>
            <div className="space-x-5">
              <button className='px-5 py-2.5 rounded bg-green-500 text-white disabled:bg-gray-500 cursor-pointer disabled:cursor-not-allowed' onClick={handlePrevClick} disabled={!response.data?.data?.data.pagination.prev_page}>
                Previous
              </button>
              <button className='px-5 py-2.5 rounded bg-green-500 text-white disabled:bg-gray-500 cursor-pointer disabled:cursor-not-allowed' onClick={handleNextClick} disabled={!response.data?.data?.data.pagination.next_page}>
                Next
              </button>
            </div>
          </div>
        </React.Fragment>
      }
    </div>
  );
}