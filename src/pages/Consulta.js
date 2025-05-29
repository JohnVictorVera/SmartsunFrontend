import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Consulta.css";

const Consulta = () => {
  const [calculos, setCalculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalculos = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return;
      try {
        const response = await axios.get(`https://smartsunbackend.onrender.com/solar/calculate/${email}`);
        setCalculos(response.data || []);
      } catch (error) {
        setCalculos([]);
      }
    };
    fetchCalculos();
  }, []);

  // Função para formatar a data
  const formatarData = (dataString) => {
    if (!dataString) return "-";
    const data = new Date(dataString);
    data.setHours(data.getHours() - 3); // Ajusta para UTC-3
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  };

  return (
    <>
      <Header />
      <div className="consulta-container">
        <h2 className="consulta-title">Seus Cálculos</h2>
        <div className="consulta-lista">
          {calculos.length === 0 && <span>Nenhum cálculo encontrado.</span>}
          {calculos.slice().reverse().map((calc, idx) => (
            <button
              key={calc.id}
              className="consulta-card"
              onClick={() => navigate("/calcular/resultado", { state: { resultado: { id: calc.id } } })}
              type="button"
            >
              <span className="consulta-card-numero">
                Cálculo {calculos.length - idx}
              </span>
              <span className="consulta-card-data">
                {formatarData(calc.created_at)}
              </span>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Consulta;