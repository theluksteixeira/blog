import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.28.234.98:1337/'
})

export default api;