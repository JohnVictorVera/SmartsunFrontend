import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-navbar">
      <div className="header-left">
        <img src="/images/SmartsunLogo.png" alt="Smart Sun Logo" className="header-logo" />
        <span className="header-label">Smart Sun</span>
      </div>
      <div className="header-right">
        <a href="#calcular" className="header-btn">Calcular</a>
        <a href="#consultar" className="header-btn">Consultar</a>
        <button
          className="header-btn"
          onClick={() => navigate("/login")}
        >
          Acessar
        </button>
        <button
          className="header-btn secondary"
          onClick={() => navigate("/register")}
        >
          Criar conta
        </button>
        <button
          className="header-btn"
          onClick={() => navigate("/users")}
        >
          Teste
        </button>
      </div>
    </header>
  );
};

export default Header;