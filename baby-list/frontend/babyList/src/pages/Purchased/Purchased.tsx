import { useEffect, useState } from "react"
import { api } from "../../services/api"
import type { Product } from "../../types/Product"
import { ProductCard } from "../../components/ProductCard/ProductCard"
import "./Purchased.css"

export function Purchased() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    api.get("/products/purchased").then(res => {
      setProducts(res.data)
    })
  }, [])

  // Agrupa por categoria igual ao Home
  const grouped: Record<string, Product[]> = products.reduce((acc, p) => {
    const key = p.category || "Sem Categoria"
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {} as Record<string, Product[]>)

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <div className="containerCards" key={category}>
          <p className="categoryTitle">{category}</p>

          <div className="productsRow">
            {items.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onByAll={undefined} 
                onDelete={undefined}
                hideStatus={true}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}