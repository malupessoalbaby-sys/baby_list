import { useEffect, useState } from "react"
import {
  getProducts,
  updateProduct,
  deleteProduct
} from "../../services/products"

import type { Product } from "../../types/Product"
import { ProductCard } from "../../components/ProductCard/ProductCard"
import "./Home.css"

export function Home() {
  const [products, setProducts] = useState<Product[]>([])

  async function fetchProducts() {
    const data = await getProducts()
    setProducts(data)
  }

  const handleBuyAll = async (product: Product) => {
    await updateProduct(product.id, {
      quantityBought: product.quantityNeeded,
      price: product.price
    })

    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)

      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error(err)
      alert("Não foi possível deletar o produto")
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const grouped: Record<string, Product[]> = products.reduce((acc, p) => {
    const key = p.category || "Sem Categoria"
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {} as Record<string, Product[]>)

  if (products.length === 0) {
    return <p className="notHasProdutsToPurchase">Não há produtos cadastrados para serem comprados</p>
  }

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <div className="containerCards" key={category}>
          <p className="categoryTitle">{category}</p>

          <div className="productsRow">
            {items.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onByAll={() => handleBuyAll(p)}
                onDelete={() => handleDelete(p.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}