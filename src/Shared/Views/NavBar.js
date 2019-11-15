import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavDropdown} from "react-bootstrap";
import {withAuth} from "react-auth-guard";


const NavBar = ({auth}) => {
    let user = JSON.parse(localStorage.getItem('User'));
    let name = user.firstname + " " + user.lastname;
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand href="/">Freelancer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/market">Market</Nav.Link>
                    <NavDropdown title={name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profilepage">Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={auth.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default withAuth(NavBar);

