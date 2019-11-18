import React, {Component} from "react";
import './DetailedJobPage.css';
import {Badge, Card, Col, Container, Row} from 'react-bootstrap';
import {AxiosAgent} from "../../Shared/Web/AxiosAgent";
import Job from "../Job";


class DetailedJobPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            job: Job,
            isLoaded: false
        };
    }

    componentDidMount() {
        const {handle} = this.props.match.params;
        try {
            AxiosAgent.GetOne("Jobs", handle)
                .then((job) => {
                    console.table(job);
                    this.setState({job: job.data});
                    this.setState({isLoaded: true});
                    console.log(job)
                })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return <div>
            <Container className="summary-Job-Description">
                <Container>
                    <h2>{this.state.job.title} - Summary job description (Job title)</h2>

                    {/*<div>
                        {!this.state.isLoading ? (this.state.job.tags.map(tag => {
                                return (
                                    <Badge variant="primary">{tag}</Badge>
                                );
                            })
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>*/}

                    <div>
                        <Badge variant="primary">First tag</Badge>
                        <Badge variant="primary">Second tag</Badge>
                        <Badge variant="primary">Third tag</Badge>
                        <Badge variant="secondary">Fourth tag</Badge>
                    </div>

                    <Row>
                        <Col sm={8}>
                            <Card>
                                <Card.Body>
                                    {this.state.job.description}
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col sm={4}>
                            <Card className="text-center">
                                <Card.Body>
                                    <div className="aboutJobRightCard">
                                        <Card.Title>Pr. time</Card.Title>
                                        <Card.Text>DKK {this.state.job.salary}.</Card.Text>
                                    </div>
                                    <div className="aboutJobRightCard">
                                        <Card.Title>Job start</Card.Title>
                                        <Card.Text>{this.state.job.jobStart}</Card.Text>
                                    </div>
                                    <div className="aboutJobRightCard">
                                        <Card.Title>Arbejdssted</Card.Title>
                                        <Card.Text>Region: </Card.Text>
                                        <Card.Text className="text-muted">1456 København K</Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </Container>

            <Container className="detailed-Job-Description">
                <Container>
                    <h2>Detailed job description</h2>
                    <Row>
                        <Col sm={8}>
                            <Card>
                                <Card.Body>
                                    <table className="table table-borderless">
                                        <tbody>
                                        <tr>
                                            <th scope="row">Job start og slut</th>
                                            <td>Starter: {this.state.job.jobStart}
                                                <br></br>Stopper: {this.state.job.jobEnd}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Deadline</th>
                                            <td>{this.state.job.deadline}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Erfaringsniveau</th>
                                            <td>{this.state.job.experience}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Antal freelancere</th>
                                            <td>{this.state.job.freelancers}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{this.state.job.companyName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Company address</Card.Subtitle>
                                    <Card.Text>Some quick example text to build on the card title and make
                                        up the bulk of the card's content.</Card.Text>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </Container>
        </div>;
    }


}

export default DetailedJobPage;