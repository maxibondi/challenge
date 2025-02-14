import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Peliculas from "./pages/peliculas";
import Buscador from "./pages/buscador";
import Navbar from "./components/Navbar"; // Importamos Navbar para que esté presente en todas las páginas
import "./styles/main.scss";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar se renderiza en todas las rutas */}
      <Routes>
        <Route path="/" element={<Peliculas />} />
        <Route path="/buscador" element={<Buscador />} />
      </Routes>
    </Router>
  );
};

export default App;

