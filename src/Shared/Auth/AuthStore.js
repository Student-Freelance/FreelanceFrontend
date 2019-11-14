export default class AuthStore {

    data = {
        authorized: false,
        token: null,
    };

    //Enum is not a thing in JS apparently - not type safe
    logIn(token) {
        this.data.authorized = true;
        this.token = token;
    }

    isValid() {

    }

    //Boilerplate code - resets the JS-object
    logOut() {
        this.data.authorized = false;
        this.data.token = null;
    }
}
