import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import EmployerJobs from "./Views/EmployerJobs";
import Employer from "../Employer";
import {Card, Container} from "react-bootstrap";
import EmployerToChange from "./Views/EmployerToChange";
import EmployerToView from "./Views/EmployerToView";
import {AxiosAgent} from "../../Shared/Web/AxiosAgent";
import EmployerError from "./Views/EmployerError";

class EmployerPage extends Component {

constructor(props) {
    super(props);

        this.componentDidMount();
        // //TODO: skal hentes fra backend (bortset fra editMode)
        this.state = {
            employer: Employer,
            editMode: false,
            isLoaded: false,
            btnText: "edit",
        };
    }

    componentDidMount(){
        const {handle} = this.props.match.params;
        try {
            new AxiosAgent().GetOne("Companies", handle)
                .then((company) => company.log(company))
        } catch (e) {
            console.log(e);
        }

    }

    //Changes state if user wants to edit
    toggleEdit = () => {
        this.setState(state => (
            {editMode: !state.editMode}));
        this.state.editMode ? this.setState({btnText: "edit"}) : this.setState({btnText: "save"});
    };

    render() {
        return (
            <Container fluid>
                {this.state.isLoaded ?
                <Card className="col-sm-11 col-xl-6">
                    <Card.Img src={this.state.employer.logo} alt="logo"/>
                    <Card.Body>
                        {this.state.editMode ?
                            <EmployerToChange employer={this.state.employer}/> :
                            <EmployerToView employer={this.state.employer}/>}
                        <EmployerJobs jobs={this.state.employer.jobs}/>
                        <Button color="primary"
                                onClick={() => this.toggleEdit()}>
                            {this.state.btnText}
                        </Button>
                    </Card.Body>
                </Card>
            : <EmployerError companyName={this.props.match.params.handle}/> }
            </Container>
        );
    }
}

export default EmployerPage;
