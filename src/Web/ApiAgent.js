import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'https://localhost:5001/api/';

const handleErrors = (err) => {
    console.log(err);
    let string= err + '';
    if(string.includes('Request has been terminated')){
        toast.error("Der er problemer med at forbinde til serveren" )
    }
    if (err && err.response && err.response.status === 401) {
        console.log(err.response.text)
        toast.error("Brugernavn eller kodeord er forkert!"  )
        return err.response.text;
    }
   return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    let token = localStorage.getItem("Token");
    if (token) {
        req.set('Authorization', `Bearer ${token}`);
    }
};

const requests = {
    del: (url) =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .catch(handleErrors)
            .then(responseBody),
    get: (url) =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .catch(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .catch(handleErrors)
            .then(responseBody),
    post: (url, body,) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .catch(handleErrors)
            .then(responseBody),
};

const UserActions = {
    current: () =>
        requests.get('Account'),
    login: (username, password) =>
        requests.post('Account/Login', {username: username, password: password}),
    googlelogin: (token) =>
        requests.post('Account/GoogleAuth', token),
    registerStudent: (body) =>
        requests.post('Students', body),
    registerCompany: (body) =>
        requests.post('Companies', body),
    save: (user, endpoint) =>
        requests.put(endpoint, user)
};


export default {
    UserActions
};