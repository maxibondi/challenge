import React from "react";
import "../styles/components/carrusel-card.scss";

const CarruselCard = ({ movie }) => {
  return (
    <div className="carrusel-card">
      <img src={movie.Poster} alt={movie.Title} className="carrusel-card__image" />
      <h3 className="carrusel-card__title">{movie.Title}</h3>
      <p className="carrusel-card__year">{movie.Year}</p>
    </div>
  );
};

export default CarruselCard;