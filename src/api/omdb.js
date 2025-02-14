

export const peliculas = async () => {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const BASE_URL = "https://www.omdbapi.com/";
  const peliculasPorPagina = 10;
  const totalPeliculas = 50; // Queremos al menos 50 películas
  const totalPaginas = Math.ceil(totalPeliculas / peliculasPorPagina);
  
  try {
    let todasLasPeliculas = [];
    
    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=movie&page=${pagina}`);
      const data = await response.json();
      
      if (data.Response === "True") {
        todasLasPeliculas = [...todasLasPeliculas, ...data.Search];
        
        // Si ya tenemos al menos 50 películas, detenemos la paginación
        if (todasLasPeliculas.length >= totalPeliculas) {
          break;
        }
      } else {
        throw new Error(data.Error);
      }
    }

    return todasLasPeliculas.slice(0, totalPeliculas); // Retorna solo las primeras 50 películas

  } catch (error) {
    console.error("Error al obtener películas:", error);
    return [];
  }
};


export const Detalle_pelicula = async (id) => {
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
    const BASE_URL = "https://www.omdbapi.com/";
  
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
      const data = await response.json();
  
      if (data.Response === "True") {
        console.log(data)
        return data; // Devuelve los detalles completos de la película
      } else {
        throw new Error(data.Error);
      }
    } catch (error) {
      console.error("Error al obtener los detalles de la película:", error);
      return null;
    }
  };

export const peliculas_2024 = async () => {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const BASE_URL = "https://www.omdbapi.com/";

  try {
    // Buscamos películas de 2024
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=movie&type=movie&y=2024`);
    const data = await response.json();

    if (data.Response === "True") {
      // Clasificamos las películas por imdbRating, de mayor a menor
      const peliculasConRating = await Promise.all(data.Search.map(async (movie) => {
        const movieDetails = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`);
        const movieData = await movieDetails.json();
        return { ...movie, imdbRating: parseFloat(movieData.imdbRating) || 0 };
      }));

      // Ordenamos las películas por imdbRating de mayor a menor
      const peliculasOrdenadas = peliculasConRating.sort((a, b) => b.imdbRating - a.imdbRating);

      return peliculasOrdenadas;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Error al obtener películas de 2024:", error);
    return [];
  }
};

export const Buscar_pelicula = async (titulo) => {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const BASE_URL = "https://www.omdbapi.com/";

  try {
    let allMoviesAndSeries = []; // Para almacenar los resultados de películas y series
    let page = 1;

    // Realizamos las solicitudes mientras haya más resultados y no superemos los 150
    do {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(titulo)}&page=${page}`);
      const data = await response.json();

      if (data.Response === "True") {
        allMoviesAndSeries = [...allMoviesAndSeries, ...data.Search]; // Añadimos los resultados a la lista
      } else {
        break; // Si no hay más resultados, salimos del bucle
      }

      page++; // Aumentamos el número de página

      // Detenemos si hemos alcanzado el máximo de 150 resultados
      if (allMoviesAndSeries.length >= 40) {
        allMoviesAndSeries = allMoviesAndSeries.slice(0, 40); // Limitar a 150 resultados
        break;
      }

    } while (true); // Continuamos hasta que obtengamos 150 resultados o no haya más

    // Filtramos las películas y series de manera independiente
    const filteredMovies = allMoviesAndSeries.filter((movie) =>
      movie.Title.toLowerCase().includes(titulo.toLowerCase()) && (movie.Type === 'movie' || movie.Type === 'series')
    );

    // Ordenamos las películas y series por año de forma descendente
    filteredMovies.sort((a, b) => {
      const yearA = parseInt(a.Year, 10);
      const yearB = parseInt(b.Year, 10);
      return yearB - yearA; // Año más reciente primero
    });

    return filteredMovies; // Regresamos los resultados filtrados y ordenados

  } catch (error) {
    console.error("Error al buscar películas o series:", error);
    return []; // Regresa un array vacío si ocurre un error
  }
};





