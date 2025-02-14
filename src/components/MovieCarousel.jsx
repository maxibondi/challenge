import React from "react";
import MovieCard from "./CarruselCard";
import "../styles/components/movie-carousel.scss";

const MovieCarousel = ({ movies, title, handleMovieClick }) => {
 
  const extendedMovies = [...movies,];
  

  return (
    <div className="movie-carousel">
      <h2 className="movie-carousel__title">{title}</h2>
      <div className="movie-carousel__wrapper">
        <div className="movie-carousel__content">
          {extendedMovies.map((movie, i) => (
            <div key={`${movie.imdbID}-${i}`} className="movie-carousel__item" onClick={() => handleMovieClick(movie.imdbID)}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;



























