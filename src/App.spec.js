import ApiAgent from "./Web/ApiAgent";

describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });
});

describe('Fetch jobs', () => {
    it('Fetching jobs', async () => {
        //let jobs = {};
        const response = await ApiAgent.JobActions.fetchAll();
        expect(true).toEqual(true);
    });
});

