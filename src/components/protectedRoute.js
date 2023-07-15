import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { emailContext } from "../App";

/**
 * Blocks the person route without the user being logged in and returns child component.
 * @param loggedIn
 * @param children
 * @returns {*|JSX.Element}
 * @constructor Protected
 */
export const Protected = ({ children }) => {
  const emailManager = useContext(emailContext);

  if (!emailManager.email) {
    window.alert("You must be logged in to view this content.");
    return (
      <div>
        <Navigate to="/user/login" replace />
      </div>
    );
  }
  return children;
};
