import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Calcular.css"; // <-- importe o CSS separado

const Calcular = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/calcular/dados");
  };

  return (
    <>
      <Header />
      <div className="calcular-container" style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9"
      }}>
        <div className="calcular-box" style={{
          background: "#fff",
          padding: "40px 36px",
          borderRadius: "10px",
          boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
          minWidth: "360px",
          textAlign: "center"
        }}>
          <h2>Vamos começar!</h2>
          <p>
            Primeiro, pegue sua última conta de luz para usarmos de referência.<br /><br />
            Não se preocupe, essas informações serão utilizadas apenas para fins de cálculo, e você poderá excluí-las a qualquer momento na aba <b>Consultar</b>.
          </p>
          <button onClick={handleNext}>
          <button
            style={{
              marginTop: "32px",
              padding: "12px 32px",
              background: "#1e90ff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer"
            }}
            onClick={handleNext}
          >
            Próxima etapa
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Calcular;