import LocationModel from "../Shared/Models/LocationModel";

export default interface Job {
    id: string;
    companyName: string;
    title: string;
    salary: number;
    location: LocationModel;
    description: string;
    tags: string[];
    payment: string;
    experience: string;
    freelancers: number;
    deadLine: Date;
    createdOn: Date;
    jobStart: Date;
    jobEnd: Date;
}
