import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { api } from "../../services/api"
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

 // Categorias fixas
  const categories = ["Alimentos", "Bebidas", "Higiene", "Eletrônicos", "Roupas"]


  // Preencher o formulário se estivermos editando
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name)
      setPrice(productToEdit.price)
      setQuantityNeeded(productToEdit.quantityNeeded)
      setQuantityBought(productToEdit.quantityBought)
      setCategory(productToEdit.category || "")
    }
  }, [productToEdit])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (productToEdit) {
      // PATCH para edição
      console.log(category)
      await api.patch(`/products/${productToEdit.id}`, {
        name,
        price: Number(price),
        quantityNeeded: Number(quantityNeeded),
        quantityBought: Number(quantityBought),
        category
      })
    } else {
      // POST para criação
      await api.post("/products", {
        name,
        price: Number(price),
        quantityNeeded: Number(quantityNeeded),
        quantityBought: Number(quantityBought),
        category
      })
    }

    navigate("/")
  }

  return (
 <form onSubmit={handleSubmit} className="form">
  <h2>{productToEdit ? "Editar Produto" : "Adicionar Produto"}</h2>

  <div className="form-group">
    <label htmlFor="name">Nome:</label>
    <input id="name" value={name} onChange={e => setName(e.target.value)} required />
  </div>

  <div className="form-group">
    <label htmlFor="price">Preço unitário:</label>
    <input id="price" type="text" value={price} onChange={e => setPrice(Number(e.target.value))} />
  </div>

  <div className="form-group">
    <label htmlFor="quantityNeeded">Quantidade necessária:</label>
    <input id="quantityNeeded" type="text" value={quantityNeeded} onChange={e => setQuantityNeeded(Number(e.target.value))} required />
  </div>

  <div className="form-group">
    <label htmlFor="quantityBought">Quantidade comprada (opcional):</label>
    <input id="quantityBought" type="text" value={quantityBought} onChange={e => setQuantityBought(Number(e.target.value))} required />
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

  <button type="submit">{productToEdit ? "Salvar Alterações" : "Adicionar Produto"}</button>
</form>
  )
}