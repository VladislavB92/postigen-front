import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_BASE_API_URL}`;


const api = axios.create({
    baseURL: API_BASE_URL, timeout: 20000, headers: {
        'Content-Type': 'application/json',
    },
});

export default api;