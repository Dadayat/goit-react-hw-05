import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { getMovies } from "../../components/api";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";
import { MovieList } from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
