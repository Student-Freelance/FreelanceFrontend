import React from "react";
import Card from "react-bootstrap/Card";

function EmployerJobs(props) {
    const jobs = props.jobs;

    return (
        <Card>
            <Card.Header><b>Jobs ({jobs.length})</b></Card.Header>
            {jobs.length === 0 ?
                <Card.Text>This company currently has no available jobs.</Card.Text>
                :
                <ul className="list-group list-group-flush">
                    {jobs.map(job =>
                        <li className="list-group-item" key={job.id}
                            onClick={() => console.log(`User pressed on ${job.name}`)}>
                            {job.name}
                        </li>
                    )}
                </ul>
            }
        </Card>
    )


}


export default EmployerJobs
