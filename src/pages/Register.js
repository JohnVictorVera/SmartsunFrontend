import React, { useState } from "react";
import Header from "../components/Header";
import { createUser, loginUser } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    const response = await createUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (response) {
      // Login automático após cadastro
      const loginResponse = await loginUser(form.email, form.password);
      if (loginResponse && loginResponse.token) {
        login(loginResponse.token);
        localStorage.setItem("userEmail", form.email); // Salva o e-mail
        navigate("/");
      } else {
        alert("Usuário cadastrado, mas erro ao fazer login automático.");
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