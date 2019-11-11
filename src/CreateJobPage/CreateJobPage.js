import React, {Component} from "react";
import './CreateJobPage.css';
import {Tab, Tabs, Button, Form, Dropdown, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class CreateJobPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            companyName: "",
            title: "",
            salary: 0,
            description: "",
            tags: [],
            paidMonthly: false,
            paidHourly: false,
            experience: "",
            freelancers: 0,
            deadlineDate: "",  //new Date(),
            createdOn: "",
            startDate: "", //new Date(),
            endDate: "", //new Date(),
        }
    }

    handleStartDateChange = date => {
        this.setState({
            startDate: date
        })
    }

    handleEndDateChange = date => {
        this.setState({
            endDate: date
        })
    }

    handleDeadlineDateChange = date => {
        this.setState({
            deadlineDate: date
        })
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

    handleExperienceChange = (event) => {
        this.setState({
            experience: event.target.value
        })
    }

    handlePaidHourlyMonthlyChange = (event) => {
        this.setState({paidMonthly: false})
        this.setState({paidHourly: false})

        const chosenPaymentInterval = event.target.value;

        this.setState({
            [chosenPaymentInterval]: true
        })
    }

    handleFreelancersChange = (event) => {
        this.setState({
            freelancers: event.target.value
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
                                    <DatePicker todayButton="Today" selected={this.state.startDate} onChange={this.handleStartDateChange} placeholderText="Enter start date." showWeekNumbers />
                                </Col>
                                <Col>
                                    <Form.Label>Job end</Form.Label>
                                    <DatePicker todayButton="Today" selected={this.state.endDate} onChange={this.handleEndDateChange} placeholderText="Enter end date." showWeekNumbers />
                                </Col>
                                <Col>
                                    <Form.Label>Deadline</Form.Label>
                                    <DatePicker todayButton="Today" selected={this.state.deadlineDate} onChange={this.handleDeadlineDateChange} placeholderText="Enter deadline date." showWeekNumbers />
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState" onChange={this.handleExperienceChange}>
                                    <Form.Label>Experience level</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose experience Level</option>
                                        <option value="junior">Junior</option>
                                        <option value="senior">Senior</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Form.Label>Amount of freelancers</Form.Label>
                                    <Form.Control type="number" value={this.state.freelancers} placeholder="Enter amount of freelancers" onChange={this.handleFreelancersChange} />
                                </Col>
                                <Form.Group as={Col} controlId="formGridState" onChange={this.handlePaidHourlyMonthlyChange}>
                                    <Form.Label>Payment method</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose monthly/hourly</option>
                                        <option value="paidMonthly">Monthly</option>
                                        <option value="paidHourly">Hourly</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                        </Form.Group>

                        <Button onClick={() => performHTTPRequest(this.state.companyName, this.state.title, this.state.salary, this.state.location, this.state.description, this.state.tags, this.state.paidMonthly, this.state.paidHourly, this.state.experience, this.state.freelancers, this.state.deadlineDate, moment().format(),this.state.startDate, this.state.endDate)} variant="primary" type="submit" size="lg" block>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

async function performHTTPRequest(companyName, title, salary, location, description, tags, paidMonthly, paidHourly, experience, freelancers, deadline, createdOn, start, end) {
    const response = await Axios.post(
        'https://devops01.eitlab.diplom.dtu.dk/api/Jobs', {
            companyName: companyName,
            title: title,
            salary: salary,
            location: location,
            description: description,
            tags: tags,
            paidMonthly: paidMonthly,
            paidHourly: paidHourly,
            experience: experience,
            freelancers: freelancers,
            deadline: deadline,
            createdOn: createdOn,
            jobStart: start,
            jobEnd: end
        }).then(res => {
        console.log(res.data)
    }).catch(error => {
        console.log(error)
    })
}

export default CreateJobPage;
