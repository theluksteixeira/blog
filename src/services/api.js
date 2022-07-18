import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.18.116.0:1337/'
})

export default api;