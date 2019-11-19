import React from "react";
import "./MarketPage.css"
import CardDeck from "react-bootstrap/CardDeck";
import JobCard from "../Card/JobCard";
import {Col, Container, Row} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {AxiosAgent} from "../Shared/Web/AxiosAgent";

class MarketPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            isLoading: true,
            errors: null
        }
    }

    async getMarketPostsFromAPI() {
        AxiosAgent.GetMany("Jobs")
            .then(
                (response) => this.setState({jobs: response.data, isLoading: false})
            )
        //
        // try {
        //     this.setState({
        //         jobs: response.data,
        //         isLoading: false
        //     });
        // } catch (error) {
        //     this.setState({error, isLoading: false});
        // }
    }

    componentDidMount() {
        this.getMarketPostsFromAPI();
    }

    render() {
        const {isLoading, jobs} = this.state;
        return (
            <Container fluid>
                <Row sm={12} md={12} xl={12}>
                    <Col xl={2} className="d-none d-lg-block">
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
                            {!isLoading ? (jobs.map(job => {
                                    const {id, title, description, location, createdOn} = job;
                                    return (
                                        <CardDeck key={id}
                                                  style={{padding: "5px", width: "20vh"}}
                                                  onClick={() => this.props.history.push(`detailedJob/${id}`)}>
                                            <JobCard
                                                jobId={id}
                                                title={title}
                                                location={location}
                                                description={description}
                                                date={createdOn}/>
                                        </CardDeck>
                                    );
                                })
                            ) : (
                                <p>Loading...</p>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MarketPage;
