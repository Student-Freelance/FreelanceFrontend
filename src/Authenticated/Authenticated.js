import MarketPage from "../MarketPage/MarketPage";
import CreateJobPage from "../Job/CreateJobPage/CreateJobPage";
import DetailedJobPage from "../Job/DetailedJobPage/DetailedJobPage";
import LandingPage from "../LandingPage/LandingPage";
import EmployerPage from "../Employer/EmployerPage/EmployerPage";
import ProfilePage from "../Profile/ProfilePage";
import PageNotFound from "../InvalidPage/PageNotFound";
import React from "react";
import NavBar from "../Shared/Views/NavBar";
import {withAuth} from "react-auth-guard";
import {Route, Switch} from "react-router-dom";

const Authenticated = () => (
    <div>
        <React.Fragment>
            <NavBar/>
        </React.Fragment>
        <div>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/market" component={MarketPage}/>
                <Route path="/createJob" component={CreateJobPage}/>
                <Route path="/detailedjob/:handle" component={DetailedJobPage}/>
                <Route path="/employer/:handle" component={EmployerPage}/>
                <Route path="/profilepage" component={ProfilePage}/>
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    </div>
);

export default withAuth(Authenticated)