import React from "react";
import './DetailedJobPage.css';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {useStores} from "../../../index";
import {toJS} from "mobx";
import JobBadge from "./JobBadge";
import {observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

let job = {};
let isLoading = true;

const DetailedJobPage = () => {
    let history = useHistory();
    const {jobStore} = useStores();
    const {handle} = useParams();
    mapJob();

    function mapJob() {
        // eslint-disable-next-line array-callback-return
        jobStore.jobs.map(jobIterator => {
            if (jobIterator.id === String(handle)) {
                job = toJS(jobIterator);
                isLoading = false;
            }
        })
    }

    return (
        <div>
            {isLoading ? <p>Loading ...</p> :
                <div>
                    <Container className="summary-Job-Description">
                            <h2>{job.title}</h2>
                            <div>
                                {job.tags.slice(0,10).map(tag => <JobBadge key={tag} tag={tag}/>)}
                            </div>
                            <Row>
                                <Col sm={8}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Description</Card.Title>
                                            {job.description}
                                            <hr></hr>
                                            <Card.Subtitle>Salary {job.payment}</Card.Subtitle>
                                            <Card.Text>{job.salary} DKK </Card.Text>
                                            <Card.Subtitle>Start by </Card.Subtitle>
                                            <Card.Text>{new Date(job.jobStart).toDateString()}</Card.Text>
                                            <Card.Subtitle>End by</Card.Subtitle>
                                            <Card.Text>{new Date(job.jobEnd).toDateString()}</Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">Created {new Date().getDate() -  new Date(job.createdOn).getDate()} days ago</small>
                                            </Card.Text>
                                            <hr/>
                                            <Card.Subtitle>Contact: <a href={`mailto:notimplemented@info.dk`}>Email</a></Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={4}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            <div className="aboutJobRightCard">
                                                <Card.Title>
                                                    <Card.Link href='#'
                                                               onClick={() => history.push(`/employer/${job.companyName}`)}>{job.companyName}</Card.Link>
                                                </Card.Title>
                                                <Card.Text
                                                    className="text-muted">{job.location.street} {job.location.number}</Card.Text>
                                                <Card.Text
                                                    className="text-muted">{job.location.zip} {job.location.city}</Card.Text>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                    </Container>
                </div>
            }
        </div>
    )
};
export default observer(DetailedJobPage);
