import React, { useState } from "react";
import Header from "../components/Header";
import { createUser } from "../services/api";
import "./Register.css";
import Footer from "../components/Footer";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      alert("Usuário cadastrado com sucesso!");
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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
      <Footer />
    </>
  );
};

export default Register;