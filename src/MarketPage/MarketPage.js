import React from "react";
import "./MarketPage.css"
import CardDeck from "react-bootstrap/CardDeck";
import JobCard from "../Card/JobCard";
import {Col, Container, Row} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {AxiosAgent} from "../Shared/Web/AxiosAgent";
import Label from "./Label";

class MarketPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            isLoading: true,
            errors: null,
            tags: []
        };

    }

    async getMarketPostsFromAPI() {
        AxiosAgent.GetMany("Jobs")
            .then(
                (response) => {
                    this.setState({jobs: response.data}, () => this.createLabels());
                }
            )
    }

    componentDidMount() {
        this.getMarketPostsFromAPI();
    }

    async createLabels() {
        let tags = [];
        this.state.jobs.map(job => job.tags.map((tag) => tags.push(tag)));
        let counts = {};
        for (let i = 0; i < tags.length; i++) {
            counts[tags[i]] = 1 + (counts[tags[i]] || 0);
        }
        let result = Object.keys(counts).map(key => [key, counts[key]]);
        this.setState({tags: result, isLoading: false});
    }

    render() {
        const {isLoading, jobs, tags} = this.state;
        return (
            <Container fluid>
                {isLoading ? <p>Loading ...</p> :
                    <Row sm={12} md={12} xl={12}>
                        <Col xl={2} className="d-none d-lg-block">
                            <h1 className="d-flex justify-content-left">Labels</h1>
                            <ul className="list-group">
                                {tags.slice(0,10).map(tag => <Label key={tag[0]} tag={tag}/>)}
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
                            <Row><Button onClick={() => this.props.history.push('/create')}>Create job</Button></Row>
                            <Row>

                                {(jobs.map(job => {
                                        const {id, title, description, location, createdOn} = job;
                                        return (
                                            <CardDeck key={id}
                                                      style={{padding: "5px", width: "20vh"}}
                                                      onClick={() => this.props.history.push(`job/${id}`)}>
                                                <JobCard
                                                    jobId={id}
                                                    title={title}
                                                    location={location}
                                                    description={description}
                                                    date={createdOn}/>
                                            </CardDeck>
                                        );
                                    })
                                )}
                            </Row>
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
}


export default MarketPage;
