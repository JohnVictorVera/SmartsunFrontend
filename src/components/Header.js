import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSwitchAccount = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header-navbar">
      <div className="header-left" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <img src="/images/SmartsunLogo.png" alt="Smart Sun Logo" className="header-logo" />
        <span className="header-label">Smart Sun</span>
      </div>
      <div className="header-right">
        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
            <a href="#calcular" className="header-btn">Calcular</a>
            <a href="#consultar" className="header-btn">Consultar</a>
            <button
              className="header-btn"
              onClick={handleLogout}
            >
              Sair
            </button>
            <button
              className="header-btn secondary"
              onClick={handleSwitchAccount}
            >
              Trocar de conta
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;