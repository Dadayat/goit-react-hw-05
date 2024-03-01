import axios from "axios";

const KEY = "4fc7b2c44698870eaaff11d38305388e";
axios.defaults.baseURL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmM3YjJjNDQ2OTg4NzBlYWFmZjExZDM4MzA1Mzg4ZSIsInN1YiI6IjY1ZTFjMjAwYTgwNjczMDE4NGFiM2I0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6M343aUo1_w8Mydx_-Vxhv0fIem8ccLHHDzhePNuosg";
axios.defaults.params = {
  per_page: 20,
};

export const getMovies = async (query, page) => {
  const { data } = await axios.get(
    `/search/photos/?query=${query}&page=${page}`
  );

  return data;
};
