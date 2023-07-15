import { getAuthPerson, usePerson } from "../api/personAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Container from "react-bootstrap/Container";
import Alert from "@mui/material/Alert";
import GetRefreshToken from "./refresh";

export function People() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { loading, person, error, tokenStatus } = usePerson(id);
  const [rolesValue, setRolesValue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && person && !error) {
      personundef(person);
    }
  }, [person, rolesValue, loading, error]);

  function personundef(person) {
    if (person === undefined) {
      return;
    } else {
      setRolesValue(person.roles);
    }
  }

  function alive(date) {
    if (date === null) {
      return "Present";
    } else {
      return date;
    }
  }

  const columns = [
    { headerName: "Role", field: "category" },
    { headerName: "Movie", field: "movieName" },
    { headerName: "Character", field: "characters" },
    { headerName: "rating", field: "imdbRating" },
  ];

  const labels = [
    "0-1",
    "1-2",
    "2-3",
    "3-4",
    "4-5",
    "5-6",
    "6-7",
    "7-8",
    "8-9",
    "9-10",
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  function mutateData(chartData) {
    let flooredData = [];

    for (const data of chartData) {
      let dataNew = Math.floor(data).toString();
      flooredData.push(dataNew);
    }

    let chartObject = {};

    for (let index in labels) {
      chartObject[labels[index]] = flooredData.filter(
        (x) => x === index
      ).length;
    }

    return chartObject;
  }

  function mapRatings() {
    let returnData = [];
    rolesValue &&
      rolesValue.map((d) => {
        returnData.push(d.imdbRating);
      });
    return returnData;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Number of IMDB ratings",
        data: mutateData(mapRatings()),
        backgroundColor: "rgb(255, 186, 82)",
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div className={"movieInd"}>
      {tokenStatus === "expired" ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <Alert variant="filled" severity="sucess">
            Looks like you have been browsing a while, your token was reset!
          </Alert>
          {GetRefreshToken()}
        </>
      ) : null}
      {error ? (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <Alert variant="filled" severity="error">
            {error.message}{" "}
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
          <h1>{person.name}</h1>
          <h2 id={"birthYear"}>
            {person.birthYear} - {alive(person.deathYear)}
          </h2>
          <Container className=" movieGrid col-md-8 offset-md-4">
            <div
              className="ag-theme-balham-dark gridStyle"
              style={{ height: "300px", width: "600px" }}
            >
              <AgGridReact
                columnDefs={columns}
                rowData={rolesValue}
                pagination={true}
                onRowClicked={(row) =>
                  navigate(`/movie?imdbID=${row.data.movieId}`)
                }
              />
            </div>
          </Container>
          <div id={"graph"}>
            <h3>IMDB Ratings at a glance</h3>
            <Bar options={options} data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
