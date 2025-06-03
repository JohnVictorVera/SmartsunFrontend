import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CalcularDados.css"; // Estilos específicos para a página de cálculo

const CalcularDados = () => {
  const [cep, setCep] = useState("");
  const [kwh, setKwh] = useState("");
  const [tarifa, setTarifa] = useState("");
  const navigate = useNavigate();

  // Função para tratar o CEP
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    value = value.slice(0, 8); // Limita a 8 dígitos
    // Adiciona o traço visual após o quinto dígito
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    setCep(value);
  };

  // Para enviar ao backend, use:
  const getCepNumerico = () => cep.replace(/\D/g, "");

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
          consumo: parseFloat(kwh), // agora aceita float
          cost: Number(tarifa)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate("/calcular/resultado", { state: { resultado: response.data } });
    } catch (error) {
      alert("Erro ao calcular. Tente novamente.");
      console.error(error);
    }
  };

  // Função para tratar a tarifa
  const handleTarifaChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Apenas números
    // Limita a 6 dígitos (opcional)
    value = value.slice(0, 6);
    // Formata para reais (centavos)
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
              maxLength={9} // 8 dígitos + 1 traço
              required
            />
            <input
              type="text"
              placeholder="Consumo mensal (kWh)"
              value={kwh}
              onChange={e => {
                // Permite números, ponto e vírgula
                let value = e.target.value.replace(/[^0-9.,]/g, "");
                // Troca vírgula por ponto para padronizar
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