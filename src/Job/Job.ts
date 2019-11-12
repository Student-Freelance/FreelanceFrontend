export interface Job {
    id: string;
    companyName: string;
    title: string;
    salary: number;
    location: string;
    description: string;
    tags: string[];
    paidMonthly: boolean;
    paidHourly: boolean;
    experience: string;
    jobStart: Date;
    jobEnd: Date;
}
