import {observable, decorate} from "mobx";

export default class EmployerStore {
    employer = {
        name: "placeholder name",
        description: "placeholder desc",
        logo: "https://onlinesolutiongroup.dk/wp-content/uploads/2016/07/IBM-logo.png",
        jobs: [{
            id: "alsdjkas",
            name: "Full-stack i Lyngby"
        }]
    };

    setName(name) {
        this.employer.name = name;
    }

    setDescription(description) {
        this.employer.description = description;
    }

    setLogo(logo) {
        this.employer.description = logo;
    }

}

decorate(EmployerStore, {
    employer: observable
});
