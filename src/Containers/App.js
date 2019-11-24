import React from "react";
import {observer} from "mobx-react";
import NavBar from "../Components/NavBar";
import LandingPage from "./LandingPage/LandingPage";
import MarketPage from "./MarketPage/MarketPage";
import CreateJobPage from "./JobPage/CreateJobPage/CreateJobPage";
import DetailedJobPage from "./JobPage/DetailedJobPage/DetailedJobPage";
import EmployerPage from "./Employer/EmployerPage/EmployerPage";
import ProfilePage from "../Profile/ProfilePage";
import LoginPage from "./Authentication/LoginPage";
import PageNotFound from "./InvalidPage/PageNotFound";
import {Route, Switch, withRouter} from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import {useStores} from "../index";
import {ToastContainer} from "react-toastify";


const App = () => {
    const {userStore, authStore} = useStores();
    if (localStorage.getItem("Token")) {
        userStore.pullUser();
        authStore.setAuthenticated(true);
    }



    return (
        <div>
            <div>
                <React.Fragment>
                    <NavBar/>
                </React.Fragment>
                <ToastContainer position="bottom-right" autoClose={2000}/>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <PrivateRoute authenticated={authStore.authenticated} path="/market"
                                  component={MarketPage}/>
                    <PrivateRoute authenticated={authStore.authenticated} path="/createJob"
                                  component={CreateJobPage}/>
                    <PrivateRoute authenticated={authStore.authenticated} path="/detailedjob/:handle"
                                  component={DetailedJobPage}/>
                    <PrivateRoute authenticated={authStore.authenticated} path="/employer/:handle"
                                  component={EmployerPage}/>
                    <PrivateRoute authenticated={authStore.authenticated} path="/profilepage"
                                  component={ProfilePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
            <ToastContainer position="bottom-right" autoClose={2000}/>
        </div>
    );

};

export default withRouter(observer(App))