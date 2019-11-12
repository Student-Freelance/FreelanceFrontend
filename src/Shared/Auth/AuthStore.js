import {decorate, observable} from "mobx";

export default class AuthStore {

    data = {
        userType: {
            employer: false,
            student: false,
            admin: false
        },
        authorized: false,
        token: null,
    };

    //Enum is not a thing in JS apparently - not type safe
    logIn(userType, token) {
        this.data.authorized = true;
        this.token = token;

        // eslint-disable-next-line default-case
        switch(userType) {
            case "employer": this.data.userType.admin = true; break;
            case "student": this.data.userType.student = true; break;
            case "admin": this.data.userType.admin = true; break;
        }
    }

    //Boilerplate code - resets the JS-object
    logOut() {
        this.data.userType.employer = false;
        this.data.userType.student = false;
        this.data.userType.admin = false;
        this.data.authorized = false;
        this.data.token = null;
    }
}

decorate(AuthStore, {
    data: observable
});
