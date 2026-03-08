import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav">
      {/* Hamburger para mobile */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h2>Baby List 👶</h2>
      {/* Menu de links */}
      <div className={`menu ${menuOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Produtos a Comprar</Link>
        <Link to="/purchased" onClick={() => setMenuOpen(false)}>Comprados</Link>
        <Link to="/add" onClick={() => setMenuOpen(false)}>Adicionar Produto</Link>
      </div>
    </div>
  )
}