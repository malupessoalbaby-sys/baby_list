export interface Product {
  id: string
  name: string
  category?: string
  price?: number       
  quantityNeeded: number
  quantityBought: number
  createdAt: Date
  totalSpent?: number 
}