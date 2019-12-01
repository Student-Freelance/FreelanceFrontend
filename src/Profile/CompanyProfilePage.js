import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ProfilePicture from "../Assets/profilepic.png";
import {observer} from "mobx-react";
import {useStores} from "../index";


const CompanyProfilePage = () => {
    const {userStore} = useStores();

    return (
        <div>
            <Container>
                <h3 className="profilHeadline">Profile</h3>
                <Row sm={12} md={12} xl={12}>
                    <Col xl={5}>
                        <Card body>
                            <Row sm={12} md={12} xl={12}>
                                <Col xl={5} sm={5} md={5} xs={5}>
                                    <Image fluid
                                           src={(userStore.companyUser.logo === '' || userStore.companyUser.logo == null) ? ProfilePicture : userStore.companyUser.logo}
                                           alt={"No image found"} roundedCircle/>
                                </Col>
                                <Col xl={6} sm={6} md={6} xs={6}>
                                    <br/>
                                    <h6>Name: {userStore.companyUser.companyName}</h6>
                                    <h6>Email: {userStore.companyUser.email}</h6>
                                </Col>
                            </Row>
                        </Card>
                        <br/>
                        <Card body>
                            <Row sm={12} md={12} xl={12}>
                                <Col xl={7}>
                                    <h6>Vat: {userStore.companyUser.vat} </h6>
                                    <h6>Website: {userStore.companyUser.website || 'no website'} </h6>
                                    <h6>Phone Number: {userStore.companyUser.phoneNumber}</h6>
                                    <h6>Email: {userStore.companyUser.email}</h6>
                                    <h6>Address:</h6>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={7}>
                        <Card body>
                            <Row sm={12} md={12} xl={12}>
                                <Col xl={10} md={10} sm={10} xs={10}>
                                    <h6 className="About"> Om</h6>
                                </Col>
                                <p> {userStore.companyUser.about}</p>
                            </Row>
                            <hr/>
                        </Card>
                        <br/>
                        <Card body>
                            <h6 className="jobs">Jobs</h6>
                            <hr/>
                            <p>{userStore.companyUser.jobs}</p>
                        </Card>
                        <br/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default observer(CompanyProfilePage);