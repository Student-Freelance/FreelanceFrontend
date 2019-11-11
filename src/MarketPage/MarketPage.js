import React from "react";
import "./MarketPage.css"
import CardDeck from "react-bootstrap/CardDeck";
import JobCard from "../Card/JobCard";
import {Col, Container, Row} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Axios from "axios";

class MarketPage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            isLoading: true,
            errors: null
        }
    }

    render() {
        return (
        <Container fluid>
            <Row sm={12} md={12} xl={12} >
            <Col  xl={2} className="d-none d-lg-block">
                <h1 className="d-flex justify-content-left">Labels</h1>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Front-end
                        <span className="badge badge-primary badge-pill">14</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Full-stack
                        <span className="badge badge-primary badge-pill">2</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Backend
                        <span className="badge badge-primary badge-pill">1</span>
                    </li>
                </ul>
                <h1 className="d-flex justify-content-left">Languages</h1>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Java
                        <span className="badge badge-primary badge-pill">299</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        C#
                        <span className="badge badge-primary badge-pill">2</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Angular
                        <span className="badge badge-primary badge-pill">1</span>
                    </li>
                </ul>
            </Col>
                    <Col xl={9} xs={12} className="cards">
                        <Row>
                            <Col>
                                <InputGroup className="mb-5">
                                    <FormControl
                                        placeholder="Job titel eller søge ord"/>
                                    <InputGroup.Append>
                                        <Button variant="outline-primary">Søg</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row>
                            <CardDeck>
                                {this.state.jobs.map((job) =>
                                    <JobCard
                                        key={job.id}
                                        title={job.title}
                                        text={job.text}
                                        url={job.url}
                                    />
                                )}
                            </CardDeck>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

async function getMarketPostsFromAPI() {
    const response = await Axios.get("https://devops01.eitlab.diplom.dtu.dk/api/Jobs");

    try {
        this.setState({
            jobs: response.data
        });
    } catch (error) {
        this.setState({ error, isLoading: false });
    }
}


export default MarketPage;
