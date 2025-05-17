import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyToken } from "../services/api";
import "./Register.css"; // Reaproveite o estilo

const TokenVerify = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await verifyToken(email, parseInt(code, 10)); // Converte para inteiro
    if (response && response.message === "O token está correto") {
      alert("Token verificado com sucesso!");
      navigate("/update-password", { state: { email } });
    } else {
      alert("Token inválido.");
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <form className="register-box" onSubmit={handleSubmit}>
          <h2>Verificação de Token</h2>
          <p className="recover-info">Digite o código recebido no e-mail</p>
          <input
            type="text"
            name="code"
            placeholder="Código"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
          />
          <button type="submit">Verificar</button>
        </form>
      </div>
    </>
  );
};

export default TokenVerify;