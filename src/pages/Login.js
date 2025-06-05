import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  // Estado do formulário de login
  const [form, setForm] = useState({ email: "", password: "" });
  // Estado do checkbox "Lembrar-me"
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Ao carregar, verifica se há e-mail salvo para preencher automaticamente
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  // Atualiza o estado do formulário conforme o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Atualiza o estado do checkbox "Lembrar-me"
  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
  };

  // Envia o formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(form.email, form.password);
    if (response && response.token) {
      // Salva o token no contexto global e localStorage
      login(response.token);
      localStorage.setItem("userEmail", form.email);
      // Salva ou remove o e-mail do "Lembrar-me"
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
          <div className="checkbox-label">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={handleRememberChange}
            />
            <label htmlFor="remember">Lembrar-me</label>
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