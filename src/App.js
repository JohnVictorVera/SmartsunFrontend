import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecoverPass from "./pages/RecoverPass";
import TokenVerify from "./pages/TokenVerify";
import UpdatePassword from "./pages/UpdatePassword";
import Calcular from "./pages/Calcular";
import CalcularDados from "./pages/CalcularDados";
import CalcularResultado from "./pages/CalcularResultado";
import Consulta from "./pages/Consulta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<RecoverPass />} />
        <Route path="/verify-token" element={<TokenVerify />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/calcular" element={<Calcular />} />
        <Route path="/calcular/dados" element={<CalcularDados />} />
        <Route path="/calcular/resultado" element={<CalcularResultado />} />
        <Route path="/consulta" element={<Consulta />} />
        {/* outras rotas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;