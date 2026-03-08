import { useEffect, useState } from "react"
import { deleteProduct, getPurchasedProducts } from "../../services/products"
import type { Product } from "../../types/Product"
import { ProductCard } from "../../components/ProductCard/ProductCard"
import "./Purchased.css"

export function Purchased() {
  const [products, setProducts] = useState<Product[]>([])

  async function fetchPurchasedProducts() {
    try {
      const data = await getPurchasedProducts()
      setProducts(data)
    } catch (err) {
      console.error(err)
      alert("Erro ao carregar produtos comprados")
    }
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
    fetchPurchasedProducts()
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
            {items.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onByAll={undefined}
                onDelete={() => handleDelete(p.id)}
                hideStatus={true}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}