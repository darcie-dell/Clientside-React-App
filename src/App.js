import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import NavBar from "./components/navBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import { Home } from "./pages/home";
import { Movies } from "./pages/movies";
import { MovieInd } from "./pages/movieInd";
import Register from "./pages/register";
import Login from "./pages/login";
import { People } from "./pages/person";
import { Protected } from "./components/protectedRoute";
import { CleanLogout, logout } from "./pages/logout";
import Refresh, {CleanRefresh} from "./pages/refresh";


/**
 * Creates context to set/supply user email.
 * @type {React.Context<unknown>}
 */
export const emailContext = createContext();

/**
 * Root of application.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const [email, setEmail] = useState(localStorage.getItem("email"));

  return (
    <emailContext.Provider value={{ email: email, setEmail: setEmail }}>
      <div className="App">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Castoro+Titling&family=Darumadrop+One&family=Monsieur+La+Doulaise&display=swap');
        </style>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"movies/search"} element={<Movies />} />
            <Route path={"/movie"} element={<MovieInd />} />
            <Route path={"/user/register"} element={<Register />} />
            <Route path={"/user/login"} element={<Login />} />
            <Route path={"/user/logout"} element={<CleanLogout />} />
            <Route
              path="/people"
              element={
                <Protected>
                  <People />
                </Protected>
              }
            />
            <Route path={"/user/refresh"} element={<CleanRefresh />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </emailContext.Provider>
  );
}

export default App;
