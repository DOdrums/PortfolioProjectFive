import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo-no-background.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="43" />
        </Navbar.Brand>
      </NavLink>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            exact
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/"
          >
            <i className="fa-solid fa-icons"></i> Wall
          </NavLink>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/signin"
          >
            <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
          </NavLink>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/signup"
          >
            <i className="fas fa-user-plus"></i> Sign Up
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
