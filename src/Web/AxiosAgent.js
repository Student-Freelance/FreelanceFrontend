import {Component} from "react";
import Axios from "axios";


export class AxiosAgent extends Component {
    // url = 'https://localhost:5001/api/';
    static url = 'https://devops01.eitlab.diplom.dtu.dk/api/';

    static SetConfig(token) {
        if (token != null) {
            Axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + token;
                return config;
            });
        }
    }

    static async GetMany(endpoint) {
        return await Axios.get(`${this.url}${endpoint}`);
    }

    static async GetOne(endpoint, id) {
        return await Axios.get(
            `${this.url}${endpoint}/${id}`);
    }

    static async Post(endpoint, bodyParameter) {
        return await Axios.post(
            `${this.url}${endpoint}`,
            bodyParameter
        )
    }

    static async Put(endpoint, bodyParameter) {
        return await Axios.put(
            `${this.url}${endpoint}`,
            bodyParameter
        )
    }


    static async Delete(endpoint, id) {
        return await Axios.delete(
            `${this.url}${endpoint}/${id}`);
    }
}
