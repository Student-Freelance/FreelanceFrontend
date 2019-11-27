import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react";
import {Link} from 'react-router-dom';
import {useStores} from "../index";


const NavBar = () => {
    const {userStore, authStore} = useStores();
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand as={Link} to={`${process.env.PUBLIC_URL}/`}>Freelancer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {authStore.authenticated ?
                        <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/market`}>Market</Nav.Link> : ''}
                    {authStore.authenticated ? <NavDropdown title={userStore.companyUser.companyName === '' ?
                        userStore.studentUser.firstname + " " + userStore.studentUser.lastname : userStore.companyUser.companyName}
                                                            id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link}
                                          to={`${process.env.PUBLIC_URL}/profilepage`}>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {
                            userStore.logout();
                        }}>Logout</NavDropdown.Item>
                    </NavDropdown> : <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/login`}>Login</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default observer(NavBar);

