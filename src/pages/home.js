import { Cards } from "../components/cards";
import Container from "react-bootstrap/Container";
import React from "react";
import MovieList from "../components/movieList";

/**
 * Home Page
 * @returns {JSX.Element}
 * @constructor
 */

export function Home() {
  return (
    <div className={"homePage"}>
      <h1 id={"header"}>Cinema Search</h1>
      <p id={"header_subtitle"}>
        with IMDB, Metacritic and RottenTomatoes. © 2023 Darcie Pearson
      </p>
      <Container className={"col-md-8 offset-md-2"}>
        <hr></hr>
        <h2 id={"quote"}>
          I think cinema, movies, and magic have always been closely associated.
          The very earliest people who made film were magicians. - Francis Ford
          Coppola
        </h2>
        <hr></hr>
      </Container>
      <br></br>
      <a id={"icon"} href="/movies/search">
        <button id={"browseButton"}>Browse</button>
      </a>
      <div className={"movieBody"}>
        <Container className={"col-md-8 offset-md-1"}>
          <Cards />
        </Container>
      </div>
      <div className="movie-list col-md-7 offset-md-1">
        <h2>Curated</h2>
        <hr></hr>
        <div className="row">
          <MovieList />
        </div>
      </div>
      <div className="movie-list col-md-7 offset-md-1">
        <h2>Top Picks</h2>
        <hr></hr>
        <div className="row">
          <MovieList />
        </div>
      </div>
    </div>
  );
}
