import axios from "axios";

export const getMovies = async ({ abortController }) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmM3YjJjNDQ2OTg4NzBlYWFmZjExZDM4MzA1Mzg4ZSIsInN1YiI6IjY1ZTFjMjAwYTgwNjczMDE4NGFiM2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6M343aUo1_w8Mydx_-Vxhv0fIem8ccLHHDzhePNuosg",
      },
      signal: abortController.signal,
    }
  );

  return response.data.results;
};

export const getMovieByID = async (movieId, { abortController }) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmM3YjJjNDQ2OTg4NzBlYWFmZjExZDM4MzA1Mzg4ZSIsInN1YiI6IjY1ZTFjMjAwYTgwNjczMDE4NGFiM2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6M343aUo1_w8Mydx_-Vxhv0fIem8ccLHHDzhePNuosg",
      },
      signal: abortController.signal,
    }
  );

  return response.data;
};

export const getSearchMovies = async (query, page, { abortController }) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmM3YjJjNDQ2OTg4NzBlYWFmZjExZDM4MzA1Mzg4ZSIsInN1YiI6IjY1ZTFjMjAwYTgwNjczMDE4NGFiM2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6M343aUo1_w8Mydx_-Vxhv0fIem8ccLHHDzhePNuosg",
      },
      params: {
        query: query,
        page: page,
      },
      signal: abortController.signal,
    }
  );

  return response.data.results;
};

export const getReviews = async (movieId, { abortController }) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmM3YjJjNDQ2OTg4NzBlYWFmZjExZDM4MzA1Mzg4ZSIsInN1YiI6IjY1ZTFjMjAwYTgwNjczMDE4NGFiM2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6M343aUo1_w8Mydx_-Vxhv0fIem8ccLHHDzhePNuosg",
      },
      signal: abortController.signal,
    }
  );

  return response.data.results;
};

export const getCast = async (movieId, { abortController }) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmM3YjJjNDQ2OTg4NzBlYWFmZjExZDM4MzA1Mzg4ZSIsInN1YiI6IjY1ZTFjMjAwYTgwNjczMDE4NGFiM2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6M343aUo1_w8Mydx_-Vxhv0fIem8ccLHHDzhePNuosg",
      },
      signal: abortController.signal,
    }
  );

  return response.data.cast;
};
