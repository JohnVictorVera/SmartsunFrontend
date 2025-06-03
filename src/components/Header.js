import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";
import { getUserByEmail } from "../services/api";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      if (isLoggedIn) {
        const email = localStorage.getItem("userEmail");
        if (email) {
          const user = await getUserByEmail(email);
          console.log("Usuário retornado:", user);
          if (user && Array.isArray(user) && user.length > 0 && user[0].name) {
            setUserName(user[0].name);
          }
        }
      }
    };
    fetchUserName();
  }, [isLoggedIn]);

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
              onClick={() => navigate("/consulta")}
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
        {isLoggedIn && userName && (
          <span style={{ marginLeft: 16, fontWeight: "bold", color: "#212E5A", whiteSpace: "nowrap" }}>
            Olá, {userName}!
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;