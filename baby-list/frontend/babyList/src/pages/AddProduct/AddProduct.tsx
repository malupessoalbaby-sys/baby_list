import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { createProduct, updateProduct } from "../../services/products"
import type { Product } from "../../types/Product"
import "./AddProduct.css"

export function AddProduct() {
  const navigate = useNavigate()
  const location = useLocation()
  const productToEdit = location.state?.productToEdit as Product | undefined

  const [name, setName] = useState("")
  const [price, setPrice] = useState<number | undefined>()
  const [quantityNeeded, setQuantityNeeded] = useState<number | undefined>()
  const [quantityBought, setQuantityBought] = useState<number | undefined>()
  const [category, setCategory] = useState("")

  const categories = ["Roupas", "Fraldas", "Higiene", "Mamãe", "Remedios", "Móveis"]

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name)
      setPrice(productToEdit.price)
      setQuantityNeeded(productToEdit.quantityNeeded)
      setQuantityBought(productToEdit.quantityBought)
      setCategory(productToEdit.category || "")
    }
  }, [productToEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, {
          name,
          price,
          quantityNeeded,
          quantityBought,
          category
        })
      } else {
        await createProduct({
          name,
          price,
          quantityNeeded: Number(quantityNeeded!),
          quantityBought,
          category
        })
      }

      navigate("/")
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar produto")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{productToEdit ? "Editar Produto" : "Adicionar Produto"}</h2>

      <div className="form-group">
        <label htmlFor="name">Nome:</label>
        <input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Preço unitário:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantityNeeded">Quantidade necessária:</label>
        <input
          id="quantityNeeded"
          type="number"
          value={quantityNeeded}
          onChange={e => setQuantityNeeded(Number(e.target.value))}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantityBought">Quantidade comprada:</label>
        <input
          id="quantityBought"
          type="number"
          value={quantityBought}
          onChange={e => setQuantityBought(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoria:</label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecione uma categoria
          </option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">
        {productToEdit ? "Salvar Alterações" : "Adicionar Produto"}
      </button>
    </form>
  )
}