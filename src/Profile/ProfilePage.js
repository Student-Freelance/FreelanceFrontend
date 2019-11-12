import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./ProfilePage.css"
import Image from "react-bootstrap/Image";
import ProfilePicture from "../Assets/profilepic.png"
import {Col, Row} from "react-bootstrap";
import editPen from "../Assets/editPen.png"

function ProfilePage() {
    return(
        <div>
            <Container >
                <h3 class="profilHeadline">Profile</h3>
                <Row sm={12} md={12} xl={12}>
                    <Col xl={4}>
                        <Card body>
                            <Row sm={12} md={12} xl={12}>
                            <Col xl={5} sm={5} md={5} xs={5}>
                                <Image fluid src={ProfilePicture} roundedCircle/>
                            </Col>
                                <Col xl={6} sm={6} md={6} xs={6}>
                                    <br/>
                                    <h5>Name: </h5>
                                    <h5>Email: </h5>
                                </Col>
                            </Row>
                        </Card>
                        <br/>
                    </Col>
                    <Col xl={8}>
                        <Card body>
                            <Row sm={12} md={12} xl={12}>
                                <Col xl={10} md={10} sm={10} xs={10}>
                                    <h6 className="resume">Mit resumé</h6>
                                </Col>
                                <hr/>
                                <Col xl={1} md={1} sm={1} xs={1}>
                                    <a href="#">
                                        <Image fluid src={editPen}/>
                                    </a>
                                </Col>
                            </Row>
                            <hr/>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 class="education">Min uddannelse</h6>
                            <hr/>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 class="experience">Min erfaring</h6>
                            <hr/>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 class="skills">Mine kompetencer</h6>
                            <hr/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default ProfilePage;