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
        this.authStore = authStore
    }

    pullUser() {
        this.loadingUser = true;
        return ApiAgent.UserActions.current()
            .then(action((body) => {
                if (body.hasOwnProperty('firstname')) {
                    Object.assign(this.studentUser, body);
                    this.companyUser = companyObject;

                } else if (body.hasOwnProperty('companyName')) {
                    Object.assign(this.companyUser, body);
                    this.studentUser = studentObject;
                }
            }))
            .finally(action(() => {
                this.loadingUser = false;
                console.log(this.companyUser);
                console.log(this.studentUser);
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
        this.authStore.logout();
        this.companyUser = companyObject;
        this.studentUser = studentObject;
    }

    login(username, password) {
        return ApiAgent.UserActions.login(username, password).then(result => {
            if (!result.isEmpty) {
                this.authStore.setToken(result.token);
                this.pullUser();
            }
        });

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
    currentUser: observable,
    loadingUser: observable,
    updatingUser: observable,
    forgetUser: action,
    updateUser: action,
    pullUser: action,
    registerCompany: action,
    registerStudent: action,
    login: action,
    googlelogin: action
});

export default UserStore;