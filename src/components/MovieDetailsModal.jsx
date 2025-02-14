import React from "react";
import "../styles/components/movie-details-modal.scss";

const MovieDetailsModal = ({ movie, closeModal }) => {
  return (
    <div className="movie-details-modal">
      <div className="movie-details-modal__content">
        <button onClick={closeModal} className="movie-details-modal__close">X</button>
        <img src={movie.Poster} alt={movie.Title} className="movie-details-modal__image" />
        <h3 className="movie-details-modal__title">{movie.Title}</h3>
        <p className="movie-details-modal__year">{movie.Year}</p>
        <p className="movie-details-modal__plot">{movie.Plot}</p>
        <p className="movie-details-modal__rating">Rating: {movie.imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieDetailsModal;