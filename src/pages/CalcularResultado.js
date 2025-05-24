import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./CalcularResultado.css";

const CalcularResultado = () => {
  return (
    <>
      <Header />
      <div className="resultado-container">
        <div className="resultado-coluna">
          <h3>Investimento</h3>
          <div className="resultado-item">
            <span>Estimativa de investimento</span>
            <strong>R$ 25.000,00</strong>
          </div>
          <div className="resultado-item">
            <span>Economia mensal</span>
            <strong>R$ 350,00</strong>
          </div>
          <div className="resultado-item">
            <span>Economia anual</span>
            <strong>R$ 4.200,00</strong>
          </div>
        </div>
        <div className="resultado-coluna">
          <h3>Estimativa Ambiental</h3>
          <div className="resultado-item">
            <span>Redução de CO₂</span>
            <strong>1.200 kg/ano</strong>
          </div>
          <div className="resultado-item">
            <span>Árvores plantadas</span>
            <strong>85</strong>
          </div>
          <div className="resultado-item">
            <span>Redução de combustível fóssil</span>
            <strong>500 L/ano</strong>
          </div>
        </div>
        <div className="resultado-coluna">
          <h3>Sistema Indicado</h3>
          <div className="resultado-item">
            <span>Geração mensal</span>
            <strong>500 kWh</strong>
          </div>
          <div className="resultado-item">
            <span>Potência da placa</span>
            <strong>550 Wp</strong>
          </div>
          <div className="resultado-item">
            <span>Quantidade de placas</span>
            <strong>10</strong>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CalcularResultado;