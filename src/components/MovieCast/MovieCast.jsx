import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCast } from "../api";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    async function fetchData() {
      try {
        const fetchedData = await getCast(movieId, {
          abortController: controller,
        });
        setActors(fetchedData);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
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

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {actors.length > 0 && (
        <ul className={css.list}>
          {actors.map((actor) => (
            <li key={actor.id} className={css.listItem}>
              <img
                src={
                  actor.profile_path ? baseUrl + actor.profile_path : defaultImg
                }
                alt={actor.name}
                className={css.img}
              />
              <p className={css.text}>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
