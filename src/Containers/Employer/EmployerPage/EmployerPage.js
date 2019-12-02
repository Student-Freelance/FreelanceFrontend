import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import EmployerJobs from "./Views/EmployerJobs";
import Employer from "../Employer";
import {Card, Container} from "react-bootstrap";
import EmployerToChange from "./Views/EmployerToChange";
import EmployerToView from "./Views/EmployerToView";
import EmployerError from "./Views/EmployerError";
import {AxiosAgent} from "../../../Web/AxiosAgent";

class EmployerPage extends Component {

constructor(props) {

    super(props);
        // //TODO: skal hentes fra backend (bortset fra editMode)
        this.state = {
            employer: Employer,
            isLoaded: false,
        };
    }

    //after all of the elements of the page is render corretly this methods is called
    componentDidMount(){
        const {handle} = this.props.match.params;
        try {
            AxiosAgent.GetOne("Companies", handle)
                .then((company) => {
                    console.table(company.data);
                    this.setState({employer: company.data});
                    this.setState({isLoaded: true});
                })
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <Container fluid>
                {this.state.isLoaded ?
                <Card className="col-sm-11 col-xl-6">
                    <Card.Img src={this.state.employer.logo || 'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg'} alt="logo"/>
                    <Card.Body>
                        {this.state.editMode ?
                            <EmployerToChange employer={this.state.employer}/> :
                            <EmployerToView employer={this.state.employer}/>}
                        <EmployerJobs jobs={this.state.employer.jobs}/>
                    </Card.Body>
                </Card>
            : <EmployerError companyName={this.props.match.params.handle}/> }
            </Container>
        );
    }
}

export default EmployerPage;
