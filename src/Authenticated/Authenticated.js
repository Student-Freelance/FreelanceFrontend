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
import LoginPage from "../NotAuthenticated/LoginPage";

const Authenticated = () => (
    <div>
        <React.Fragment>
            <NavBar/>
        </React.Fragment>
        <div>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/market" component={MarketPage}/>
                <Route path="/create" component={CreateJobPage}/>
                <Route path="/job/:handle" component={DetailedJobPage}/>
                <Route path="/employer/:handle" component={EmployerPage}/>
                <Route path="/profilepage" component={ProfilePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    </div>
);

export default withAuth(Authenticated)
