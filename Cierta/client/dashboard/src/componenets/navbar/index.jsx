import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './style.scss';

const Menu = () => {
    const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar bg="primary" expand="lg" collapseOnSelect className="navbar">
      <Container>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="custom-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           {user && user.role !=="partner" && <>
           <Nav.Link href="/admin/add-user" className="nav-link-custom">
              Add User
            </Nav.Link>
            <Nav.Link href="dashboard" className="nav-link-custom">
              Change Content
            </Nav.Link></>}
            <Nav.Link href="/login" className="nav-link-custom text-danger" onClick={()=>localStorage.clear()}>

              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;