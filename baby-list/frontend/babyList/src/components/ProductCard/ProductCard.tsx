import { useNavigate } from "react-router-dom"
import type { Product } from "../../types/Product"

interface Props {
  product: Product
  onByAll?: () => void
  onDelete?: (id: string) => void
  hideStatus?: boolean
}

export function ProductCard({ product, onByAll, onDelete, hideStatus }: Props) {
  const remaining = product.quantityNeeded - product.quantityBought
  const Comprados = `${product.quantityBought} / ${product.quantityNeeded}`
  // const valorUni = product.quantityBought / product.quantityNeeded
  // const valorTotal = product.quantityBought / product.quantityNeeded

  const navigate = useNavigate()

  const handleEdit = () => {
    navigate("/add", { state: { productToEdit: product } })
  }

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Comprados: {Comprados}</p>
     {!hideStatus && (
        <>
          
          <p>Faltam: {remaining}</p>
        </>
      )}
      {/* {product.totalSpent && <p>Valor: ${product.totalSpent}</p>}
      {product.totalSpent && <p>Valor: ${product.totalSpent}</p>} */}

      <div className="card-buttons">
        {onByAll && (
          <button onClick={onByAll} className="btn-complete">
            Comprado
          </button>
        )}

        <button onClick={handleEdit} className="btn-edit">
          Editar
        </button>

        {onDelete && (
          <button onClick={() => onDelete(product.id)} className="btn-delete">
            Deletar
          </button>
        )}
      </div>
    </div>
  )
}