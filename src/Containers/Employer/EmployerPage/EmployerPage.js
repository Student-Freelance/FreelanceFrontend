import React, {Component} from "react";
import EmployerJobs from "./Views/EmployerJobs";
import Employer from "../Employer";
import {Card, Container} from "react-bootstrap";
import EmployerToView from "./Views/EmployerToView";
import EmployerError from "./Views/EmployerError";
import {AxiosAgent} from "../../../Web/AxiosAgent";
import ClipLoader from "react-spinners/ClipLoader";

class EmployerPage extends Component {

    constructor(props) {

        super(props);
        // //TODO: skal hentes fra backend (bortset fra editMode)
        this.state = {
            employer: Employer,
            isLoaded: false,
            spinner: true
        };
    }

    //after all of the elements of the page is render corretly this methods is called
    componentDidMount() {
        const {handle} = this.props.match.params;
        try {
            AxiosAgent.GetOne("Companies", handle)
                .then((company) => {
                    this.setState({employer: company.data});
                    this.setState({isLoaded: true});
                    this.setState({spinner: false})
                })
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            this.state.spinner ? <div className='sweet-loading, LoaderMargins'
                >
                    <ClipLoader
                        size={150} // or 150px
                        color={'#123abc'}
                    />
                </div> :
                <Container fluid className="d-flex justify-content-center">
                    {this.state.isLoaded ?
                        <Card className="col-sm-11 col-xl-6">
                            <Card.Img
                                src={this.state.employer.logo || 'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg'}
                                alt="logo"/>
                            <Card.Body>
                                <EmployerToView employer={this.state.employer}/>
                                <EmployerJobs jobs={this.state.employer.jobs}/>
                                <hr/>
                                <Card.Subtitle>Contact: <a
                                    href={`mailto:${this.state.employer.email}`}>Email</a></Card.Subtitle>
                            </Card.Body>
                        </Card>
                        : <EmployerError companyName={this.props.match.params.handle}/>}
                </Container>
        );
    }
}

export default EmployerPage;
