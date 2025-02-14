import React from "react";
import "../styles/components/Botones.scss";

const Botones = ({ onNext, onPrevious, currentPage, totalPages }) => {
  return (
    <div className="botones">
      <button
        className="botones__button"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="botones__pageInfo">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="botones__button"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Botones;