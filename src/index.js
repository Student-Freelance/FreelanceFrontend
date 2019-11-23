import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./Shared/Stores/UserStore";
import AuthStore from "./Shared/Stores/AuthStore";

let authStore = new AuthStore();
export const storesContext = React.createContext({
    userStore: new UserStore(authStore),
    authStore: authStore
});
export const useStores = () => React.useContext(storesContext);
//Handle DTU inside login, when getting callback from backend, find the token, extract it and set it to localstorage
const token = new URLSearchParams(window.location.search).get('token');
if (token != null && token.length > 0) {
    localStorage.setItem("Token", token);
    window.location.replace("/");
}

ReactDOM.render(
    <BrowserRouter><App/></BrowserRouter>,
    document.getElementById('root')
);


serviceWorker.unregister();
