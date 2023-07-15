import React from "react";
import Alert from "@mui/material/Alert";

/**
 * Function that logs user out by clearing the local storage holding their tokens.
 */
function logout() {
  localStorage.clear();
  console.log("user has logged out");
  console.log(localStorage);
  window.location.reload();
}

/**
 * Logout button for the top of the nav bar that implements the logout function.
 * @returns {JSX.Element}
 * @constructor
 */

export function Logout() {
  return <button onClick={logout}>Logout</button>;
}

/**
 * component that returns when the user navigates to /user/logout.
 * This is mainly for assessment criteria purposes and is not intended to be used by the user.
 * @returns {JSX.Element}
 * @constructor
 */

export function CleanLogout() {
  return (
    <div>
      {logout}
      <Alert variant="filled" severity="success" style={{ margin: "100px" }}>
        Successfully logged out!{" "}
        <a id={"alertLink"} href="/">
          Go Home
        </a>
      </Alert>
    </div>
  );
}
