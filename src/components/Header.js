import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSwitchAccount = () => {
    logout();
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
            <button
              className="header-btn"
              onClick={() => navigate("/calcular")}
            >
              Calcular
            </button>
            <button
              className="header-btn"
              onClick={() => navigate("/users")}
            >
              Consultar
            </button>
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