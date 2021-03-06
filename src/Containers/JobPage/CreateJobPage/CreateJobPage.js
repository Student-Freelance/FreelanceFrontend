import React, {Component} from "react";
import './CreateJobPage.css';
import {Button, Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import "react-datepicker/dist/react-datepicker.css";
import {WithContext as ReactTags} from 'react-tag-input';
import Input from "./Input";
import Select from "./Select";
import DateInput from "./DateInput";
import {AxiosAgent} from "../../../Web/AxiosAgent";
import {toast} from "react-toastify";


const initialState= {
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
        const {handle} = this.props.match.params;
        this.name= handle;
        this.state = initialState;



        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
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
            this.setState({tags: [...this.state.tags, tag]});
    }

    handleInputChange = (fieldName, fieldValue, fieldType) => {
        const field = {...this.state[fieldType]};
        // Events from Input.js (normal inputelements) parses SyntheticEvent instead of Event
        (fieldValue.nativeEvent instanceof Event) ?
            field[fieldName] = fieldValue.target.value
            : field[fieldName]= fieldValue;

        this.setState({
            [fieldType]: field
        });
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
                               title={'Title'}
                               name={'title'}
                               value={this.state.job.title}
                               placeholder={'Title'}
                               handleChange={(value) => this.handleInputChange('title', value, 'job')}/>
                        <Input type={'text'}
                               title={'Description'}
                               name={'description'}
                               value={this.state.job.description}
                               placeholder={'Description'}
                               handleChange={(value) => this.handleInputChange('description', value, 'job')}/>
                        <FormGroup>
                            <FormLabel htmlFor={'companyName'}>
                                Companyname
                            </FormLabel>
                            <FormControl
                                type={'text'}
                                className="form-input"
                                value={this.name}
                                readOnly
                            />
                        </FormGroup>
                        <Input type={'number'}
                               name={'salary'}
                               title={'Salary'}
                               value={this.state.job.salary}
                               placeholder="Job salary per unit"
                               handleChange={(value) => this.handleInputChange('salary', value, 'job')}/>
                        <Select title={'Payment plan'}
                                name={'Payment'}
                                options={this.state.paymentOptions}
                                value={this.state.job.payment}
                                placeholder={'Select payment'}
                                handleChange={(value) => this.handleInputChange('payment', value, 'job')}/>
                        <h2>Time and dates</h2>
                        <DateInput
                            name={'jobStart'}
                            title={'Job start'}
                            value={this.state.dateFields['jobStart']}
                            handleChange={(value) => this.handleInputChange("jobStart", value, 'dateFields')}/>
                        <DateInput
                            name={'jobEnd'}
                            title={'Job end'}
                            value={this.state.dateFields['jobEnd']}
                            handleChange={(value) => this.handleInputChange("jobEnd", value, 'dateFields')}/>
                        <DateInput
                            name={'deadLine'}
                            title={'Deadline'}
                            value={this.state.dateFields['deadLine']}
                            handleChange={(value) => this.handleInputChange("deadLine", value, 'dateFields')}/>

                        <h2>Location</h2>
                        <Input title={"Street"}
                               name={"street"}
                               value={this.state.location.street}
                               placeholder="Street name"
                               handleChange={(value) => this.handleInputChange('street', value, 'location')}/>
                        <Input title={"Number"}
                               name={"number"}
                               value={this.state.location.number}
                               placeholder="Number"
                               handleChange={(value) => this.handleInputChange('number', value, 'location')}/>
                        <Input title={"Zip"}
                               name={"zip"}
                               value={this.state.location.zip}
                               placeholder="Zip"
                               handleChange={(value) => this.handleInputChange('zip', value, 'location')}/>
                        <Input title={"City"}
                               name={"city"}
                               value={this.state.location.city}
                               placeholder="City"
                               handleChange={(value) => this.handleInputChange('city', value, 'location')}/>


                        <h2>Detailed description</h2>

                        <Select title={'Experience'}
                                name={'experience'}
                                options={this.state.experienceOptions}
                                value={this.state.job.experience}
                                placeholder={'Select experience'}
                                handleChange={(value) => this.handleInputChange('experience', value, 'job')}/>
                        <Input type={'number'}
                               name={"freelancers"}
                               title={'Freelancers'}
                               placeholder="Amount of freelancers"
                               value={this.state.job.freelancers}
                               handleChange={(value) => this.handleInputChange('freelancers', value, 'job')}/>
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
                        <hr></hr>
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
                tags: tags,
                companyName:this.name
            }
        }), () => this.postJob());
    }

    async postJob() {
            AxiosAgent.Post("Jobs", {...this.state.job})
                .then(() => {
                    this.setState(initialState);
                    window.alert('JobPage was succesfully created')
                })
                .catch((e) =>{
                    if(e.statusCode===500){
                        toast.error("Something went wrong on the server")
                    }
                    console.log(e)
                } )
    }
}

export default CreateJobPage;
