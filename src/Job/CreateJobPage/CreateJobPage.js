import React, {Component} from "react";
import './CreateJobPage.css';
import {Button, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import "react-datepicker/dist/react-datepicker.css";
import {WithContext as ReactTags} from 'react-tag-input';
import Job from '../Job'
import {AxiosAgent} from "../../Shared/Web/AxiosAgent";
import Input from "./Input";
import Select from "./Select";
import LocationModel from "../../Shared/LocationModel";

class CreateJobPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            job: Job,
            tags: [],
            location: LocationModel,
            jobStart: "",
            jobEnd: "",
            deadLine: "",
            createdOn: "",
            paymentOptions: ['Hourly', 'Monthly', 'Finish'],
            experienceOptions: ['Junior', 'Senior', 'Inexperienced']
    };

        this.handleJobStart = this.handleJobStart.bind(this);
        this.handleJobEnd = this.handleJobEnd.bind(this);
        this.handleDeadLine = this.handleDeadLine.bind(this);
        this.handleCreatedOn = this.handleCreatedOn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    handleJobStart = date => {
        let job = {...this.state.job}
        job.jobStart = date;
        this.setState({job: job});
    };

    handleJobEnd = date => {
        let job = {...this.state.job}
        job.jobEnd = date;
        this.setState({job: job});
    };

    handleDeadLine = date => {
        let job = {...this.state.job}
        job.deadLine = date;
        this.setState({job: job});
    };
    handleCreatedOn = date => {
        let job = {...this.state.job}
        job.createdOn = date;
        this.setState({job: job});
    };
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
        this.setState(state => ({tags: [...state.tags, tag]}));
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

    //
    // handleDateChange = date => {
    //     let job = {...this.state.job};
    //     job.deadLine = date;
    //     this.setState({
    //         job: job
    //     })
    // };

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
        return (
            <div>
                <Container className="CreateJobTitle">
                    <h1>Create job</h1>
                </Container>

                <Container className="CreateJobForm">
                    <Form>
                        <h2>Summary description</h2>
                        <Input type={'text'}
                               title={'title'}
                               name={'title'}
                               value={this.state.job.title}
                               placeholder={'Title'}
                               handleChange={this.handleInputChange}/>
                        <Input type={'text'}
                               title={'description'}
                               name={'description'}
                               value={this.state.job.description}
                               placeholder={'Description'}
                               handleChange={this.handleInputChange}/>
                        <Input type={'text'}
                               title={'companyName'}
                               name={'companyName'}
                               value={this.state.job.companyName}
                               placeholder={"Company name"}
                               handleChange={this.handleInputChange}/>
                        <Input type={'number'}
                               name={'salary'}
                               title={'salary'}
                               value={this.state.job.salary}
                               placeholder="Job salary per unit"
                               handleChange={this.handleInputChange}/>
                        <Select title={'Payment plan'}
                                name={'payment'}
                                options={this.state.paymentOptions}
                                value = {this.state.job.payment}
                                placeholder={'Select payment'}
                                handleChange = {this.handleInputChange}/>
                        {/*<DatePickerInput*/}
                        {/*    title={'Start date'}*/}
                        {/*    name={'startdate'}*/}
                        {/*    handleChange={this.handleJobStart}*/}
                        {/*    handleSelected={this.state.jobStart}*/}
                        {/*/>*/}
                        {/*<Input type={'text'}*/}
                        {/*       title={'street'}*/}
                        {/*       name={'street'}*/}
                        {/*       value={this.state.job.location.street}*/}
                        {/*       placeholder={'street'}*/}
                        {/*       handleChange={this.handleInputChange}/>*/}

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
                                       tags={this.state.tags}
                                       // inputFieldPosition="inline" tags={tags}
                                       handleDelete={this.handleDelete}
                                       handleAddition={this.handleAddition}/>
                        </div>


                        <h2>Detailed description</h2>

                        <Select title={'Experience'}
                                name={'experience'}
                                options={this.state.experienceOptions}
                                value = {this.state.job.experience}
                                placeholder={'Select experience'}
                                handleChange = {this.handleInputChange}/>
                        <Input type={'number'}
                               name={"freelancers"}
                               title={'Freelancers'}
                               placeholder="Amount of freelancers"
                               value={this.state.job.freelancers}
                               handleChange={this.handleInputChange}/>
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
        let job = {...this.state.job};
        job.tags = this.mapTags(this.state.tags);

        console.table(job);
        // http.Post("Jobs", {...this.state.job})
        //     .then((data) => {
        //         console.log(data);
        //     }).catch((data) => {
        //     console.log(data);
        // })
    }

    mapTags(tags) {
        const tagArr = tags.map(tag => tag.text);
        return tagArr;
    }
}
export default CreateJobPage;
