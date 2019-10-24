import React from "react";

function EmployerJobs(props) {
    const jobs = props.jobs;

    return(
        jobs.map(job =>
            <li key={job.id}>
                {job.name}
            </li>
        )
    )
}

export default EmployerJobs
