import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UsersTable from "./components/UsersTable";
import RecoverPass from "./pages/RecoverPass";
import TokenVerify from "./pages/TokenVerify";
import UpdatePassword from "./pages/UpdatePassword";
import Calcular from "./pages/Calcular";
import CalcularDados from "./pages/CalcularDados";
import CalcularResultado from "./pages/CalcularResultado"; // Certifique-se de que este caminho esteja correto

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<RecoverPass />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/verify-token" element={<TokenVerify />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/calcular" element={<Calcular />} />
        <Route path="/calcular/dados" element={<CalcularDados />} />
        <Route path="/calcular/resultado" element={<CalcularResultado />} />
        {/* outras rotas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;