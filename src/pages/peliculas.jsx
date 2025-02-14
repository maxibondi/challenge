import React, { useState, useEffect } from "react";
import Home from "../pages/Home";
import Carrusel from "../components/MovieCarousel";
import MovieDetailsModal from "../components/MovieDetailsModal";
import { peliculas_2024,Detalle_pelicula } from "../api/omdb";

const peliculas = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para la película seleccionada

  useEffect(() => {
    peliculas_2024()
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error al obtener las películas:", error));
  }, []);

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
    setSelectedMovie(null); // Cerramos el modal
  };

  return (
    <>

      {/* Pasamos movies y handleMovieClick al Carrusel */}
      <Carrusel movies={movies} title="Películas Populares" handleMovieClick={handleMovieClick} />

      {/* Mostrar el modal si hay una película seleccionada */}
      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} closeModal={closeModal} />
      )}

      <Home />
    </>
  );
};

export default peliculas;