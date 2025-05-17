import React, { useState } from "react";
import Header from "../components/Header";
import { resetPassword } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./RecoverPass.css";

const RecoverPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resetPassword(email);
    if (response && response.code) {
      alert(`Código de redefinição enviado para o e-mail: ${email}`);
      navigate("/verify-token", { state: { email } });
    } else {
      alert("Erro ao solicitar redefinição de senha.");
    }
  };

  return (
    <>
      <Header />
      <div className="recover-container">
        <form className="recover-box" onSubmit={handleSubmit}>
          <h2>Recuperação de senha</h2>
          <p className="recover-info">Insira o email que deseja resetar a senha</p>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Próximo</button>
        </form>
      </div>
    </>
  );
};

export default RecoverPass;