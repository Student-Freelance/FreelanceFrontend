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
    userJobs = [];

    constructor(authStore, jobStore) {
        this.authStore = authStore;
        this.jobStore = jobStore;

    }

    pullUser() {
        this.loadingUser = true;
        return ApiAgent.UserActions.current()
            .then(action((body) => {
                if (!(body === undefined)){
                if (body.hasOwnProperty('firstname')) {
                    this.isStudent = true;
                    Object.assign(this.studentUser, body);
                } else if (body.hasOwnProperty('companyName')) {
                    this.isStudent = false;
                    Object.assign(this.companyUser, body);
                    this.userJobs = this.jobStore.jobs.filter(job =>this.companyUser.jobs.includes(job.id));
                }
            }}))
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
                if(response!=null){
                    if (response.statusCode === 201) {
                        this.pullUser();
                    }
                }
            }))
            .finally(action(() => {
                if (!this.isStudent){
                    this.userJobs = this.jobStore.jobs.filter(job =>this.companyUser.jobs.includes(job.id));
                }
                this.updatingUser = false;
            }))
    }

    logout() {
        this.authStore.logout(true);
        this.authStore.setAuthenticated(false);
        this.isStudent = false;
        this.companyUser = companyObject;
        this.studentUser = studentObject;
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
                return true;
            }
            else return false;
        })


    }

    googlelogin(token) {
        this.loadingUser = true;
        return ApiAgent.UserActions.googlelogin(token).then(result => {

            if (result) {
                this.authStore.setToken(result.token);
                this.pullUser().then(()=>{
                    this.authStore.setAuthenticated(true);

                });
                return true;
            }
            else return false;
        });
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
        return ApiAgent.UserActions.registerCompany(body).then(result => {
            if (!(result === undefined)) {
                if (result.statusCode === 201) {
                    this.login(username, password)
                }
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
    userJobs: observable,
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