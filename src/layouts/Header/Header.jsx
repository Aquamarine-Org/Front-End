import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "@assets/logo.png";

import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="Logo da Aquamarine" />

          <span>AQUAMARINE</span>
        </Link>

        <button 
          className="navbar-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>Início</Link>
          <Link to="/sobre" onClick={closeMenu}>Sobre nós</Link>
          <Link to="/produto" onClick={closeMenu}>Produto</Link>
          <Link to="/avaliacoes" onClick={closeMenu}>Avaliações</Link>
          <Link to="/planos" onClick={closeMenu}>Planos</Link>
          <Link to="/parceiros" onClick={closeMenu}>Parceiros</Link>
          <Link to="/suporte" onClick={closeMenu}>Suporte</Link>
        </nav>

        <div className="navbar-actions">
          <Link to="/login" onClick={closeMenu}>
            <button className="navbar-login-button">Entrar</button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
