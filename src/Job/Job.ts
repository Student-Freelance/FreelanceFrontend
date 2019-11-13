import {LocationModel} from "../Shared/LocationModel";

export default interface Job {
    id: string;
    companyName: string;
    title: string;
    salary: number;
    location: LocationModel;
    description: string;
    tags: string[];
    paidMonthly: boolean;
    paidHourly: boolean;
    experience: string;
    freelancers: number;
    deadLine: Date;
    createdOn: Date;
    jobStart: Date;
    jobEnd: Date;
}
