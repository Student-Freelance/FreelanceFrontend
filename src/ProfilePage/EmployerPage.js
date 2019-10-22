import React, {Component} from "react";
import Button from "react-bootstrap/Button";

class EmployerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
        }
    }

    //Changes state if user wants to edit
    toggleEdit = () => {
        this.setState(state => ({editMode: !state.editMode}))
    };

    render() {
        return(
            <div>
                <p>{this.props.firmName}</p>
                {/*<img src={this.props.logo ||null} alt="logo"/>*/}
                <p>{this.props.description}</p>
                {this.state.editMode ?
                    <Button color="success">Save</Button> :
                    <Button color="primary" onClick={this.toggleEdit()}>Edit</Button>}
            </div>
        );
    }
}

export default EmployerPage;
