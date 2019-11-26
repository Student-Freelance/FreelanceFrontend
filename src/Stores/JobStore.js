import {action, decorate, observable} from 'mobx';
import ApiAgent from '../Web/ApiAgent';

class JobStore {
    jobs = [];
    isLoading = true;
    tags = [];
    filteredJobs = [];


    pullJobs() {
        this.isLoading = true;
        return ApiAgent.JobActions.fetchAll()
            .then(action((body) => {
                this.jobs = body;
                this.createLabels();
                this.filteredJobs = [...this.jobs];
            }))
            .finally(action(() => {
                this.isLoading = false;
            }))
    }

    createLabels() {
        let tags = [];
        this.jobs.map(job => job.tags.map((tag) => tags.push(tag)));
        let counts = {};
        for (let i = 0; i < tags.length; i++) {
            counts[tags[i]] = 1 + (counts[tags[i]] || 0);
        }
        this.tags = Object.keys(counts).map(key => [key, counts[key]]);
    }
}

decorate(JobStore, {
    jobs: observable,
    isLoading: observable,
    filteredJobs: observable
});

export default JobStore;
