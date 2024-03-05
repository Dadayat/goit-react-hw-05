import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export const MovieList = ({ movies }) => {
  const location = useLocation();
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  return (
    <div className={css.font}>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.listItem}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img
                src={
                  movie.poster_path ? baseUrl + movie.poster_path : defaultImg
                }
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
