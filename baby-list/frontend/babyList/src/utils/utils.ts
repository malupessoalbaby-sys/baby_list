import type { Product } from "../types/Product"

export function mapDbProductToFrontend(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: dbProduct.category,
    price: dbProduct.price,
    quantityNeeded: dbProduct.quantity_needed,
    quantityBought: dbProduct.quantity_bought,
    createdAt: new Date(dbProduct.created_at),
    totalSpent: dbProduct.total_spent
  }
}