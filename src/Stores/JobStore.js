import {action, decorate, observable} from 'mobx';
import ApiAgent from '../Web/ApiAgent';
import {Job} from "../Containers/JobPage/Job";

class JobStore {
    jobs = Job
    loadingJobs;

    pullJobs() {
        this.loadingJobs = true;
        return ApiAgent.JobActions.fetchAll()
            .then(action((body) => {
                console.table(body);
                this.jobs = body;
            }))
            .finally(action(() => {
                this.loadingJobs = false;
            }))
    }
}
