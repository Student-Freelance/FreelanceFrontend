import {decorate, observable, ObservableMap} from "mobx";
import LocationModel from "./LocationModel";
const PropTypes = require('prop-types');

export const studentObject = {
    availability: PropTypes.number,
    competences: PropTypes.string,
    education: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.string,
    experience: PropTypes.arrayOf(PropTypes.string),
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    locationModel:  new ObservableMap({
        street: PropTypes.string,
        number: PropTypes.string,
        city: PropTypes.string,
        zip: PropTypes.string
    }),
    logo: PropTypes.string,
    phoneNumber: PropTypes.string,
    ranking: PropTypes.string,
    resume: PropTypes.arrayOf(PropTypes.string),
    semester: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    university: PropTypes.string,
    username: PropTypes.string,
    website: PropTypes.string,
};
export const companyObject = {
    username: '',
    companyName: '',
    about: '',
    logo: '',
    jobs: [],
    website: '',
    locationModel: {
        street: '',
        number: '',
        city: '',
        zip: ''
    },
    companySize: 0,
    vat: 0,
    phoneNumber: '',
    email: '',

};
decorate(LocationModel, {
    street: observable,
    number: observable,
    city: observable,
    zip: observable
});

