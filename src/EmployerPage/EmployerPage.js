import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import EmployerJobs from "./Views/EmployerJobs";
// eslint-disable-next-line no-unused-vars
import EmployerStore from "./Service/EmployerStore";
import {observer} from "mobx-react";
import {Card, Container} from "react-bootstrap";
import EmployerToChange from "./Views/EmployerToChange";
import EmployerToView from "./Views/EmployerToView";

const employerStore = new EmployerStore();

class EmployerPage extends Component {
    constructor(props) {
        super(props);

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
                    <Card.Img src={employerStore.employer.logo} alt="logo"/>
                    <Card.Body>
                        {this.state.editMode ?
                            <EmployerToChange employerStore={employerStore}/> :
                            <EmployerToView employer={employerStore.employer}/>}
                        <EmployerJobs jobs={employerStore.employer.jobs}/>
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

export default observer(EmployerPage);
