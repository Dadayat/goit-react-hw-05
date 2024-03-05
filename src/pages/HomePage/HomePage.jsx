import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../../components/api";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={css.font}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <h1>Day trends</h1>
      {movies.length > 0 && (
        <ul className={css.list}>
          {movies.map((movie) => (
            <li className={css.listItem} key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={baseUrl + movie.poster_path}
                  alt={movie.title}
                  className={css.img}
                  //   className={css.poster}
                />
              </Link>
              <Link to={`/movies/${movie.id}`} className={css.titleLink}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
