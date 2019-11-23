import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = (props) => {
    if (props.authenticated) return <Route {...props}/>;
    return <Redirect to="/login"/>;
};
export default PrivateRoute;