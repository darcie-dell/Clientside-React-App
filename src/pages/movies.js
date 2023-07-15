import React, { useEffect, useState } from "react";
import { useMoviesAPI } from "../api/moviesAPI";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SearchBar from "../components/movieSearchBar";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export function Movies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    searchString: "",
    searchDate: "",
  });

  const { loading, movies, error } = useMoviesAPI(search);

  const columns = [
    { headerName: "Title", field: "title" },
    { headerName: "Year", field: "year" },
    { headerName: "IMDB rating", field: "imdbRating" },
    { headerName: "Rotten Tomatoes", field: "rottenTomatoesRating" },
    { headerName: "Metacritic Rating", field: "metacriticRating" },
    { headerName: "Rated", field: "classification" },
  ];

  return (
    <div className="moviePage">
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
            Loading....
          </Alert>
        </div>
      ) : (
        <div>
          <div className="container">
            <h1>Movie Catalogue</h1>
            <div>
              <SearchBar setSearch={setSearch} />
            </div>

            <div className=" movieGrid col-md-10 offset-md-1">
              <div
                className="gridStyle ag-theme-balham-dark"
                style={{ height: "400px", width: "1100px" }}
              >
                <AgGridReact
                  columnDefs={columns}
                  rowData={movies}
                  pagination={true}
                  paginationPageSize={20}
                  onRowClicked={(row) =>
                    navigate(`/movie?imdbID=${row.data.imdbID}`)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
