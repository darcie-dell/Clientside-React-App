import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useMoviesIndAPI } from "../api/movieIndAPI";
import { AgGridReact } from "ag-grid-react";
import { usePrincipalsAPI } from "../api/principalsAPI";
import Container from "react-bootstrap/Container";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Rating } from "@mui/material";
import Alert from "@mui/material/Alert";

export function MovieInd() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const imdbID = searchParams.get("imdbID");
  const { loading, movie, error } = useMoviesIndAPI(imdbID);
  const { loadingPrincipals, principals, errorPrincipals } =
    usePrincipalsAPI(imdbID);
  const [filteredPrincipals, setFilteredPrincipals] = useState([]);
  const [starRating, setStarRating] = useState();

  useEffect(() => {
    if (!loadingPrincipals && principals && !errorPrincipals) {
      setFilteredPrincipals(principals);
    }
  }, [principals, loadingPrincipals, errorPrincipals]);

  const columns = [
    { headerName: "Role", field: "category" },
    { headerName: "Name", field: "name" },
    { headerName: "Characters", field: "characters" },
  ];

  function boxOfficeundef(boxoffice) {
    if (boxoffice === undefined) return;
    else {
      return boxoffice.toLocaleString();
    }
  }

  const genreStyles = {
    Comedy: { border: "1px solid #a83238", color: "#a83238" },
    Crime: { border: "1px solid #4d3561", color: "#4d3561" },
    Drama: { border: "1px solid #9e5289", color: "#9e5289" },
    Action: { border: "1px solid #9e5289", color: "#9e5289" },
    Thriller: { border: "1px solid #4a51a1", color: "#4a51a1" },
    Romance: { border: "1px solid #a14a6f", color: "#a14a6f" },
    Fantasy: { border: "1px solid #4aa155", color: "#4aa155" },
    Adventure: { border: "1px solid #bf8a39", color: "#bf8a39" },
    "Sci-Fi": { border: "1px solid #9339bf", color: "#9339bf" },
    Biography: { border: "1px solid #b7a6bf", color: "#b7a6bf" },
    Horror: { border: "1px solid #ed4e56", color: "#ed4e56" },
    Mystery: { border: "1px solid #563d85", color: "#563d85" },
    Family: { border: "1px solid #8fbdb3", color: "#8fbdb3" },
    War: { border: "1px solid #8fbdb3", color: "#8fbdb3" },
  };

  return (
    <div className={"movieInd"}>
      {error ? (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <Alert variant="filled" severity="error">
            {error.message}
          </Alert>
        </div>
      ) : loading ? (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <Alert variant="filled" severity="info">
            Loading...
          </Alert>
        </div>
      ) : (
        <div>
          <h1>
            {movie.title} ({movie.year})
          </h1>
          <div className={"subtitle"}>
            <p>
              <AccessTimeIcon>Runtime</AccessTimeIcon>
              {movie.runtime} Minutes /{" "}
              <AttachMoneyIcon>Box Office: </AttachMoneyIcon>
              {boxOfficeundef(movie.boxoffice)} USD / {movie.country}
            </p>
          </div>
          <Container id={"plot"}>
            <p id={"plot"}>{movie.plot}</p>
          </Container>

          <Container className="genres">
            {movie &&
              movie.genres &&
              movie.genres.map((genres) => (
                <label
                  key={genres}
                  className="genreLabel"
                  style={genreStyles[genres]}
                >
                  {" "}
                  {genres}
                </label>
              ))}
          </Container>

          <div className={"movieBody"}>
            <div className="col-md-8 offset-md-4">
              <img
                className={"poster"}
                src={movie.poster}
                alt={"movie poster "}
              />
            </div>
            <div className="ratings col-md-8 offset-md-6">
              <p>
                <Rating
                  name="simple-controlled"
                  value={starRating}
                  onChange={(event, newValue) => {
                    setStarRating(newValue);
                  }}
                />{" "}
                - Seen it? rate it!
              </p>
              <div className={""}>
                {" "}
                {movie &&
                  movie.ratings &&
                  movie.ratings.map((ratings) => (
                    <div key={ratings.source}>
                      {" "}
                      {ratings.source} -{" "}
                      <p key={ratings.source} id={"ratingsValue"}>
                        {ratings.value}
                      </p>{" "}
                      <br></br>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-md-8 offset-md-6">
              <Container className="">
                <div
                  className=" gridStyle ag-theme-balham-dark"
                  style={{ height: "300px", width: "500px" }}
                >
                  <AgGridReact
                    columnDefs={columns}
                    rowData={filteredPrincipals}
                    pagination={true}
                    paginationPageSize={7}
                    onRowClicked={(row) =>
                      navigate(`/people?id=${row.data.id}`)
                    }
                  />
                </div>
              </Container>
            </div>
          </div>

          <button
            style={{ margin: "50px" }}
            size={"sm"}
            className={"card_btn"}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
