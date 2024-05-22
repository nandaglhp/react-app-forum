import base from 'axios';

const axios = base.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token').replaceAll('"', '');
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axios;
