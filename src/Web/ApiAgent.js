import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'https://devops01.eitlab.diplom.dtu.dk/api/'; //'https://localhost:5001/api/';

const handleErrors = (err) => {
    let string= err + '';
    if(string.includes('Request has been terminated')){
        toast.error("Der er problemer med at forbinde til serveren");
        return;
    }
    if (err.response.status === 400) {
        console.log(err);
        toast.error("Formen er ikke korrekt udfyldt");
        return;
    }
    if (err.response.status === 401) {
        console.log(err);
        toast.error("Brugernavn eller kodeord er forkert!");
        return;
    }
    if (err.response.status === 500) {
        console.log(err);
        toast.error("Der skete en serverfejl, vi arbejder på sagen.");
        return;
    }
    if (err.response.status === 404) {
        console.log(err);
        toast.error("Brugeren blev ikke fundet");
    }
};

const responseBody = res => {
    if (!(res === undefined)) return res.body;
};

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

const JobActions = {
    fetchAll: () =>
        requests.get('Jobs'),
    fetchOne: async (id) =>
        requests.get(`Jobs/${id}`)
};


export default {
    UserActions,
    JobActions
};
