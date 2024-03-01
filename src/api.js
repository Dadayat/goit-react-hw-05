import axios from "axios";

axios.defaults.baseURL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

export const getMovies = async ({ abortController }) => {
  const response = await axios.get("/movies", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmM3YjJjNDQ2OTg4NzBlYWFmZjExZDM4MzA1Mzg4ZSIsInN1YiI6IjY1ZTFjMjAwYTgwNjczMDE4NGFiM2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6M343aUo1_w8Mydx_-Vxhv0fIem8ccLHHDzhePNuosg",
    },
    signal: abortController.signal,
  });
  return response.data.results;
};

export const getMovieByID = async (movieId) => {
  const response = await axios.get("/movies/${movieId}", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmM3YjJjNDQ2OTg4NzBlYWFmZjExZDM4MzA1Mzg4ZSIsInN1YiI6IjY1ZTFjMjAwYTgwNjczMDE4NGFiM2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6M343aUo1_w8Mydx_-Vxhv0fIem8ccLHHDzhePNuosg",
    },
  });
  return response.data.results;
};
