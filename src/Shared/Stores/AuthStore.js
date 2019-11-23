import {action, decorate, observable, reaction} from "mobx";
import jwt from "jsonwebtoken";

class AuthStore {
    token = localStorage.getItem('Token');
    authenticated = false;

    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('Token', token);
                    this.setAuthenticated(true)
                } else {
                    localStorage.removeItem('Token');
                    this.setAuthenticated(false)
                }
            });
        this.validCheck();
    }

    setToken(token) {
        this.token = token;
    }

    setAuthenticated(bool) {
        this.authenticated = bool;
    }

    logout(exp) {
        this.token = null;
        this.setAuthenticated(false);
        clearTimeout(this.timer);
        if (exp) {
            debugger;
            alert("Token expired, logging out")
        }
    }

    validCheck() {
        if (this.token == null) return;
        const expires = new Date((jwt.decode(this.token)).exp * 1000);
        const timeOut = (expires - new Date()) - 10000;
        this.timer = setTimeout(() =>
                this.logout(true)
            , timeOut);
    }

}

decorate(AuthStore, {
    token: observable,
    authenticated: observable,
    setToken: action,
    logout: action,
    setAuthenticated: action

});

export default AuthStore;
