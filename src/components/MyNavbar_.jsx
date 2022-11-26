import React,{useState} from 'react'
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
  } from 'reactstrap';

export const MyNavbar=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar expand="md"  color="dark" fixed="top"   dark>
        <NavbarBrand href="/">MySite🚀</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="about" className="nav-link" >About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  to="contact" className="nav-link" >Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  to="products" className="nav-link">Products</NavLink>
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
          <NavItem >
                <NavLink  to="login" className="nav-link" >Login</NavLink>
              </NavItem>
              <NavItem >
                <NavLink  to="register" className="nav-link">Sign Up</NavLink>
              </NavItem>
       </Nav> 
        </Collapse>
      </Navbar>
    </div>
  )
}
