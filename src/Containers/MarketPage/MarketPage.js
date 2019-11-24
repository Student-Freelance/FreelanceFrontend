import React from "react";
import "./MarketPage.css"
import CardDeck from "react-bootstrap/CardDeck";
import JobCard from "../../Components/Card/JobCard";
import {Col, Container, Row} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {AxiosAgent} from "../../Web/AxiosAgent";
import Label from "./Label";
import ActiveLabel from "./ActiveLabel";

class MarketPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            jobs: [],
            filteredJobs: [],
            isLoading: true,
            tags: [],
            activeTag: {},
        };
        this.filterLabel = this.filterLabel.bind(this);
        this.searchJob = this.searchJob.bind(this)
    }

    async getMarketPostsFromAPI() {
        AxiosAgent.GetMany("Jobs")
            .then(
                (response) => {
                    this.setState({jobs: response.data, filtered: response.data}, () => this.createLabels());
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

    filterLabel = value => {
        if (value === this.state.activeTag) {
            this.setState({filtered: [...this.state.jobs], activeTag: ''})
        } else {
            let jobs = [...this.state.jobs];
            let filtered = jobs.filter(job => {
                    return job.tags.includes(value);
                }
            );
            this.setState({filtered: filtered, activeTag: value})
        }
    };

    searchJob = () => {
        const filter = this.state.search;
        let jobs = [...this.state.jobs];
        const filtered = jobs.filter(job => {
                if (!(job.title == null)) {
                    return job.description.includes(filter);
                }
            }
        );
        this.setState({filtered: filtered});
    };

    render() {
        const {isLoading, jobs, filtered, tags, activeTag, search} = this.state;
        return (
            <Container fluid>
                {isLoading ? <p>Loading ...</p> :
                    <Row sm={12} md={12} xl={12}>
                        <Col xl={2} className="d-none d-lg-block">
                            <h1 className="d-flex justify-content-left">Labels</h1>
                            <ul className="list-group">
                                {tags.slice(0, 10).map(tag =>
                                    (tag[0] === activeTag) ?
                                        <ActiveLabel key={tag[0]} tag={tag}
                                                     clickHandler={() => this.filterLabel(tag[0])}/>
                                        :
                                        <Label key={tag[0]} tag={tag}
                                               clickHandler={() => this.filterLabel(tag[0])}/>
                                )}
                            </ul>
                        </Col>
                        <Col xl={9} xs={12} className="cards">
                            <Row>
                                <Col>
                                    <InputGroup className="mb-5">
                                        <FormControl
                                            value={search}
                                            onChange={(e) => this.setState({search: e.target.value})}
                                            placeholder="Search job titles"/>
                                        <InputGroup.Append>
                                            <Button variant="outline-primary"
                                                    onClick={() => this.searchJob()}>Search</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row><Button onClick={() => this.props.history.push('/create')}>Create job</Button></Row>
                            <Row>

                                {(filtered.map(job => {
                                        const {id, title, description, location, createdOn, companyName} = job;
                                        return (
                                            <CardDeck key={id}
                                                      style={{padding: "5px", width: "20vh"}}>
                                                <JobCard
                                                    jobId={id}
                                                    title={title}
                                                    companyName={companyName}
                                                    location={location}
                                                    description={description}
                                                    date={createdOn}
                                                    handleJobClick={() => this.props.history.push(`job/${id}`)}
                                                    handleCompanyClick={() => this.props.history.push(`employer/${companyName}`)}/>
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
