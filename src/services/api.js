import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.91.36:1337'
})

export default api;