import {action, decorate, observable} from 'mobx';
import ApiAgent from '../Web/ApiAgent';
import {companyObject, studentObject} from '../Models/userObjects'

class UserStore {
    companyUser = companyObject;
    studentUser = studentObject;
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
                    Object.assign(this.studentUser, body);
                } else if (body.hasOwnProperty('companyName')) {
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
        if (newUser.hasOwnProperty('companyName')) {
            endpoint = 'Companies'
        }
        return ApiAgent.UserActions.save(newUser, endpoint)
            .then(action((body) => {
                if (body.hasOwnProperty('firstname')) {
                    Object.assign(this.studentUser, body);
                } else if (body.hasOwnProperty('companyName')) {
                    Object.assign(this.companyUser, body);
                }
            }))
            .finally(action(() => {
                this.updatingUser = false;
            }))
    }

    logout() {
        this.authStore.logout(true);
        this.authStore.setAuthenticated(false);
        this.companyUser = undefined;
        this.studentUser = undefined;
        window.location.replace("/");
    }

    login(username, password) {
        return ApiAgent.UserActions.login(username, password).then(result => {
            if (!result === undefined) {
                this.authStore.setToken(result.token);
                this.pullUser();
                this.authStore.setAuthenticated(true);
                window.location.replace("/")
            }
        })

    }

    googlelogin(token) {
        return ApiAgent.UserActions.googlelogin(token)
    }

    registerStudent(body) {
        return ApiAgent.UserActions.registerStudent(body).then(result => {
            if (!result.isEmpty) {
                this.authStore.setToken(result.token);
                this.pullUser();
            }
        });

    }

    registerCompany(body) {
        return ApiAgent.UserActions.registerCompany(body).then(result => {
            if (!result.isEmpty) {
                this.authStore.setToken(result.token);
                this.pullUser();
            }
        });

    }

}

decorate(UserStore, {
    studentUser: observable,
    companyUser: observable,
    loadingUser: observable,
    updatingUser: observable,
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