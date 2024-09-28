import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'https://retrievalprime.com/public/authorly/public/', // Replace with your API URL
    withCredentials: true, // Required for sending HTTPOnly cookies
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Authentication API
export const login = (data) => api.post('/api/login', data);
export const register = (data) => api.post('/api/register', data);
export const fetchUser = () => api.get('/api/user');

// Book API
export const fetchBooks = () => api.get('/api/books');
export const createBook = (data) => api.post('/api/books', data);

// Author API
export const fetchAuthors = () => api.get('/api/authors');
export const createAuthor = (data) => api.post('/api/authors', data);

export default api;
