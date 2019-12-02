import React, {Component} from "react";
import './CreateJobPage.css';
import {Button, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import "react-datepicker/dist/react-datepicker.css";
import {WithContext as ReactTags} from 'react-tag-input';
import Input from "./Input";
import Select from "./Select";
import DateInput from "./DateInput";
import {AxiosAgent} from "../../../Web/AxiosAgent";
import * as Yup from 'yup';
import {Formik} from "formik";


const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(1, "Must have a character")
        .max(50, "Must be shorter than 50")
        .required("Must enter a title"),
    salary: Yup.number()
        .min(1, "Must be paid")
        .max(2147483646, "This is ridiculous")
        .required("Must be paid"),
    freelancers: Yup.number()
        .min(1, "Atleast one freelancer required")
        .max(2147483646, "This is ridiculous")
        .required("You aren't searching for any freelancers"),

});

const initialState = {
    job: {},
    tags: [],
    location: {},
    dateFields: {},
    paymentOptions: ['Hourly', 'Monthly', 'Finish'],
    experienceOptions: ['Junior', 'Senior', 'Inexperienced']
};

class CreateJobPage extends Component {

    constructor(props) {
        super(props);

        this.state = initialState;

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    /* React-tags onChange handlers
    https://www.npmjs.com/package/react-tag-inpuat#usage
    */
    handleDelete(i) {
        const {tags} = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState({tags: [...this.state.tags, tag]});
    }

    // handleInputChange = (fieldName, fieldValue, fieldType) => {
    //     const field = {...this.state[fieldType]};
    //     // Events from Input.js (normal inputelements) parses SyntheticEvent instead of Event
    //     (fieldValue.nativeEvent instanceof Event) ?
    //         field[fieldName] = fieldValue.target.value
    //         : field[fieldName]= fieldValue;
    //
    //     this.setState({
    //         [fieldType]: field
    //     });
    // };

    render() {
        return (

            <Formik
                initialValues={{
                    companyName: "",
                    title: "",
                    salary: 0,
                    location: {street: "", number: "", city: "", zip: ""},
                    description: "",
                    experience: "",
                    freelancers: 0,
                    deadLine: Date,
                    createdOn: Date,
                    jobStart: Date,
                    jobEnd: Date
                }}
                validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur}) => (
                    <form>
                        <div className="input-row">
                            <label htmlFor="title">Title</label>
                            <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            className={touched.title && errors.name ? "has-error": null}
                            />
                        </div>

                    </form>)
                }
            </Formik>
            // {/*<div>*/}
            // {/*    <Container className="CreateJobTitle">*/}
            // {/*        <h1>Create job</h1>*/}
            // {/*    </Container>*/}
            //
            // {/*    <Container className="CreateJobForm">*/}
            //
            //
            // {/*        <Form>*/}
            // {/*            <h2>Summary description</h2>*/}
            // {/*            <Input type={'text'}*/}
            // {/*                   title={'title'}*/}
            // {/*                   name={'title'}*/}
            // {/*                   value={this.state.job.title}*/}
            // {/*                   placeholder={'Title'}*/}
            // {/*                   handleChange={(value) => this.handleInputChange('title', value, 'job')}/>*/}
            // {/*            <Input type={'text'}*/}
            // {/*                   title={'description'}*/}
            // {/*                   name={'description'}*/}
            // {/*                   value={this.state.job.description}*/}
            // {/*                   placeholder={'Description'}*/}
            // {/*                   handleChange={(value) => this.handleInputChange('description', value, 'job')}/>*/}
            // {/*            <Input type={'text'}*/}
            // {/*                   title={'companyName'}*/}
            // {/*                   name={'companyName'}*/}
            // {/*                   value={this.state.job.companyName}*/}
            // {/*                   placeholder={"Company name"}*/}
            // {/*                   handleChange={(value) => this.handleInputChange('companyName', value, 'job')}/>*/}
            // {/*            <Input type={'number'}*/}
            // {/*                   name={'salary'}*/}
            // {/*                   title={'salary'}*/}
            // {/*                   value={this.state.job.salary}*/}
            // {/*                   placeholder="Job salary per unit"*/}
            // {/*                   handleChange={(value) => this.handleInputChange('salary', value, 'job')}/>*/}
            // {/*            <Select title={'Payment plan'}*/}
            // {/*                    name={'payment'}*/}
            // {/*                    options={this.state.paymentOptions}*/}
            // {/*                    value={this.state.job.payment}*/}
            // {/*                    placeholder={'Select payment'}*/}
            // {/*                    handleChange={(value) => this.handleInputChange('payment', value, 'job')}/>*/}
            // {/*            <h2>Time and dates</h2>*/}
            // {/*            <DateInput*/}
            // {/*                name={'jobStart'}*/}
            // {/*                title={'JobPage start'}*/}
            // {/*                value={this.state.dateFields['jobStart']}*/}
            // {/*                handleChange={(value) => this.handleInputChange("jobStart", value, 'dateFields')}/>*/}
            // {/*            <DateInput*/}
            // {/*                name={'jobEnd'}*/}
            // {/*                title={'JobPage end'}*/}
            // {/*                value={this.state.dateFields['jobEnd']}*/}
            // {/*                handleChange={(value) => this.handleInputChange("jobEnd", value, 'dateFields')}/>*/}
            // {/*            <DateInput*/}
            // {/*                name={'deadLine'}*/}
            // {/*                title={'Deadline'}*/}
            // {/*                value={this.state.dateFields['deadLine']}*/}
            // {/*                handleChange={(value) => this.handleInputChange("deadLine", value, 'dateFields')}/>*/}
            //
            // {/*            <h2>Location</h2>*/}
            // {/*            <Input title={"Street"}*/}
            // {/*                   name={"street"}*/}
            // {/*                   value={this.state.location.street}*/}
            // {/*                   placeholder="Street name"*/}
            // {/*                   handleChange={(value) => this.handleInputChange('street', value, 'location')}/>*/}
            // {/*            <Input title={"Number"}*/}
            // {/*                   name={"number"}*/}
            // {/*                   value={this.state.location.number}*/}
            // {/*                   placeholder="Number"*/}
            // {/*                   handleChange={(value) => this.handleInputChange('number', value, 'location')}/>*/}
            // {/*            <Input title={"Zip"}*/}
            // {/*                   name={"zip"}*/}
            // {/*                   value={this.state.location.zip}*/}
            // {/*                   placeholder="Zip"*/}
            // {/*                   handleChange={(value) => this.handleInputChange('zip', value, 'location')}/>*/}
            // {/*            <Input title={"City"}*/}
            // {/*                   name={"city"}*/}
            // {/*                   value={this.state.location.city}*/}
            // {/*                   placeholder="City"*/}
            // {/*                   handleChange={(value) => this.handleInputChange('city', value, 'location')}/>*/}
            //
            //
            // {/*            <h2>Detailed description</h2>*/}
            //
            // {/*            <Select title={'Experience'}*/}
            // {/*                    name={'experience'}*/}
            // {/*                    options={this.state.experienceOptions}*/}
            // {/*                    value={this.state.job.experience}*/}
            // {/*                    placeholder={'Select experience'}*/}
            // {/*                    handleChange={(value) => this.handleInputChange('experience', value, 'job')}/>*/}
            // {/*            <Input type={'number'}*/}
            // {/*                   name={"freelancers"}*/}
            // {/*                   title={'Freelancers'}*/}
            // {/*                   placeholder="Amount of freelancers"*/}
            // {/*                   value={this.state.job.freelancers}*/}
            // {/*                   handleChange={(value) => this.handleInputChange('freelancers', value, 'job')}/>*/}
            // {/*            <Form.Label>Job tags</Form.Label>*/}
            // {/*            <div id="app">*/}
            // {/*                <ReactTags classNames={{*/}
            // {/*                    tags: 'ReactTags__tags',*/}
            // {/*                    tagInput: 'ReactTags__tagInput',*/}
            // {/*                    tagInputField: 'ReactTags__tagInputField',*/}
            // {/*                    selected: 'ReactTags__selected',*/}
            // {/*                    tag: 'ReactTags__tag',*/}
            // {/*                    remove: 'ReactTags__remove',*/}
            // {/*                    suggestions: 'ReactTags__suggestions',*/}
            // {/*                    activeSuggestion: 'ReactTags__activeSuggestionClass'*/}
            // {/*                }}*/}
            // {/*                           tags={this.state.tags}*/}
            // {/*                    // inputFieldPosition="inline" tags={tags}*/}
            // {/*                           handleDelete={this.handleDelete}*/}
            // {/*                           handleAddition={this.handleAddition}/>*/}
            // {/*            </div>*/}
            // {/*            <hr></hr>*/}
            // {/*            <Button variant="primary"*/}
            // {/*                    size="lg"*/}
            // {/*                    block*/}
            // {/*                    onClick={this.createJob.bind(this)}>*/}
            // {/*                Submit*/}
            // {/*            </Button>*/}
            // {/*        </Form>*/}
            // {/*    </Container>*/}
            // {/*</div>*/}
        );
    }

    async createJob() {
        const tags = this.state.tags.map(tag => tag.text);
        const location = {...this.state.location};
        const {jobStart, jobEnd, deadLine} = {...this.state.dateFields};
        const createdOn = new Date();
        this.setState(prevState => ({
            job: {
                ...prevState.job,
                location: location,
                createdOn: createdOn,
                jobStart: jobStart,
                jobEnd: jobEnd,
                deadLine: deadLine,
                tags: tags
            }
        }), () => this.postJob());
    }

    async postJob() {
        AxiosAgent.Post("Jobs", {...this.state.job})
            .then(() => {
                this.setState(initialState);
                window.alert('JobPage was succesfully created')
            })
            .catch((e) => console.log(e))
    }
}

export default CreateJobPage;
