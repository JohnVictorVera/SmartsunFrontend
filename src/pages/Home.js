import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Header />
      <div
        className="home-container"
        style={{
          background: `url("/images/Solarpanel.jpg") no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <div className="home-overlay">
          <div className="home-content">
            <h1>Bem-vindo ao Smart Sun</h1>
            <p>O seu assistente inteligente para energia solar.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
