import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavDropdown} from "react-bootstrap";
import {withAuth} from "react-auth-guard";


const NavBar = ({auth}) => {
    let name = '';
    if (auth.authenticated) {
        let user = JSON.parse(sessionStorage.getItem('User'));
        name = user.username;
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand href="/">Freelancer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {auth.authenticated ? <Nav.Link href="/market">Market</Nav.Link> : ''}
                    {auth.authenticated ? <NavDropdown title={name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profilepage">Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={auth.logout}>Logout</NavDropdown.Item>
                    </NavDropdown> : <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default withAuth(NavBar);

