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

        console.table(this.firm);
    }

    //Changes state if user wants to edit
    toggleEdit = () => {
        this.setState(state => ({editMode: !state.editMode}));
        this.state.editMode ? this.setState({btnText: "save"}) : this.setState({btnText: "edit"});
    };

    render() {
        return (
            <Container fluid>
                <Card style={{width: "90%"}}>
                    <Card.Img src={employerStore.employer.logo} alt="logo"/>
                        {this.state.editMode ?
                        <EmployerToChange employer={employerStore.employer}/> :
                        <EmployerToView employer={employerStore.employer}/>}
                    {/*{this.state.editMode ?*/}
                    {/*    <div>*/}

                    {/*        <Button color="success"*/}
                    {/*                onClick={() => this.toggleEdit()}>Save</Button>*/}
                    {/*        <input type="text"*/}
                    {/*               value={employerStore.employer.description}*/}
                    {/*               onChange={e => employerStore.setDescription(e.target.value)}/>*/}
                    {/*    </div>*/}
                    {/*    :*/}
                    {/*    <div>*/}
                    {/*        <Button color="primary"*/}
                    {/*                onClick={() => this.toggleEdit()}>Edit</Button>*/}
                    {/*        <p>{employerStore.employer.description}</p>*/}
                    {/*    </div>*/}
                    {/*}*/}
                    <EmployerJobs jobs={employerStore.employer.jobs}/>
                    <Button color="primary"
                            onClick={() => this.toggleEdit()}>
                        {this.state.btnText}
                    </Button>
                </Card>
            </Container>

        );
    }
}

export default observer(EmployerPage);
