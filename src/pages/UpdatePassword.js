import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePassword } from "../services/api";
import "./Register.css"; // Reaproveite o estilo

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("As senhas não coincidem.");
      return;
    }
    const response = await updatePassword(email, password);
    if (response && response.message === "Senha atualizada") {
      alert("Senha atualizada com sucesso!");
      navigate("/login");
    } else {
      alert("Erro ao atualizar senha.");
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <form className="register-box" onSubmit={handleSubmit}>
          <h2>Nova Senha</h2>
          <input
            type="password"
            name="password"
            placeholder="Nova senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirmar nova senha"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <button type="submit">Atualizar Senha</button>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;