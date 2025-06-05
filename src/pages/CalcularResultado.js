import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CalcularResultado.css";
import EconomiaAcumuladaPaybackChart from "../components/EconomiaAcumuladaPaybackChart";
import ComoChegamosResultado from "../components/ComoChegamosResultado";

const CalcularResultado = () => {
  // Recebe o id do cálculo via navegação
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.resultado?.id;
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca os detalhes do cálculo no backend ao carregar a página
  useEffect(() => {
    const fetchResultado = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`https://smartsunbackend.onrender.com/solar/details/${id}`);
        // O backend retorna um array, pega o primeiro elemento
        if (Array.isArray(response.data) && response.data.length > 0) {
          setResultado(response.data[0]);
        } else {
          setResultado(null);
        }
      } catch (error) {
        setResultado(null);
      }
      setLoading(false);
    };
    fetchResultado();
  }, [id]);

  // Se não houver id, redireciona para a consulta
  useEffect(() => {
    if (!id) {
      navigate("/consulta");
    }
  }, [id, navigate]);

  // Exibe loading enquanto busca os dados
  if (loading) {
    return (
      <>
        <Header />
        <div className="resultado-container" style={{ justifyContent: "center" }}>
          <div>
            <h2>Carregando resultado...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Se não houver resultado, exibe mensagem e botão para voltar
  if (!resultado || !resultado.calc) {
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

  // Extrai os dados do resultado para exibição
  const invest = resultado.calc.invest || {};
  const estimated = resultado.calc.estimated || {};
  const suggestion = resultado.calc.suggestion || {};

  return (
    <>
      <Header />
      <div className="resultado-header">
        <h1>Resultado do Cálculo</h1>
      </div>
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
      {/* Gráfico de economia acumulada e payback */}
      <EconomiaAcumuladaPaybackChart
            investimento={invest.estimated}
            economiaAnual={invest.annualEconomy}
            payback={invest.payback}
      />
      {/* Explicação dos cálculos */}
      <ComoChegamosResultado />
      <Footer />
    </>
  );
};

export default CalcularResultado;