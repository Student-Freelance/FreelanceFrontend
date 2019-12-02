import React, {useState} from "react";
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
import {useHistory} from "react-router-dom";
import {toJS} from "mobx";

let activeTag = '';

const MarketPage = () => {

    const [search, setSearchState] = useState([
        {search: ''}
    ]);
    let history = useHistory();
    const {jobStore} = useStores();

    function filterLabel(value) {
        if (!jobStore.isLoading) {
            if (value === activeTag) {
                jobStore.filteredJobs = [...jobStore.jobs];
                activeTag = '';
            } else {
                let jobs = [...jobStore.jobs];
                jobStore.filteredJobs = jobs.filter(job => {
                        return job.tags.includes(value);
                    }
                );
                activeTag = value;
            }
        }
    }

    function searchJob() {
        const filter = search.search;
        console.log(filter);
        let jobs = ([...toJS(jobStore.jobs)]);
        let filtered = jobs.filter(job => {
                if (!(job.title == null)) {
                    return job.description.includes(filter);
                }
            }
        );
        console.log(jobStore.filteredJobs);
        jobStore.filteredJobs = filtered;
    }

    function onSearchChange(event){
        setSearchState({search: event.target.value})
    }

    return (
        <Container fluid>
            {jobStore.isLoading ? <p>Loading ...</p> :
                <Row sm={12} md={12} xl={12}>
                    <Col xl={2} className="d-none d-lg-block">
                        <h1 className="d-flex justify-content-left">Labels</h1>
                        <ul className="list-group">
                            {jobStore.tags.slice(0, 10).map(tag =>
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
                                        value={search.value}
                                        onChange={onSearchChange}
                                        placeholder="Search job titles"/>
                                    <InputGroup.Append>
                                        <Button variant="outline-primary"
                                                onClick={searchJob}>Search</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row><Button onClick={() => history.push('/create')}>Create job</Button></Row>
                        <Row>
                            {(jobStore.filteredJobs.map(job => {
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
                                                handleJobClick={() => {
                                                    history.push(`job/${id}`);
                                                }}
                                                handleCompanyClick={() => history.push(`employer/${companyName}`)}/>
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
