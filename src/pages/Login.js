import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(form.email, form.password);
    if (response && response.token) {
      login(response.token);
      if (remember) {
        localStorage.setItem("rememberedEmail", form.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      navigate("/");
    } else {
      alert("E-mail ou senha inválidos.");
    }
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
          <div
            style={{
              width: "100%",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={handleRememberChange}
              style={{ marginRight: "6px" }}
            />
            <label
              htmlFor="remember"
              style={{ fontSize: "0.95rem", color: "#555" }}
            >
              Lembrar-me
            </label>
          </div>
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