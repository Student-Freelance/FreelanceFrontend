import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./StudentProfilePage.css"
import Image from "react-bootstrap/Image";
import ProfilePicture from "../Assets/profilepic.png"
import {Col, Row} from "react-bootstrap";
import editPen from "../Assets/editPen.png"
import ProfileCard from "../Card/ProfileCard";

class StudentProfilePage extends Component{

    constructor(props) {
        super(props);

    }

    render() {
        let user = JSON.parse(sessionStorage.getItem('User'));
        let name = user.firstname + " " + user.lastname;
        return (
            <div>
                <Container>
                    <h3 className="profilHeadline">Profile</h3>
                    <Row sm={12} md={12} xl={12}>
                        <Col xl={4}>
                            <Card body>
                                <Row sm={12} md={12} xl={12}>
                                    <Col xl={5} sm={5} md={5} xs={5}>
                                        <Image fluid src={user.logo} alt={ProfilePicture} roundedCircle/>
                                    </Col>
                                    <Col xl={6} sm={6} md={6} xs={6}>
                                        <br/>
                                        <h6>Name: {name} </h6>
                                        <h6>Email: {user.email} </h6>
                                    </Col>
                                </Row>
                            </Card>
                            <br/>
                        </Col>
                        <Col xl={8}>
                            <Row sm={12} md={12} xl={12}>
                                <ProfileCard>

                                </ProfileCard>
                            </Row>
                            {/*<Card body>
                            <Row sm={12} md={12} xl={12}>
                                <Col xl={10} md={10} sm={10} xs={10}>
                                    <h6 className="resume">{user.resume[0]}</h6>
                                </Col>
                                <hr/>
                                <Col xl={1} md={1} sm={1} xs={1}>
                                     eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    <a href="#">
                                        <Image fluid src={editPen}/>
                                    </a>
                                </Col>
                            </Row>
                            <hr/>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 className="education">Min uddannelse</h6>
                            <hr/>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 className="experience">Min erfaring</h6>
                            <hr/>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 className="skills">Mine kompetencer</h6>
                            <hr/>
                        </Card>*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default StudentProfilePage;