import {Job} from '../Job/Job';
import {LocationModel} from '../Shared/LocationModel';

export interface Employer {
    companyName: string;
    about: string;
    logo: string;
    jobs: Job[];
    website: string;
    locationModel: LocationModel;
    companySize: number;
    vat: number;
    phoneNumber: string;
    email: string;
}
