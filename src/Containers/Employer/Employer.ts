import LocationModel from '../../Models/LocationModel';
import {Job} from '../JobPage/Job';

export default interface Employer {
    companyName: string;
    about: string;
    logo: string;
    // @ts-ignore
    jobs: Job[];
    website: string;
    location: LocationModel;
    companySize: number;
    vat: number;
    phoneNumber: string;
    email: string;
}
