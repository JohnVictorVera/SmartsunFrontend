import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Calcular.css";

const Calcular = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/calcular/dados");
  };

  return (
    <>
      <Header />
        <div className="calcular-box">
          <h2>Vamos começar!</h2>
          <p>
            Primeiro, pegue sua última conta de luz para usarmos de referência.
            <br />
            <br />
            Não se preocupe, essas informações serão utilizadas apenas para fins
            de cálculo!
          </p>
          <button onClick={handleNext}>Próxima etapa</button>
        </div>
      <Footer />
    </>
  );
};

export default Calcular;
