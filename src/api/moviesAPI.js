import { useEffect, useState } from "react";

/**
 * Fetches movie data using user query.
 * @param query
 * @returns {Promise<any>}
 */

function getMovies(query) {
  let url = "http://sefdb02.qut.edu.au:3000/movies/search";

  if (query && query != "") {
    url = `http://sefdb02.qut.edu.au:3000/movies/search?title=${query.searchString}`;
  }
  if (query && query.searchDate > 1990) {
    url = `http://sefdb02.qut.edu.au:3000/movies/search?year=${query.searchDate}`;
  }
  if (query && query.searchString && query.searchDate > 1990) {
    url = `http://sefdb02.qut.edu.au:3000/movies/search?title=${query.searchString}&year=${query.searchDate}`;
  }

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.data);
}

/**
 * Sets movies and loading and error variables.
 * @param search
 * @returns {{movies: *[], loading: undefined, error: undefined}}
 */
export function useMoviesAPI(search) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getMovies(search)
      .then((movies) => {
        if (movies.error) throw Error(movies.message);
        setMovies(movies);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [search]);

  return {
    loading,
    movies,
    error,
  };
}
