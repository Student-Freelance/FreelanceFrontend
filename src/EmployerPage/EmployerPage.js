import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import EmployerJobs from "./Views/EmployerJobs";
// eslint-disable-next-line no-unused-vars
import EmployerStore from "./Service/EmployerStore";
import {observer} from "mobx-react";

const employerStore = new EmployerStore();

class EmployerPage extends Component {
    constructor(props) {
        super(props);

        // //TODO: skal hentes fra backend (bortset fra editMode)
        this.state = {
            editMode: false,
        };

        console.table(this.firm);
    }

    //Changes state if user wants to edit
    toggleEdit = () => {
        this.setState(state => ({editMode: !state.editMode}))
    };

    render() {
        return (
            <div>
                <img src={employerStore.employer.logo || null} alt="logo" style={{height: "100px"}}/>
                <h1>{employerStore.employer.name}</h1>
                {this.state.editMode ?
                    <div>

                        <Button color="success"
                                onClick={() => this.toggleEdit()}>Save</Button>
                        <input type="text"
                               value={employerStore.employer.description}
                               onChange={e => employerStore.setDescription(e.target.value)}/>
                    </div>
                    :
                    <div>
                        <Button color="primary"
                                onClick={() => this.toggleEdit()}>Edit</Button>
                        <p>{employerStore.employer.description}</p>
                    </div>
                }
                    <EmployerJobs jobs={employerStore.employer.jobs}/>
            </div>
        );
    }
}

export default observer(EmployerPage);
