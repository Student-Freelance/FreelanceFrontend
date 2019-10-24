import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import EmployerJobs from "./EmployerJobs";

class EmployerPage extends Component {
    constructor(props) {
        super(props);

        //TODO: skal hentes fra backend (bortset fra editMode)
        this.state = {
            editMode: false,
            firm: {
                name: "placeholder name",
                description: "placeholder desc",
                logo: "https://onlinesolutiongroup.dk/wp-content/uploads/2016/07/IBM-logo.png",
                jobs: [{
                    id: "alsdjkas",
                    name: "Full-stack i Lyngby"
                }]
            }
        };

        console.table(this.state);
    }

    //Changes state if user wants to edit
    toggleEdit = () => {
        this.setState(state => ({editMode: !state.editMode}))
    };

    handleInputChange(e) {
       const firmChange = {
           ...this.state.firm
       };

       firmChange.description = e.target.value;

       this.setState({firm: firmChange});
    }

    render() {
        return (
            <div>
                <img src={this.state.firm.logo || null} alt="logo" style={{height: "100px"}}/>
                <h1>{this.state.firm.name}</h1>
                {this.state.editMode ?
                    <div>

                        <Button color="success"
                                onClick={() => this.toggleEdit()}>Save</Button>
                        <input type="text"
                               value={this.state.firm.description}
                               onChange={e => this.handleInputChange(e)}/>
                    </div>
                    :
                    <div>
                        <Button color="primary"
                                onClick={() => this.toggleEdit()}>Edit</Button>
                        <p>{this.state.firm.description}</p>
                    </div>
                }
                    <EmployerJobs jobs={this.state.firm.jobs}/>
            </div>
        );
    }
}

export default EmployerPage;
