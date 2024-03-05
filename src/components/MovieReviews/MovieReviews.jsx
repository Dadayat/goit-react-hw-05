import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../api";
import { ErrorMessage } from "..//ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReview] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    async function fetchData() {
      try {
        const fetchedData = await getReviews(movieId, {
          abortController: controller,
        });
        setReview(fetchedData);
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
    <div className={css.wrap}>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: 25 }}>
          Sorry, There are no reviews of this movie 😣
        </p>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default MovieReviews;
