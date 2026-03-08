import { useEffect, useState } from "react"
import { api } from "../../services/api"
import type { Product } from "../../types/Product"
import { ProductCard } from "../../components/ProductCard/ProductCard"
import "./Home.css";

export function Home() {
  const [products, setProducts] = useState<Product[]>([])

  async function fetchProducts() {
    const res = await api.get("/products")
    setProducts(res.data)
  }

  const handleBuyAll = async (product: Product) => {
    await api.patch(`/products/${product.id}`, { quantityBought: product.quantityNeeded })
    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`) 

      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err: any) {
      console.error(err)
      const message = err.response?.data?.message || "Não foi possível deletar o produto"
      alert(message)
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

