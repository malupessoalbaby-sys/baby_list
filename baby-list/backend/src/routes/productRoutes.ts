import { Router } from "express"
import {
  getProducts,
  createProduct,
  updateProduct,
  getPurchasedProducts,
  deleteProduct
} from "../controllers/productController"

const router = Router()

router.get("/products", getProducts)
router.post("/products", createProduct)
router.patch("/products/:id", updateProduct)
router.get("/products/purchased", getPurchasedProducts)
router.delete("/products/:id", deleteProduct)


export default router