import { useEffect, useState, useRef } from "react";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { getMovieByID } from "../../components/api";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { GoBackLink } from "../../components/GoBackLink/GoBackLink";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const location = useLocation();
  const goBackLinkRef = useRef(location.state);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://image.tmdb.org/t/p/w300";
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [movieId]);
  if (!movie) {
    return <Loader />;
  }
  const movieYear = movie.release_date.split("-")[0];
  return (
    <div className={css.font}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div>
          <GoBackLink href={goBackLinkRef.current ?? "/movies"}>
            Back to search movies
          </GoBackLink>
          <div className={css.wrap}>
            <div>
              <img
                src={
                  movie.poster_path ? baseUrl + movie.poster_path : defaultImg
                }
                alt={movie.title}
              />
            </div>
            <div>
              <h1>{movie.title}</h1>
              <h2>{movieYear}</h2>
              <p>{movie.overview}</p>
              <p>User score: {movie.vote_average}</p>
              <h2>Genres:</h2>
              {movie.genres && (
                <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
              )}
              <h3>Additional information</h3>
              <ul className={css.navList}>
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
          <Outlet />
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
