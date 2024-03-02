import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getMovieByID } from "../../components/api";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  //   console.log(params);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const fetchedMovie = await getMovieByID(movieId, {
          abortController: controller,
        });
        setMovie(fetchedMovie);
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
  }, [movieId]);
  return (
    <div>
      {error && <p>Opppps, error</p>}
      {movie && (
        <div className={css.wrap}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>User score: {movie.vote_average}</p>
            <h2>Genres:</h2>
            {movie.genres && (
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            )}
            <h2>Additional information</h2>
            <ul>
              <li>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// overview: "During a research mission, an astronaut discovers that his marriage is in trouble. Luckily, he has the help of a mysterious creature hidden in his ship.";
// popularity: 55.414;
// poster_path: "/jDdnDEGu3GiLtJwDXeL4hfFzmGv.jpg";
// release_date: "2024-02-23";
// title: "Spaceman";

// vote_average: 5.786;
// vote_count: 14;
