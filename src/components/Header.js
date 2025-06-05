import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../contexts/AuthContext";
import { getUserByEmail } from "../services/api";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [userName, setUserName] = useState("");

  // Busca o nome do usuário logado para exibir no header
  useEffect(() => {
    const fetchUserName = async () => {
      if (isLoggedIn) {
        const email = localStorage.getItem("userEmail");
        if (email) {
          const user = await getUserByEmail(email);
          if (user && Array.isArray(user) && user.length > 0 && user[0].name) {
            setUserName(user[0].name);
          }
        }
      }
    };
    fetchUserName();
  }, [isLoggedIn]);

  // Realiza logout e redireciona para a home
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Troca de conta: faz logout e redireciona para login
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
        {/* Exibe botões diferentes conforme o usuário está logado ou não */}
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
        {/* Exibe o nome do usuário logado */}
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