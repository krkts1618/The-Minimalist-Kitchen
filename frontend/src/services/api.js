import axios from 'axios';

const API = axios.create({
    baseURL: 'https://your-backend-url.onrender.com/api', // Make sure this is your live Render backend URL!
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;