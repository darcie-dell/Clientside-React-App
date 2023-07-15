import React, { useContext, useEffect, useState } from "react";

import PersonIcon from "@mui/icons-material/Person";
import { CleanLogout, Logout } from "../pages/logout";
import { emailContext } from "../App";

/**
 * Displays email and logout option in the nav bar.
 * @returns {JSX.Element}
 * @constructor LoggedIn
 */
export function LoggedIn() {
  const emailManager = useContext(emailContext);

  if (emailManager.email) {
    return (
      <div>
        <p>
          <PersonIcon>person</PersonIcon>
          {emailManager.email}
          <Logout />
        </p>
      </div>
    );
  }
}
