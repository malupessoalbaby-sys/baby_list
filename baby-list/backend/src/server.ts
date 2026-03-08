import "dotenv/config"
import express from "express"
import cors from "cors"
import productRoutes from "./routes/productRoutes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", productRoutes)

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running")
})