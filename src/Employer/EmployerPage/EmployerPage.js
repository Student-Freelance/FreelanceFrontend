import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import EmployerJobs from "./Views/EmployerJobs";
import {Card, Container} from "react-bootstrap";
import EmployerToChange from "./Views/EmployerToChange";
import EmployerToView from "./Views/EmployerToView";

class EmployerPage extends Component {
    constructor(props) {
        super(props);

        this.employer = props.employer;

        // //TODO: skal hentes fra backend (bortset fra editMode)
        this.state = {
            editMode: false,
            btnText: "edit",
        };
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
                <Card className="col-sm-11 col-xl-6">
                    <Card.Img src={this.employer.logo} alt="logo"/>
                    <Card.Body>
                        {this.state.editMode ?
                            <EmployerToChange employer={this.employer}/> :
                            <EmployerToView employer={this.employer}/>}
                        <EmployerJobs jobs={this.employer.jobs}/>
                        <Button color="primary"
                                onClick={() => this.toggleEdit()}>
                            {this.state.btnText}
                        </Button>
                    </Card.Body>
                </Card>
            </Container>

        );
    }
}

export default EmployerPage;
