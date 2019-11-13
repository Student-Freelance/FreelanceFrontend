import React, {Component} from "react";
import './CreateJobPage.css';
import {Button, Form, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {WithContext as ReactTags} from 'react-tag-input';
import Job from '../Job'
import {AxiosAgent} from "../../Shared/Web/AxiosAgent";

const http = new AxiosAgent();

class CreateJobPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            job: Job,
            start: new Date(),
            end: new Date()
        };

        // this.handleExperienceChange = this.handleExperienceChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    /* React-tags onChange handlers
    https://www.npmjs.com/package/react-tag-input#usage
    */
    handleDelete(i) {
        const {tags} = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({job: {tags: [...state.job.tags, tag]}}));
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let job = {...this.state.job};
        job[name] = value;
        this.setState({
            job: job
        });
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.job.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // Re-render
        this.setState({job: {tags: newTags}});
    }

    handleStartDateChange = date => {
        let job = {...this.state.job};
        job.jobStart = date;
        this.setState({
            job: job
        });
    };

    handleEndDateChange = date => {
        let job = {...this.state.job};
        job.jobEnd = date;
        this.setState({
            job: job
        });
    };

    handlePaymentChange = event => {
        this.setState({job: {paidHourly: false}});
        this.setState({job: {paidMonthly: false}});
        if (event.target.value === 'paidMonthly') {
            this.setState({job: {paidMonthly: true}})
        } else {
            this.setState({job: {paidHourly: true}})
        }
    };

    render() {
        // const {tags} = this.state;
        const {title, companyName, description, salary, location, tags,
            paidMonthly, paidHourly, experience, jobStart, jobEnd} = this.state.job;
        return (
            <div>
                <Container className="CreateJobTitle">
                    <h1>Create job</h1>
                </Container>

                <Container className="CreateJobForm">
                    <Form>
                        <Form.Group className="CreateJobFormSummary">
                            <h2>Summary description</h2>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Job title</Form.Label>
                                <Form.Control name="title"
                                              value={title}
                                              placeholder="Enter job title"
                                              onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Summary description</Form.Label>
                                <Form.Control as="textarea" rows="3"
                                              name="description"
                                              value={description}
                                              placeholder="Enter job description"
                                              onChange={this.handleInputChange}/>
                            </Form.Group>

                            <Form.Row className="CreateJobFormDetailed">
                                <Col>
                                    <Form.Label>Company name</Form.Label>
                                    <Form.Control name="companyName"
                                                  value={companyName}
                                                  placeholder="Enter company name"
                                                  onChange={this.handleInputChange}/>
                                </Col>
                                <Col>
                                    <Form.Label>Job salary</Form.Label>
                                    <Form.Control name="salary"
                                                  value={salary}
                                                  placeholder="Enter job salary"
                                                  onChange={this.handleInputChange}/>
                                </Col>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Job location</Form.Label>
                                <Form.Control name="location"
                                              value={location}
                                              placeholder="Enter job location"
                                              onChange={this.handleInputChange}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Job tags</Form.Label>
                                <div id="app">
                                    <ReactTags classNames={{
                                        tags: 'ReactTags__tags',
                                        tagInput: 'ReactTags__tagInput',
                                        tagInputField: 'ReactTags__tagInputField',
                                        selected: 'ReactTags__selected',
                                        tag: 'ReactTags__tag',
                                        remove: 'ReactTags__remove',
                                        suggestions: 'ReactTags__suggestions',
                                        activeSuggestion: 'ReactTags__activeSuggestionClass'
                                    }}
                                               inputFieldPosition="inline" tags={tags}
                                               handleDelete={this.handleDelete}
                                               handleAddition={this.handleAddition}
                                               handleDrag={this.handleDrag}/>
                                </div>
                            </Form.Group>

                        </Form.Group>

                        <Form.Group className="CreateJobFormDetailed">
                            <h2>Detailed description</h2>

                            <Form.Row className="CreateJobFormSeperator">
                                <Col>
                                    <Form.Label>Job start</Form.Label>
                                    <DatePicker todayButton="Today"
                                                placeholderText="Enter start date."
                                                showWeekNumbers
                                                selected={this.state.start}
                                                onChange={this.handleStartDateChange}/>
                                </Col>
                                <Col>
                                    <Form.Label>Job end</Form.Label>
                                    <DatePicker todayButton="Today"
                                                placeholderText="Enter end date."
                                                showWeekNumbers
                                                selected={this.state.end}
                                                onChange={this.handleEndDateChange}/>
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
                                <Form.Group as={Col} controlId="formGridState"
                                            onChange={this.handlePaymentChange}>
                                    <Form.Label>Payment method</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose monthly/hourly</option>
                                        <option value="paidMonthly">Monthly</option>
                                        <option value="paidHourly">Hourly</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                        </Form.Group>

                        <Button variant="primary"
                                size="lg"
                                block
                                onClick={this.createJob.bind(this)}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }

    createJob() {
        console.table(this.state.job);
        // http.Post("Jobs", {...this.state.job})
        //     .then((data) => {
        //         console.log(data);
        //     }).catch((data) => {
        //     console.log(data);
        // })
    }
}

function createTagsArray(tags) {
    let tagsArray = []

    tags.forEach(value => {
        tagsArray.push(value["text"]);
    });

    return tagsArray;
}

export default CreateJobPage;
