import React from "react";
import "../styles/components/movie-card.scss";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="movie-card__image" />
      <h3 className="movie-card__title">{movie.Title}</h3>
      <p className="movie-card__year">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;