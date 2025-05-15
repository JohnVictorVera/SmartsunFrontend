import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione aqui a lógica de autenticação
    alert("Login realizado (exemplo)");
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Acessar</button>
          <div className="login-links">
            <span
              className="login-link"
              onClick={() => navigate("/recover")}
              tabIndex={0}
              role="button"
            >
              Esqueceu a senha?
            </span>
          </div>
          <div className="login-register">
            <span className="login-register-text">Não possui conta?</span>
            <span
              className="login-link"
              onClick={() => navigate("/register")}
              tabIndex={0}
              role="button"
            >
              Criar conta
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;