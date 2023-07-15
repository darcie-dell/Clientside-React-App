import { useMoviesIndAPI } from "../api/movieIndAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Displays different clickable movie posters in a row.
 * @returns {JSX.Element}
 * @constructor MovieList
 */
const MovieList = () => {

  /**
   * Like the cards, intend to make this data non-static
   */

  const [movies, setMovies] = useState([
    {
      imdbID: "tt18925334",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZTFkNmE5MjUtZDE1Yi00ZmQyLTk2YWUtN2EwODA1ZmNlOTA5XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg",
    },
    {
      imdbID: "tt0121766",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0947798",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzY2NzI4OTE5MF5BMl5BanBnXkFtZTcwMjMyNDY4Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt1411697",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTM2MTM4MzY2OV5BMl5BanBnXkFtZTcwNjQ3NzI4NA@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0993846",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX300.jpg",
    },
    {
      imdbID: "tt5580036",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjI5MDY1NjYzMl5BMl5BanBnXkFtZTgwNjIzNDAxNDM@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0422720",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDViNjYxNWYtMWRiOS00NmMyLTgwNDMtNTg3MWYwNjAxNWM4XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
    },
  ]);

  return (
    <>
      {movies.map((movie, index) => (
        <div key={movie.imdbID} className="col-3">
          <a href={`/movie?imdbID=${movie.imdbID}`}>
            <button className={"card_btn"}>
              <img src={movie.Poster} alt="movie"></img>
            </button>
          </a>
        </div>
      ))}
    </>
  );
};

export default MovieList;
