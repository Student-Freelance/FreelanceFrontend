import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'https://localhost:5001/api/';

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {

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
            .end(handleErrors)
            .then(responseBody),
    get: (url) =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
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