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
    fetchBoards: () => client.get('/board'),
    createBoard: (props) => client.post('/board/create', props),
    updateBoard: (props) => client.put('/board/update', props),
    deleteboard: (props) => client.post('/board/delete', props),
    fetchLists: (props) => client.post('/list', props),
    updateList: (props) => client.put('/list/update', props),
    deleteList: (props) => client.post("/list/delete", props),
    createList: (props) => client.post("/list/create", props),
    fetchTasks: (props) => client.post('/task', props),
    updateTask: (props) => client.put('/task/update', props),
    createTask: (props) => client.post('/task/create', props),
    deleteTask: (props) => client.post('/task/delete', props)
};

export default api;