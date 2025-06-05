import React, { useState } from "react";
import Header from "../components/Header";
import { createUser, loginUser } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  // Estado do formulário de cadastro
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  // Atualiza o estado do formulário conforme o usuário digita
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia os dados para cadastro e faz login automático
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Preencha todos os campos.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    const response = await createUser({
      name: form.name,
      email: form.email,
      password: form.password, // <-- use 'password' e não 'pass'
    });
    if (response) {
      try {
        // Login automático após cadastro
        const loginResponse = await loginUser(form.email, form.password);
        if (loginResponse && loginResponse.token) {
          login(loginResponse.token);
          localStorage.setItem("userEmail", form.email);
          navigate("/");
          return;
        } else {
          alert("Usuário cadastrado, mas erro ao fazer login automático.");
          return;
        }
      } catch (error) {
        alert("Usuário cadastrado, mas erro ao fazer login automático.");
        return;
      }
    } else {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <form className="register-box" onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrar-se</button>
        </form>
      </div>
    </>
  );
};

export default Register;