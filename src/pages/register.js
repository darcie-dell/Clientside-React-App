import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function Register() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://131.181.190.87:3000";

  function registerUser() {
    if (authError !== null) {
      setError("Cannot register! Account details are wrong");
      setSuccess(null);
    } else {
      const url = `${API_URL}/user/register`;
      return fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.message);
            setSuccess(null);
          } else {
            setSuccess("User successfully registered");
            setError(null);
          }
        });
    }
  }

  function checkPassword(password1, password2) {
    if (password1.toString() !== password2.toString()) {
      setAuthError("Passwords do not match");
    } else {
      setAuthError(null);
      setPasswordValue(password1);
    }
  }

  function checkEmail(email) {
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email)) {
      setAuthInfo("Please make sure your email is in the format of name@domain.com.");
      setEmailValue(email);
    } else {
      setAuthInfo(null);
      setEmailValue(email);
    }
  }

  return (
    <div className={"registerCss"}>
      <div>
        <h1>Register</h1>
        {error != null ? (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        ) : null}

        {authError != null ? (
          <Alert variant="filled" severity="error">
            {authError}
          </Alert>
        ) : null}

        {authInfo != null ? (
            <Alert variant="filled" severity="info">
              {authInfo}
            </Alert>
        ) : null}

        {success != null ? (
          <Alert variant="filled" severity="success">
            {success}
            {navigate(`/user/login`)}
          </Alert>
        ) : null}

        <form className={"registerForm"}>
          <input
            className={"registerInput"}
            aria-labelledby="register-button"
            placeholder="Email"
            name="email"
            id="email"
            type="email"
            value={emailValue}
            onChange={(e) => {
              checkEmail(e.target.value);
            }}
          ></input>

          <input
            className={"registerInput"}
            aria-labelledby="register-button"
            placeholder="Password"
            name="password"
            id="password"
            type="password"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          ></input>

          <input
            className={"registerInput"}
            aria-labelledby="register-button"
            placeholder="Retype Password"
            name="password2"
            id="password2"
            type="password"
            onChange={(e) => {
              checkPassword(e.target.value, passwordValue);
            }}
          ></input>

          <button
            className="card_btn"
            id="register-button"
            type="button"
            onClick={registerUser}
          >
            Submit
          </button>
        </form>

        <p>
          Already a member? <br></br>
          <a href="/user/login">Click here to Login!</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
