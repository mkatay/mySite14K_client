import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export const MyNavbar = ({ loggedInUser, setLoggedInUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="sm" dark color="dark" fixed="top">
        <NavbarBrand href="/">🚀</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to="/" className="nav-link" aria-current="page">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="about" className="nav-link">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="contact" className="nav-link">
                Contact
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="products" className="nav-link">
                Products
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            <NavItem>
              {loggedInUser?.username ? (
                <NavLink to="/userprofile" className="nav-link username d-flex  align-items-center">
                  <img className="avatar m-1" src={loggedInUser.avatar} style={{height: "50px"}}/>
                  <span>{loggedInUser.username}</span>
                </NavLink>
              ) : (
                <NavLink to="login" className="nav-link">
                  Login
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {loggedInUser?.username ? (
                <h4
                  className="nav-link btn"
                  onClick={() => setLoggedInUser({})}
                >
                  Logout
                </h4>
              ) : (
                <NavLink to="register" className="nav-link">
                  Register
                </NavLink>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
