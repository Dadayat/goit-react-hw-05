import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../components/api";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
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
