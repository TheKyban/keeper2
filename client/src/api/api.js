import axios from 'axios';
const baseURL = 'http://localhost:7575';

const client = axios.create({
    baseURL,
    withCredentials: true
});

const api = {
    login: (props) => client.post('user/login', props),
    signup: (props) => client.post('user/create', props),
    logout: () => client.get('user/logout'),
    reload: () => client.get('user/reload'),
};

export default api;