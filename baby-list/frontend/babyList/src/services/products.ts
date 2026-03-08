import { supabase } from "../lib/supabase"
import type { Product } from "../types/Product"
import { mapDbProductToFrontend } from "../utils/utils"

// Para listar produtos pendentes
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("pending_products")
    .select("*")

  if (error) throw error
  return data.map(mapDbProductToFrontend)
}

// Para listar produtos comprados
export async function getPurchasedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("purchased_products")
    .select("*")

  if (error) throw error
  return data.map(mapDbProductToFrontend)
}

// Criar um novo produto
export async function createProduct(product: {
  name: string
  category?: string
  price?: number
  quantityNeeded: number
  quantityBought?: number
}) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity_needed: product.quantityNeeded,
      quantity_bought: product.quantityBought ?? 0,
      total_spent: (product.price ?? 0) * (product.quantityBought ?? 0)
    })
    .select()
    .single()

  if (error) throw error
  return mapDbProductToFrontend(data)
}

// Atualizar produto existente
export async function updateProduct(
  id: string,
  payload: {
    name?: string
    category?: string
    price?: number
    quantityNeeded?: number
    quantityBought?: number
  }
) {
  let totalSpent = 0
  if (payload.price && payload.quantityBought) {
    totalSpent = payload.price * payload.quantityBought
  }

  const { data, error } = await supabase
    .from("products")
    .update({
      name: payload.name,
      category: payload.category,
      price: payload.price,
      quantity_needed: payload.quantityNeeded,
      quantity_bought: payload.quantityBought,
      total_spent: totalSpent
    })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return mapDbProductToFrontend(data)
}

// Deletar produto
export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) throw error
}