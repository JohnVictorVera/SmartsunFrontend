import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UsersTable from "./components/UsersTable";
import RecoverPass from "./pages/RecoverPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<RecoverPass />} />
        <Route path="/users" element={<UsersTable />} />
        {/* outras rotas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;