import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import "./CalcularResultado.css";

const CalcularResultado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultado = location.state?.resultado;

  if (!resultado) {
    return (
      <>
        <Header />
        <div className="resultado-container" style={{ justifyContent: "center" }}>
          <div>
            <h2>Nenhum cálculo selecionado.</h2>
            <button onClick={() => navigate("/consulta")}>Voltar para Consulta</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { calc } = resultado;
  const invest = calc?.invest || {};
  const estimated = calc?.estimated || {};
  const suggestion = calc?.suggestion || {};

  return (
    <>
      <Header />
      <div className="resultado-container">
        <div className="resultado-coluna">
          <h3>Investimento</h3>
          <div className="resultado-item">
            <span>Estimativa de investimento</span>
            <strong>
              {invest.estimated ? `R$ ${Number(invest.estimated).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "-"}
            </strong>
          </div>
          <div className="resultado-item">
            <span>Payback</span>
            <strong>{invest.payback ?? "-"}</strong>
          </div>
          <div className="resultado-item">
            <span>Economia anual</span>
            <strong>
              {invest.annualEconomy ? `R$ ${Number(invest.annualEconomy).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "-"}
            </strong>
          </div>
        </div>
        <div className="resultado-coluna">
          <h3>Estimativa Ambiental</h3>
          <div className="resultado-item">
            <span>Redução de CO₂</span>
            <strong>
              {estimated.co2Reduced ? `${estimated.co2Reduced} kg/ano` : "-"}
            </strong>
          </div>
          <div className="resultado-item">
            <span>Árvores plantadas</span>
            <strong>
              {estimated.treePlanted ? estimated.treePlanted : "-"}
            </strong>
          </div>
          <div className="resultado-item">
            <span>Redução de combustível fóssil</span>
            <strong>
              {estimated.reduction ? `${estimated.reduction} L/ano` : "-"}
            </strong>
          </div>
        </div>
        <div className="resultado-coluna">
          <h3>Sistema Indicado</h3>
          <div className="resultado-item">
            <span>Geração mensal</span>
            <strong>
              {suggestion.monthly ? `${suggestion.monthly} kWh` : "-"}
            </strong>
          </div>
          <div className="resultado-item">
            <span>Potência da placa</span>
            <strong>
              {suggestion.potency ? `${suggestion.potency} Wp` : "-"}
            </strong>
          </div>
          <div className="resultado-item">
            <span>Quantidade de placas</span>
            <strong>
              {suggestion.quantity ?? "-"}
            </strong>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CalcularResultado;