import React from "react";
import "./MarketPage.css"
import CardDeck from "react-bootstrap/CardDeck";
import JobCard from "../../Components/Card/JobCard";
import {Col, Container, Row} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Label from "./Label";
import ActiveLabel from "./ActiveLabel";
import {observer} from "mobx-react";
import {useStores} from "../../index";

const MarketPage = () => {

    const {jobStore} = useStores();

    let search = '';
    let filteredJobs = [];
    let tags = [];
    let activeTag = {};
    let isLoading = true;


    createLabels();

    function createLabels() {
        console.log(jobStore);
        let tags = [];
        jobStore.jobs.map(job => job.tags.map((tag) => tags.push(tag)));
        let counts = {};
        for (let i = 0; i < tags.length; i++) {
            counts[tags[i]] = 1 + (counts[tags[i]] || 0);
        }
        this.tags = Object.keys(counts).map(key => [key, counts[key]]);
        this.isLoading = false;
    }

    function filterLabel(value) {
        if (value === this.activeTag) {
            this.filtered = [...jobStore.jobs];
            this.activeTag = '';
        } else {
            let jobs = [...jobStore.jobs];
            let filtered = jobs.filter(job => {
                    return job.tags.includes(value);
                }
            );
            this.filtered = filtered;
            this.activeTag = value;
        }
    }

    function searchJob() {
        const filter = this.search;
        let jobs = [...jobStore.jobs];
        this.filtered = jobs.filter(job => {
                if (!(job.title == null)) {
                    return job.description.includes(filter);
                }
            }
        );
    }

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
                                                 clickHandler={() => filterLabel(tag[0])}/>
                                    :
                                    <Label key={tag[0]} tag={tag}
                                           clickHandler={() => filterLabel(tag[0])}/>
                            )}
                        </ul>
                    </Col>
                    <Col xl={9} xs={12} className="cards">
                        <Row>
                            <Col>
                                <InputGroup className="mb-5">
                                    <FormControl
                                        value={search}
                                        onChange={(e) => this.search = e.target.value}
                                        placeholder="Search job titles"/>
                                    <InputGroup.Append>
                                        <Button variant="outline-primary"
                                                onClick={() => searchJob()}>Search</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row><Button onClick={() => this.props.history.push('/create')}>Create job</Button></Row>
                        <Row>

                            {(this.filtered.map(job => {
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
};

export default observer(MarketPage);
