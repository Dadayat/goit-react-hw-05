import { useState, useEffect } from "react";
import { getSearchMovies } from "../../components/api";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
// import { ItemList } from "../../components/ItemList/ItemList";
import { MagnifyingGlass } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import { LoadMoreBtn } from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useSearchParams();

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const searchMovies = (newQuery) => {
    setPage(1);
    setMovies([]);
    params.set("query", newQuery);
    setParams(params);
  };

  useEffect(() => {
    const controller = new AbortController();
    const query = params.get("query") ?? "";
    if (query === "") {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const fetchedData = await getSearchMovies(query, page, {
          abortController: controller,
        });
        setMovies((prevMovies) => [...prevMovies, ...fetchedData]);
        setTotalPages(fetchedData.total_pages);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [params, page]);

  return (
    <div className={css.parallax}>
      <SearchBar onSubmit={searchMovies} />
      {error && <ErrorMessage />}
      {loading && (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#acaaa7"
        />
      )}
      {movies.length > 0 && <ItemList data={movies} />}
      {movies.length > 0 && !loading && page !== totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default MoviesPage;
