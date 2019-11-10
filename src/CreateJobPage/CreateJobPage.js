import React, {Component} from "react";
import './CreateJobPage.css';
import {Tab, Tabs, Button, Form, Dropdown, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";

class CreateJobPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            companyName: "",
            title: "",
            salary: 0,
            description: "",
            scope: "",
            tags: [],
            freelancerAmount: 0,
            paidMonthly: false,
            paidHourly: false,
            experience: "",
            start: "",
            end: ""
        }
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleCompanyNameChange = (event) => {
        this.setState({
            companyName: event.target.value
        })
    }

    handleJobSaleryChange = (event) => {
        this.setState({
            salary: event.target.value
        })
    }

    handleLocationChange = (event) => {
        this.setState({
            location: event.target.value
        })
    }

    handleTagsChange = (event) => {
        this.setState({
            tags: event.target.value
        })
    }

    handleStartChange = (event) => {
        this.setState({
            start: event.target.value
        })
    }

    handleEndChange = (event) => {
        this.setState({
            end: event.target.value
        })
    }

    handleScopeChange = (event) => {
        this.setState({
            scope: event.target.value
        })
    }

    handleExperienceChange = (event) => {
        this.setState({
            experience: event.target.value
        })
    }

    handleFreelancerAmountChange = (event) => {
        this.setState({
            freelancerAmount: event.target.value
        })
    }

    handlePaidMonthlyChange = (event) => {
        this.setState({
            paidMonthly: event.target.value
        })
    }

    handlePaidHourlyChange = (event) => {
        this.setState({
            paidHourly: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Container className="CreateJobTitle">
                    <h1>Create job</h1>
                </Container>

                <Container className="CreateJobForm">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="CreateJobFormSummary">
                            <h2>Summary description</h2>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Job title</Form.Label>
                                <Form.Control type="text" value={this.state.title} placeholder="Enter job title" onChange={this.handleTitleChange} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Summary description</Form.Label>
                                <Form.Control as="textarea" rows="3" value={this.state.description} placeholder="Enter job description" onChange={this.handleDescriptionChange} />
                            </Form.Group>

                            <Form.Row className="CreateJobFormDetailed">
                                <Col>
                                    <Form.Label>Company name</Form.Label>
                                    <Form.Control type="text" value={this.state.companyName} placeholder="Enter company name" onChange={this.handleCompanyNameChange} />
                                </Col>
                                <Col>
                                    <Form.Label>Job salery</Form.Label>
                                    <Form.Control type="number" value={this.state.salary} placeholder="Enter job salery" onChange={this.handleJobSaleryChange} />
                                </Col>
                            </Form.Row>

                            <Form.Group>
                                <Form.Label>Job location</Form.Label>
                                <Form.Control type="text" value={this.state.location} placeholder="Enter job location" onChange={this.handleLocationChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Job tags</Form.Label>
                                <Form.Control type="text" value={this.state.tags} placeholder="Enter job tags, being comma seperated," onChange={this.handleTagsChange} />
                            </Form.Group>

                        </Form.Group>

                        <Form.Group className="CreateJobFormDetailed">
                            <h2>Detailed description</h2>

                            <Form.Row className="CreateJobFormSeperator">
                                <Col>
                                    <Form.Label>Job start</Form.Label>
                                    <Form.Control type="text" value={this.state.start} placeholder="Enter job start" onChange={this.handleStartChange} />
                                </Col>
                                <Col>
                                    <Form.Label>Job end</Form.Label>
                                    <Form.Control type="text" value={this.state.end} placeholder="Enter job end" onChange={this.handleEndChange} />
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Label>Job scope</Form.Label>
                                    <Form.Control type="text" value={this.state.scope} placeholder="Enter job scope" onChange={this.handleScopeChange} />
                                </Col>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Experience level</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose experience Level</option>
                                        <option value={this.state.experience} onChange={this.handleExperienceChange}>Junior</option>
                                        <option value={this.state.experience} onChange={this.handleExperienceChange}>Senior</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Label>Amount of freelancers</Form.Label>
                                    <Form.Control type="number" value={this.state.freelancerAmount} placeholder="Enter amount of freelancers" onChange={this.handleFreelancerAmountChange} />
                                </Col>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Payment method</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose monthly/hourly</option>
                                        <option value={this.state.paidMonthly} onChange={this.handlePaidMonthlyChange}>Monthly</option>
                                        <option value={this.state.paidHourly} onChange={this.handlePaidHourlyChange}>Hourly</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                        </Form.Group>

                        <Button onClick={() => performHTTPRequest(this.state.email, this.state.password, this.state.confirmPassword, this.state.companyName, this.state.userName)} variant="primary" type="submit" size="lg" block>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

async function performHTTPRequest(username, password) {
    const response = await Axios.post(
        'https://devops01.eitlab.diplom.dtu.dk/api/Jobs', {
            userName: username,
            password: password
        }).then(res => {
        console.log(res.data)
    }).catch(error => {
        console.log(error)
    })
}

export default CreateJobPage;
