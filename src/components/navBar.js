import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import React, { useContext } from "react";
import { LoggedIn } from "./displayLoggedIn";
import { emailContext } from "../App";

/**
 * Nav bar that navigates the pages of the application,
 * loggedIn is passed down to loggedIn component to display users email in the nav bar
 * @param loggedIn
 * @returns {JSX.Element}
 * @constructor NavBar
 */
function NavBar() {
  const emailManager = useContext(emailContext);

  return (
    <div className="navContainer">
      <Container>
        <Navbar className="navBar fixed-top ">
          <Container className={""}>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/movies/search">Movies</Nav.Link>
              {emailManager.email === null ? (
                <>
                  <Nav.Link href="/user/register">Register</Nav.Link>
                  <Nav.Link href="/user/login">Login</Nav.Link>
                </>
              ) : (
                <>
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                      <LoggedIn />
                    </Navbar.Text>
                  </Navbar.Collapse>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default NavBar;
