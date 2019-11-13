import {LocationModel} from "../Shared/LocationModel";

export interface Job {
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
    jobStart: Date;
    jobEnd: Date;
}
