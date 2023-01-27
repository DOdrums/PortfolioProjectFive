import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo-no-background.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Navbar.Brand>
        <img src={logo} alt="logo" height="43" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <i className="fas fa-home"></i> Wall
          </Nav.Link>
          <Nav.Link>
            <i className="fas fa-sign-in-alt"></i> Sign In
          </Nav.Link>
          <Nav.Link>
            <i className="fas fa-user-plus"></i> Sign Up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
