import { useEffect, useState } from "react";

/**
 * Fetches movie data from API and the associated jSON file.
 * @param id
 * @returns {Promise<any>}
 */
function getMovieInd(id) {
  const url = `http://sefdb02.qut.edu.au:3000/movies/data/${id}`;
  return fetch(url).then((res) => res.json());
}

/**
 * Sets movie object and loading/error states.
 * @param id
 * @returns {{movie: *[], loading: undefined, error: undefined}}
 */
export function useMoviesIndAPI(id) {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getMovieInd(id)
      .then((movie) => {
        if (movie.error) {throw Error(movie.message);}
        setMovie(movie);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    movie,
    error,
  };
}
