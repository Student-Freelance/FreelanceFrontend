import Job from '../JobPage/Job';
import LocationModel from '../../Models/LocationModel';

export default interface Employer {
    companyName: string;
    about: string;
    logo: string;
    jobs: Job[];
    website: string;
    location: LocationModel;
    companySize: number;
    vat: number;
    phoneNumber: string;
    email: string;
}