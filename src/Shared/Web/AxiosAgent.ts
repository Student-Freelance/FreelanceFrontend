import Axios from "axios";

export class AxiosAgent {
    private readonly config: any;

    constructor(token: string) {
        this.config = {
            headers: {'Authorization': "bearer " + token}
        };

    }

    private url: string = 'https://devops01.eitlab.diplom.dtu.dk/api/';

    public async GetMany(endpoint: string) {
        return await Axios.get(`${this.url}${endpoint}`, this.config);
    }

    public async GetOne(endpoint: string, id: string) {
        return await Axios.get(
            `${this.url}${endpoint}/${id}`,
            this.config);
    }

    public async Post(endpoint: string, bodyParameter: any) {
        return await Axios.post(
            `${this.url}${endpoint}`,
            bodyParameter,
            this.config,
        )
    }

    public async Put(endpoint: string, bodyParameter: any) {
        return await Axios.put(
            `${this.url}${endpoint}`,
            {key: bodyParameter},
            this.config,
        )
    }

    public async Delete(endpoint: string, id: string) {
            return await Axios.delete(
                `${this.url}${endpoint}/${id}`,
                this.config);
    }
}
