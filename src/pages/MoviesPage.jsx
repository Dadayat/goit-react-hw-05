import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../api";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const [error, setError] = useState(false);

  const baseUrl = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const fetchMovies = await getMovies({ abortController: controller });
        setMovies(fetchMovies);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.log(error);
          setError(true);
        }
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {error && <p>Opppps, error</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={baseUrl + movie.poster_path}
                  alt={movie.title}
                  //   className={css.poster}
                />
              </Link>
              <Link
                to={`/movies/${movie.id}`}

                // className={css.link}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
