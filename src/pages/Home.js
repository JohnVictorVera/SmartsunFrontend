import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Header />  
      <div className="home-container">
        <div className="home-content">
          <h1>Bem-vindo ao Smart Sun</h1>
          <p>O seu assistente inteligente para energia solar.</p>
        </div>
        </div>
      <Footer />
    </>
  );
};

export default Home;