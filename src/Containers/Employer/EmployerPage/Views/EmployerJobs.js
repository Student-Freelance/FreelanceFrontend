import React from "react";
import Card from "react-bootstrap/Card";
import {useStores} from "../../../../index";
import {useHistory, withRouter} from "react-router-dom";
import {observer} from "mobx-react";

function EmployerJobs(props) {
    const jobs = props.jobs;
    const {jobStore} = useStores();
    const history = useHistory();

    return (
        <Card>
            <Card.Header><b>Jobs ({jobs.length})</b></Card.Header>
            {jobs.length === 0 ?
                <Card.Text>This company currently has no available jobs.</Card.Text>
                :
                <ul className="list-group list-group-flush">
                    {jobStore.jobs.filter(job => jobs.includes(job.id)).map(job =>
                        <li className="list-group-item" key={job.id}
                            onClick={() => {
                                history.push(`/job/${job.id}`)
                            }}>
                            {job.title}
                        </li>
                    )}
                </ul>
            }
        </Card>
    )
}


export default withRouter(observer(EmployerJobs))
