import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieByID } from "../api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  //   console.log(params);
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedMovie = await getMovieByID(movieId);
        setMovie(fetchedMovie);
      } catch (error) {}
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>MovieDetailsPage</h1>
      {movie && (
        <div>
          <img
            src={baseUrl + movie.poster_path}
            alt={movie.title}
            //   className={css.poster}
          />
          <p></p>
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
