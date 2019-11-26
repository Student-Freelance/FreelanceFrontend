import {action, decorate, observable} from 'mobx';
import ApiAgent from '../Web/ApiAgent';
import {companyObject, studentObject} from '../Models/userObjects'

class UserStore {
    companyUser = companyObject;
    studentUser = studentObject;
    isStudent = false;
    authStore;
    loadingUser;
    updatingUser;

    constructor(authStore) {
        this.authStore = authStore;
    }

    pullUser() {
        this.loadingUser = true;
        return ApiAgent.UserActions.current()
            .then(action((body) => {
                if (body.hasOwnProperty('firstname')) {
                    this.isStudent = true;
                    Object.assign(this.studentUser, body);
                } else if (body.hasOwnProperty('companyName')) {
                    this.isStudent = false;
                    Object.assign(this.companyUser, body);
                }
            }))
            .finally(action(() => {
                this.loadingUser = false;
            }))
    }

    updateUser(newUser) {
        this.updatingUser = true;
        let endpoint = 'Students';
        if (!this.isStudent) {
            endpoint = 'Companies'
        }
        return ApiAgent.UserActions.save(newUser, endpoint)
            .then(action((response) => {
                if (response.status === 200) {
                    this.pullUser();
                }
            }))
            .finally(action(() => {
                this.updatingUser = false;
            }))
    }

    logout() {
        this.authStore.logout(true);
        this.authStore.setAuthenticated(false);
        this.isStudent = false;
        this.companyUser = undefined;
        this.studentUser = undefined;
        window.location.replace("/login");
    }

    login(username, password) {
        this.loadingUser = true;
        return ApiAgent.UserActions.login(username, password).then(result => {
            if (result) {
                this.authStore.setToken(result.token);
                this.pullUser().then(() => {
                        this.authStore.setAuthenticated(true);
                    }
                );
            }
        })
    }

    googlelogin(token) {
        return ApiAgent.UserActions.googlelogin(token)
    }

    registerStudent(body) {
        this.loadingUser = true;
        let username = body.userName;
        let password = body.password;
        return ApiAgent.UserActions.registerStudent(body).then(result => {
            if (!(result === undefined)) {
                if (result.statusCode === 201) {
                    this.login(username, password)
                }
            }
        });
    }

    registerCompany(body) {
        this.loadingUser = true;
        let username = body.userName;
        let password = body.password;
        return ApiAgent.UserActions.registerCompany(body).then(response => {
            if (response.result === "User created") {
                this.login(username, password)
            }
        });
    }
}

decorate(UserStore, {
    studentUser: observable,
    companyUser: observable,
    loadingUser: observable,
    updatingUser: observable,
    isStudent: observable,
    authStore: observable,
    logout: action,
    forgetUser: action,
    updateUser: action,
    pullUser: action,
    registerCompany: action,
    registerStudent: action,
    login: action,
    googlelogin: action
});

export default UserStore;