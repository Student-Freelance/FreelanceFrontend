import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ProfilePicture from "../Assets/profilepic.png";
import ProfileCard from "../Card/ProfileCard";
import {string} from "prop-types";


class CompanyProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };


    }

    render() {
        let company = JSON.parse(sessionStorage.getItem('User'));
        return(
            <div>
                <Container>
                    <h3 className="profilHeadline">Profile</h3>
                    <Row sm={12} md={12} xl={12}>
                        <Col xl={4}>
                            <Card body>
                                <Row sm={12} md={12} xl={12}>
                                    <Col xl={5} sm={5} md={5} xs={5}>
                                        <Image fluid src={company.logo} alt={ProfilePicture} roundedCircle/>
                                    </Col>
                                    <Col xl={6} sm={6} md={6} xs={6}>
                                        <br/>
                                        <h6>Name: {company.companyName}</h6>
                                        <h6>Email: {company.email}</h6>
                                    </Col>
                                    <Col>
                                        <h6>Vat: {company.vat} </h6>
                                        <h6>Website: {company.website || 'no website'} </h6>
                                        <h6>Phone Number: {company.phoneNumber}</h6>
                                        <h6>Address: </h6>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default CompanyProfilePage;