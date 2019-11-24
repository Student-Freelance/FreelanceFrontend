import React from "react";
import NavBar from "../../Components/NavBar";
import {withAuth} from "react-auth-guard";
import {Route, Switch} from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "./LoginPage";
import PageNotFound from "../InvalidPage/PageNotFound";

const NotAuthenticated = () => (
    <div>
        <React.Fragment>
            <NavBar/>
        </React.Fragment>
        <div>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    </div>
);

export default withAuth(NotAuthenticated)