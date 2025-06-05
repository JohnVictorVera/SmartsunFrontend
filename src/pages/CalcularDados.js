import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CalcularDados.css"; // Estilos específicos para a página de cálculo

const CalcularDados = () => {
  // Estados dos campos do formulário
  const [cep, setCep] = useState("");
  const [kwh, setKwh] = useState("");
  const [tarifa, setTarifa] = useState("");
  const navigate = useNavigate();

  // Trata o campo de CEP, permitindo apenas números e adicionando traço
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 8);
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    setCep(value);
  };

  // Remove caracteres não numéricos do CEP para enviar ao backend
  const getCepNumerico = () => cep.replace(/\D/g, "");

  // Envia os dados do formulário para o backend e navega para o resultado
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cepNumerico = getCepNumerico();
    if (cepNumerico.length !== 8) {
      alert("CEP deve conter 8 dígitos numéricos.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://smartsunbackend.onrender.com/solar/calculate",
        {
          cep: cepNumerico,
          consumo: parseFloat(kwh),
          cost: Number(tarifa)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Navega para a página de resultado, passando os dados recebidos
      navigate("/calcular/resultado", { state: { resultado: response.data } });
    } catch (error) {
      alert("Erro ao calcular. Tente novamente.");
    }
  };

  // Trata o campo de tarifa, permitindo apenas números e formatando para reais
  const handleTarifaChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 6);
    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
    } else {
      value = "";
    }
    setTarifa(value);
  };

  return (
    <>
      <Header />
      <div className="calcular-container">
        <form
          className="calcular-box"
          onSubmit={handleSubmit}
        >
          <h2>Informe seus dados</h2>
          <div style={{ margin: "18px 0" }}>
            <input
              type="text"
              placeholder="CEP"
              value={cep}
              onChange={handleCepChange}
              maxLength={9}
              required
            />
            <input
              type="text"
              placeholder="Consumo mensal (kWh)"
              value={kwh}
              onChange={e => {
                let value = e.target.value.replace(/[^0-9.,]/g, "");
                value = value.replace(",", ".");
                setKwh(value);
              }}
              inputMode="decimal"
              required
            />
            <input
              type="text"
              placeholder="Tarifa (R$ por kWh)"
              value={tarifa}
              onChange={handleTarifaChange}
              inputMode="numeric"
              required
            />
          </div>
          <button
            type="submit"
          >
            Calcular
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CalcularDados;