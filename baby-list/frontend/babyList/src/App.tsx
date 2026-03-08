import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Purchased } from "./pages/Purchased/Purchased"
import { AddProduct } from "./pages/AddProduct/AddProduct"
import { Navbar } from "./components/Navbar/Navbar"
import "./styles/global.css"

function App() {
  return (
    <BrowserRouter>
     <div className="layout">
        <Navbar />
        <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchased" element={<Purchased />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App