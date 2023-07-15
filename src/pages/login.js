import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { emailContext } from "../App";

/**
 * Login page
 * @param
 * @returns {JSX.Element}
 * @constructor
 */

function Login() {
  const emailManager = useContext(emailContext);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://131.181.190.87:3000";

  function login() {
    const url = `${API_URL}/user/login`;

    if (emailManager.email !== null) {
      setError("Please logout before you log back in");
    }

    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        longExpiry: false,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error === true) {
          setError(res.message);
        }
        if (res.bearerToken.token !== undefined) {
          localStorage.setItem("bearerToken", res.bearerToken.token);
          localStorage.setItem("refreshToken", res.refreshToken.token);
          localStorage.setItem("email", emailValue);
          emailManager.setEmail(emailValue);
          setError(null);
          setSuccess("Login successful");
          navigate(-1);
        }
      });
  }

  return (
    <div className={"registerCss"}>
      <div>
        <h1>Login</h1>
        {error != null ? (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        ) : null}

        {success != null ? (
          <Alert variant="filled" severity="success">
            {success}
            <a id={"alertLink"} href="/">
              <br></br> Go back to home!
            </a>
          </Alert>
        ) : null}

        <form className={"registerForm"}>
          <input
            className={"registerInput"}
            aria-labelledby="login-button"
            placeholder="Email"
            name="email"
            id="email"
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          ></input>
          <input
            className={"registerInput"}
            aria-labelledby="login-button"
            placeholder="Password"
            name="password"
            id="password"
            type="password"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          ></input>
          <button className="card_btn" type="button" onClick={login}>
            Submit
          </button>
        </form>

        <p>
          Not a Member?
          <br></br>
          <a href="/user/register">Click here to register!</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
