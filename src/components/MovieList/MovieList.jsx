import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export const MovieList = ({ movies }) => {
  const location = useLocation();
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  return (
    <div className={css.font}>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.listItem}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img
                src={baseUrl + movie.poster_path}
                alt={movie.title}
                className={css.img}
              />
            </Link>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={css.titleLink}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
