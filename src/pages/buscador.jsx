import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Buscar_pelicula, Detalle_pelicula } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import MovieDetailsModal from "../components/MovieDetailsModal";
import Botones from "../components/Botones";
import "../styles/pages/Home.scss";

const Buscador = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [query, setQuery] = useState(""); // Término de búsqueda
  const moviesPerPage = 10;
  const location = useLocation();

  // Captura el término de búsqueda desde la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setQuery(query); // Establecer el valor en el estado
    setCurrentPage(1); // Reiniciar la página a 1 cuando cambie el término de búsqueda

    if (query) {
      Buscar_pelicula(query)
        .then((data) => {
          if (data && data.length > 0) {
            setMovies(data);
          } else {
            setMovies([]); // Si no hay resultados, asegurarse de que el estado esté limpio
          }
        })
        .catch((error) => console.error("Error al obtener las películas:", error));
    } else {
      setMovies([]); // Si no hay término de búsqueda, también limpiar
    }
  }, [location.search]); // Dependemos de la URL para actualizar el término de búsqueda

  // Paginación: dividir las películas en páginas
  useEffect(() => {
    console.log(movies)
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    setCurrentMovies(movies.slice(indexOfFirstMovie, indexOfLastMovie));
  }, [movies, currentPage]);

  const handleMovieClick = (id) => {
    const movie = movies.find((movie) => movie.imdbID === id);
    if (movie) {
      // Usar Detalle_pelicula para obtener más detalles
      Detalle_pelicula(id)
        .then((details) => {
          setSelectedMovie({ ...movie, ...details }); // Combinar los detalles con la información de la película
        })
        .catch((error) => console.error("Error al obtener detalles de la película:", error));
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="home">
      <h2 className="home__title">Series o películas encontradas</h2>

      {/* Mostrar el término de búsqueda en el título */}
      {query && <p>Mostrando resultados para: <strong>{query}</strong></p>}

      <div className="home__movies">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <div key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p>No se encontraron resultados.</p> // Mostrar un mensaje si no hay resultados
        )}
      </div>

      <Botones
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
        currentPage={currentPage}
        totalPages={Math.ceil(movies.length / moviesPerPage)}
      />

      {selectedMovie && <MovieDetailsModal movie={selectedMovie} closeModal={closeModal} />}
    </div>
  );
};

export default Buscador;




