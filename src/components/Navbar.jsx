import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/navbar.scss";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || ""); // Persistir el valor de la búsqueda
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Redirigir a la principal si el campo de búsqueda está vacío
    if (searchTerm.trim() === "") {
      navigate("/");
    } else if (searchTerm.trim().length > 1) {
      navigate(`/buscador?query=${encodeURIComponent(searchTerm)}`);
    }
  }, [searchTerm, navigate]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleSearchChange = (e) => {
  const value = e.target.value;

  // Expresión regular para permitir solo letras (mayúsculas y minúsculas), números, espacio y acentos
  const sanitizedValue = value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚ\s]/g, '');

  setSearchTerm(sanitizedValue);
  localStorage.setItem("searchTerm", sanitizedValue); // Guardar el valor sanitizado en el localStorage
  };

  return (
    <header className="navbar">
      <h1 className="navbar__logo">StreamingClone</h1>
      <div className="navbar__search">
        <input
          type="text"
          className="navbar__search-input"
          placeholder="Buscar películas o series..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button className="navbar__toggle-theme" onClick={toggleDarkMode}>
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>
    </header>
  );
};

export default Navbar;


