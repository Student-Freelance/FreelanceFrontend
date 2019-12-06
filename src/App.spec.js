import ApiAgent from "./Web/ApiAgent";
import UserStore from "./Stores/UserStore";
import JobStore from "./Stores/JobStore";
import MarketPage from "./Containers/MarketPage/MarketPage";

describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });
});

describe('Filter jobs', () => {
    const jobStore = new JobStore();
    it('Filter is equal to jobs after pulling first time', async () => {
        jobStore.pullJobs().then(
            expect(jobStore.jobs).toEqual(jobStore.filteredJobs)
        )
    });
});

describe('Loads jobs', () => {
    const jobStore = new JobStore();
    it('Loading jobs', () => {
        expect(jobStore.isLoading).toEqual(true);
    });
    it('Loading jobs', async () => {
        jobStore.pullJobs().then(
            expect(jobStore.isLoading).toEqual(true)
        );
    });
});

