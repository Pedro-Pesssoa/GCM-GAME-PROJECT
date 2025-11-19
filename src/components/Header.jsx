import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">QuizPlanet</a>
        
        <button 
          className="menu-toggle" 
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>

        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li><a href="/#jogo">Jogo</a></li>
            <li><a href="/#sobre-o-jogo">Sobre o Jogo</a></li>
            <li><a href="/#tecnologias">Tecnologias</a></li>
            <li><a href="/#desenvolvedores">Desenvolvedores</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;