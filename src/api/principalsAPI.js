import { useEffect, useState } from "react";

/**
 * Fetches movie principals from API.
 * I seperated this from the rest of the call to do separate loading feedback.
 * @param id
 * @returns {Promise<*[]>}
 */

function getPrincipals(id) {
  const url = `http://sefdb02.qut.edu.au:3000/movies/data/${id}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.principals);
}

/**
 * Setting principals and error and loading variables.
 * @param id
 * @returns {{principals: *[], loading: undefined, error: undefined}}
 */

export function usePrincipalsAPI(id) {
  const [loading, setLoading] = useState();
  const [principals, setPrincipals] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getPrincipals(id)
      .then((movie) => {
        setPrincipals(movie);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    principals,
    error,
  };
}
