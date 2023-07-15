import Alert from "@mui/material/Alert";
import React, { useState } from "react";

const refreshToken = localStorage.getItem("refreshToken");
const API_URL = "http://sefdb02.qut.edu.au:3000/user/refresh";

/**
 * Function that refreshes the users token.
 * @returns {Promise<any>}
 */
export default function GetRefreshToken() {
  fetch(API_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.bearerToken.token) {
        localStorage.setItem("bearerToken", res.bearerToken.token);
        localStorage.setItem("refreshToken", res.refreshToken.token);
      }
      if (res.bearerToken === undefined) {
        console.log(res.message);
      }
    });
}

/**
 * component that returns when the user navigates to /user/refresh.
 * This is mainly for assessment criteria purposes and is not intended to be used by the user.
 * @returns {JSX.Element}
 * @constructor
 */
export function CleanRefresh() {
    return (
        <div>
            {GetRefreshToken}
            <Alert variant="filled" severity="success" style={{ margin: "100px" }}>
                Successfully refreshed token!{" "}
                <a id={"alertLink"} href="/">
                    Go Home
                </a>
            </Alert>
        </div>
    );
}
