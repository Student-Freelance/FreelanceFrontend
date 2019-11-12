import React, {Component} from "react";
import './DetailedJobPage.css';
import {Badge, Card, Container, Col, Row} from 'react-bootstrap';

class DetailedJobPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jobId: ""
        }
    }

    render() {
        return (
            <div>
                <Container className="summary-Job-Description">
                    <Container>
                        <h2>Summary job description (Job title)</h2>

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
                                        <p>{this.props.title}</p>
                                        <p>Vi har brug for en frisk person der vil få ansvaret for reaktivering
                                            tidligere
                                            kunder. Vi har rigtig gode realtioner og et godt renome hos dem og vi kan
                                            garanteret nyde godt af at de får lidt fornyet opmærksomhed.</p>
                                        <br></br>

                                        Dine opgaver vil være at:
                                        <ul>
                                            <li>Reaktivere eksisterende kunder hos os (IT-forhandlere) som tidligere har
                                                handlet, men er stoppet
                                            </li>
                                            <li>Få eksisterende mindre kunder til at handler oftere og/ eller mere hos
                                                os.
                                            </li>
                                            <li>Produkterne er computere og printere</li>
                                            <li>Personen skal være serviceminded, venlig og energisk</li>
                                            <li>Det er ikke et krav at vedkommende har detaljeret produktviden, men skal
                                                vide hvad en computer og printer består af overordnet
                                            </li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col sm={4}>
                                <Card className="text-center">
                                    <Card.Body>
                                        <div className="aboutJobRightCard">
                                            <Card.Title>Pr. time</Card.Title>
                                            <Card.Text>DKK 400 - 700.</Card.Text>
                                        </div>
                                        <div className="aboutJobRightCard">
                                            <Card.Title>Job start</Card.Title>
                                            <Card.Text>Snarest muligt</Card.Text>
                                        </div>
                                        <div className="aboutJobRightCard">
                                            <Card.Title>Arbejdssted</Card.Title>
                                            <Card.Text>Region: Storkøbenhavn</Card.Text>
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
                                                <td>Starter: Snarest muligt
                                                    <br></br>Stopper: 30. sep 2021
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Omfang</th>
                                                <td>Konsulentopgave på fuld tid</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Erfaringsniveau</th>
                                                <td>Junior<br></br>Senior</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Antal freelancere</th>
                                                <td>2</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Afregning</th>
                                                <td>Mark</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Opslagets friskhed</th>
                                                <td>Spritny</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Forventet svartid</th>
                                                <td>Vi svarer løbende<br></br>
                                                    <p className="text-muted">Virksomhedens seneste besked sendt 1 uge
                                                        siden</p></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Company name</Card.Title>
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

            </div>
        )
    }


}

export default DetailedJobPage;