import { NextRequest } from 'next/server'
import products from '../../../../public/data/products.json'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const currentPage = Number(searchParams.get('current_page'))
  const perPage = Number(searchParams.get('per_page'))
  const current_page = (currentPage || currentPage === 0) && !isNaN((currentPage)) ? currentPage : 1
  const per_page = ((perPage) && !isNaN(perPage)) ? perPage : 5
  const total_pages = Math.ceil(products.length / per_page)

  const res = {
    status: "success",
    message: "Grocery products retrieved successfully",
    data: {
      products: current_page > 0 ? products.slice((current_page - 1) * per_page, ((current_page - 1) * per_page) + per_page) : [],
      "pagination": {
        "total_records": products.length,
        current_page,
        per_page,
        total_pages,
        next_page: current_page >= total_pages ? null : current_page + 1,
        prev_page: current_page <= 1 || current_page > total_pages ? null : current_page - 1
      }
    }
  }
  const data = res

  return Response.json({ data })
}