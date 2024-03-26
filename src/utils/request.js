import axios from 'axios';
import { API_BASE_URL } from './server';


export const request = ({ url, method, data }) => { 
    return axios({
        method: method || 'get',
        url: `${API_BASE_URL}${url}`,
        data,
    });
}


export const addTokenToAxios = (token) => {
    axios.defaults.headers.Authorization = token;
};
