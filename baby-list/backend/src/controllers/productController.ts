import { Request, Response } from "express"
import { supabase } from "../lib/supabase"

export const getProducts = async (req: Request, res: Response) => {

const { data, error } = await supabase
  .from("pending_products")
  .select("*")

  if (error) return res.status(500).json(error)

  res.json(data)
}


export const getPurchasedProducts = async (req: Request, res: Response) => {

const { data, error } = await supabase
  .from("purchased_products")
  .select("*")

  if (error) return res.status(500).json(error)

  res.json(data)
}


export const createProduct = async (req: Request, res: Response) => {

  const { name, price, quantityNeeded, category } = req.body

  if (!name || !quantityNeeded) {
    return res.status(400).json({
      error: "Nome e quantidade necessários"
    })
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      name,
      category,
      price,
      quantity_needed: quantityNeeded,
      quantity_bought: 0,
      total_spent: 0
    })
    .select()
    .single()

  if (error) return res.status(500).json(error)

  res.status(201).json(data)
}


export const updateProduct = async (req: Request, res: Response) => {

  const { id } = req.params
  const { quantityBought, name, price, quantityNeeded } = req.body

  let totalSpent = 0

  if (price && quantityBought) {
    totalSpent = price * quantityBought
  }

  const { data, error } = await supabase
    .from("products")
    .update({
      name,
      price,
      quantity_needed: quantityNeeded,
      quantity_bought: quantityBought,
      total_spent: totalSpent
    })
    .eq("id", id)
    .select()
    .single()

  if (error) return res.status(500).json(error)

  res.json(data)
}


export const deleteProduct = async (req: Request, res: Response) => {

  const { id } = req.params

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) return res.status(500).json(error)

  res.json({ message: "Product deleted" })
}