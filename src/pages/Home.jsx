import React, { useState, useEffect } from "react";
import { peliculas, Detalle_pelicula } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import MovieDetailsModal from "../components/MovieDetailsModal";
import Botones from "../components/Botones"; // Importar el componente de botones
import "../styles/pages/Home.scss";

const Home = () => {
  const [movies, setMovies] = useState([]); // Todas las películas
  const [currentMovies, setCurrentMovies] = useState([]); // Películas de la página actual
  const [selectedMovie, setSelectedMovie] = useState(null); // Película seleccionada
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const moviesPerPage = 10; // Películas por página

  useEffect(() => {
    peliculas()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => console.error("Error al obtener las películas:", error));
  }, []);

  useEffect(() => {
    console.log(movies)
    // Dividir las películas en páginas
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    setCurrentMovies(currentMovies);
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
    setSelectedMovie(null);  // Cerrar el modal
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
      <h2 className="home__title">Películas</h2>
      <div className="home__movies">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <div key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p>Cargando películas...</p>
        )}
      </div>

      {/* Agregar el componente Botones */}
      <Botones
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
        currentPage={currentPage}
        totalPages={Math.ceil(movies.length / moviesPerPage)}
      />

      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Home;


