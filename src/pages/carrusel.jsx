import React from "react";

import "../styles/components/movie-carousel.scss";

const MovieCarousel = ({ movies, title, handleMovieClick }) => {
  return (
    <div className="movie-carousel">
      <h3 className="movie-carousel__title">{title}</h3>
      <div className="movie-carousel__items">
        {movies.slice(0, 5).map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-carousel__item"
            onClick={() => handleMovieClick(movie.imdbID)}
          >
            <MovieCarousel
        movies={movies}
        title="Trending Now"
        
      />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
