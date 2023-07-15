import React, { useEffect, useState } from "react";

const API_URL = "http://131.181.190.87:3000";

/**
 * Fetches person data using the current logged-in users bearer token.
 * @param id
 * @returns {Promise<any>}
 */
function getAuthPerson(id) {
  const url = `${API_URL}/people/${id}`;
  const bearerToken = localStorage.getItem("bearerToken");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  }).then((res) => res.json());
}

/**
 * Sets person data and loading, error and token status variables.
 * @param id
 * @returns {{person: *[], loading: undefined, error: undefined, tokenStatus:'valid'}}
 */
export function usePerson(id) {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState([]);
  const [error, setError] = useState();
  const [tokenStatus, setTokenStatus] = useState("");

  useEffect(() => {
    getAuthPerson(id)
      .then((person) => {
        if (person.message === "JWT token has expired") {
          setTokenStatus("expired");
        }
        if (person.error === true) {
          setError(person);
        } else {
          setTokenStatus("");
        }
        setPerson(person);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    person,
    error,
    tokenStatus,
  };
}
